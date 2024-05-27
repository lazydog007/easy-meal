"use server"

import {
  calculateCalories,
  generateDailyMealPrompt,
  PROTEIN_INTAKE,
} from "@/constants"
import { createPlan } from "@/lib/actions/plan.action"
import { getProfileById } from "@/lib/actions/profile.action"
import { CreatePlanParams } from "@/lib/database/models/plan.model"
import { MealPlanProfile } from "@/lib/database/models/profile.model"
import Anthropic from "@anthropic-ai/sdk"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI() // gets the API key from the .env

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"], // This is the default and can be omitted
})

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    // 1. checks if user is authenticated
    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
    const model = "claude-3-haiku"

    // get the userProfile
    const userProfile = await getProfileById(userId!)

    const targetCalories = await calculateCalories(
      Number(userProfile.weight),
      Number(userProfile.height),
      Number(userProfile.age),
      userProfile.gender,
      userProfile.activityLevel
    )

    const targetProtein = await PROTEIN_INTAKE(
      Number(userProfile.weight), // convert kg to lb
      "regular"
      // userProfile.protein
    )

    const mealPlan: MealPlanProfile = {
      dailyCalories: targetCalories,
      dailyProtein: targetProtein,
      diet: userProfile.diet!,
      allergies: userProfile.allergies!,
      dislikes: userProfile.dislikes!,
      cuisine: userProfile.cuisine!,
    }

    // console.log("mealPlan", mealPlan)

    // generate prompt
    const prompt = await generateDailyMealPrompt(mealPlan)

    console.log("\n")
    console.log("prompt", prompt)
    /**
     * Handle AI Model
     */
    const aiModelMap: Map<string, string> = new Map([
      ["gpt-3.5-turbo", "gpt-3.5-turbo"],
      ["gpt-4-turbo", "gpt-4-turbo"],
      ["gpt-4o", "gpt-4o"],
      ["claude-3-haiku", "claude-3-haiku-20240307"],
      ["claude-3-sonnet", "claude-3-sonnet-20240229"],
      ["claude-3-opus", "claude-3-opus-20240229"],
      ["dall-e-2", "dall-e-2"],
      ["dall-e-3", "dall-e-3"],
    ])
    const aiModel = aiModelMap.get(model)

    let aiResponse: string | void

    // OPENAI call
    if (aiModel!.startsWith("gpt")) {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: aiModel!,
      })
      aiResponse = response.choices[0].message.content!
      // anthropic API call
    } else if (aiModel!.startsWith("claude")) {
      const response = await anthropic.messages.create({
        max_tokens: 4096, //4096 is the max it can take
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: aiModel!,
      })
      // console.log("\n")
      // console.log("anthropic response", response)
      aiResponse = response.content[0].text
    }

    // interface Meal {
    //   meal: string
    //   macros: {
    //     protein: number
    //     carbs: number
    //     fat: number
    //   }
    //   calories: number
    //   recipeName: string
    //   ingredients: {
    //     name: string
    //     quantity: string
    //   }[]
    //   instructions: string[]
    // }

    // interface DayPlan {
    //   totalCalories: number
    //   totalProtein: number
    //   meals: Meal[]
    // }

    // interface CreatePlanParams {
    //   userId: string
    //   planType: string
    //   mealPlan: DayPlan[]
    //   startDate: Date
    //   endDate: Date
    // }

    // TODO: Save the response
    try {
      type JsonRecord = Record<string, any>
      const parsedContent = JSON.parse(aiResponse!)

      const createPlanParams: CreatePlanParams = {
        userId: userId,
        planType: "abc123",
        mealPlan: [
          {
            totalCalories: parsedContent.totalCalories,
            totalProtein: parsedContent.totalProtein,
            totalFat: "0",
            totalCarbs: "0",
            // totalCarbs: parsedContent.meals.reduce(
            //   (sum: number, meal: Meal) => sum + meal.macros.carbs,
            //   0
            // ),
            // totalFat: parsedContent.meals.reduce(
            //   (sum: number, meal: Meal) => sum + meal.macros.fat,
            //   0
            // ),
            meals: parsedContent.meals.map((meal: any) => ({
              meal: meal.meal,
              macros: {
                protein: meal.macros.protein,
                carbs: meal.macros.carbs,
                fat: meal.macros.fat,
              },
              calories: meal.calories,
              recipeName: meal.recipeName,
              ingredients: meal.ingredients.map((ingredient: any) => ({
                name: ingredient.name,
                quantity: ingredient.quantity,
              })),
              instructions: meal.instructions,
            })),
          },
        ],
        startDate: new Date(), // Example start date
        endDate: new Date(), // Example end date
      }

      console.log(
        "createPlanParams JSON: " + JSON.stringify(createPlanParams, null, 2)
      )

      const savedPlan = await createPlan(createPlanParams)
      console.log("savedPlan", savedPlan)
    } catch (error) {
      console.log("Error: " + error)
    }

    return NextResponse.json(aiResponse!)
  } catch (error) {
    console.log("something bad happened")
  }
}

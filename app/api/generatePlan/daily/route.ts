"use server"

import {
  calculateCalories,
  generateDailyMealPrompt,
  PROTEIN_INTAKE,
} from "@/constants"
import { getProfileById } from "@/lib/actions/profile.action"
import { DailyPlanParams } from "@/lib/database/models/plan.model"
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
      aiResponse = response.content[0].text
    }

    // This only generates a response for one day
    // should I add a clause to save the response and add it to the current weekly plan??
    type JsonRecord = Record<string, any>
    const parsedContent = JSON.parse(aiResponse!)

    const dailyPlanParams: DailyPlanParams = {
      totalCalories: parsedContent.totalCalories,
      totalProtein: parsedContent.totalProtein,
      totalFat: "0",
      totalCarbs: "0",
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
    }

    console.log(
      "dailyPlanParams JSON: " + JSON.stringify(dailyPlanParams, null, 2)
    )

    return NextResponse.json(dailyPlanParams)
  } catch (error) {
    console.log("something bad happened")
  }
}

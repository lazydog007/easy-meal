"use server"

import { generateDailyMealPrompt } from "@/constants"
import { getProfileById } from "@/lib/actions/profile.action"
import { MealPlanProfile } from "@/lib/database/models/profile.model"
// import { addMessagesToChat } from "@/lib/actions/chat.actions"
// import { updateSubscriptionLimits } from "@/lib/actions/user.actions"
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
    // const { model } = await req.json()
    const model = "claude-3-haiku"
    // const chatId = chat.chatId

    // const prompt = {
    //   role: "system",
    //   content: `Al assistant is a brand new, powerful, human-like artificial intelligence.`,
    // }

    // Remove _id field from objects that have it, MongoDB automatically saves it
    // const filteredMessages = chat.messages.map((message: any) => {
    //   return Object.fromEntries(
    //     Object.entries(message).filter(([key]) => key !== "_id")
    //   )
    // })

    const userProfile = await getProfileById(userId!)

    const calculateCalories = (
      weight: string,
      height: string,
      age: string,
      gender: string,
      activityLevel: string
    ) => {
      const bmr =
        gender === "M"
          ? 88.362 +
            13.397 * Number(weight) +
            4.799 * Number(height) -
            5.677 * Number(age)
          : 447.593 +
            9.247 * Number(weight) +
            3.098 * Number(height) -
            4.33 * Number(age)

      const calories = bmr

      return calories
    }
    const mealPlan: MealPlanProfile = {
      dailyCalories: userProfile.diet,
      dailyProtein: userProfile.diet,
      diet: userProfile.diet!,
      allergies: userProfile.diet!,
      dislikes: userProfile.diet!,
      cuisine: userProfile.diet!,
    }
    const prompt = generateDailyMealPrompt(mealPlan)
    /**
     * Handle AI Model
     */
    const aiModelMap: Map<string, string> = new Map([
      ["gpt-3.5-turbo", "gpt-3.5-turbo"],
      ["gpt-4-turbo", "gpt-4-turbo"],
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
      // const response = await openai.chat.completions.create({
      //   messages: [
      //     prompt,
      //     ...filteredMessages,
      //     {
      //       role: "user",
      //       content: userMessage.content,
      //     },
      //   ],
      //   model: aiModel!,
      // })
      // aiResponse = response.choices[0].message.content!
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
      console.log("\n")
      console.log("anthropic response", response)
      aiResponse = response.content[0].text

      // DALLE Image Generation
    }

    // const aiMessage = {
    //   id: v4(),
    //   role: "assistant",
    //   content: aiResponse,
    // }

    // await addMessagesToChat({
    //   chatId: chatId,
    //   messages: [userMessage, aiMessage],
    // })

    // updateSubscriptionLimits(userId!, chat.aiModel)

    return NextResponse.json(aiResponse!)
  } catch (error) {
    console.log("something bad happened")
    // toast.error("Error creating chat" + error)
  }
}

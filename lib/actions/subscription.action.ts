"use server"

import { Subscription } from "../database/models/subscription.model"
import User, { IModelLimit } from "../database/models/user.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"

const DAY_IN_MS = 1000 * 60 * 60 * 24

// CREATE
export declare type CreateSubscriptionParams = {
  userId: string
  membership: string
  // limits: IModelLimit[]
  stripeCustomerId: string
  stripeSubscriptionId: string
  currentPeriodEnd: Date
}

export async function createSubscription(
  subscription: CreateSubscriptionParams,
  planLimits: IModelLimit[]
) {
  try {
    await connectToDatabase()
    const newSubscription = await Subscription.create(subscription)

    // updates the user limits
    const updatedUser = await User.findOneAndUpdate(
      {
        userId: subscription.userId,
      },
      { limits: planLimits },
      { new: true }
    )
    console.log("\n")
    console.log("updatedUser", updatedUser)

    return JSON.parse(JSON.stringify(newSubscription))
  } catch (error) {
    handleError(error)
  }
}

// READ
export async function getUserSubscription(userId: string) {
  try {
    await connectToDatabase()
    const subscription = await Subscription.findOne({
      userId: userId,
    })
    return JSON.parse(JSON.stringify(subscription))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateSubscription(stripeSubscriptionId: string) {
  try {
    await connectToDatabase()

    const subscription = await Subscription.findOne({
      stripeSubscriptionId: stripeSubscriptionId,
    })

    if (!subscription) {
      throw new Error("Subscription not found")
    }

    const newPeriodEnd = new Date(subscription.current_period_end * 1000)
    const membership = subscription.membership
    const newPlanLimits: IModelLimit[] = []

    const updatedSubscription = await Subscription.findOneAndUpdate(
      {
        stripeSubcriptionId: stripeSubscriptionId,
      },
      { currentPeriodEnd: newPeriodEnd, limits: newPlanLimits },
      { new: true }
    )

    User.findOneAndUpdate(
      {
        userId: subscription.userId,
      },
      { limits: newPlanLimits },
      { new: true }
    )

    return JSON.parse(JSON.stringify(updatedSubscription))
  } catch (error) {
    handleError(error)
  }
}

// UTILS
export async function checkSubscription(userId: string) {
  try {
    await connectToDatabase()

    const userSubscription = await Subscription.findOne({
      userId: userId,
    })

    if (!userSubscription) {
      return false
    }
    // not subscribed
    const isValid: boolean =
      userSubscription?.currentPeriodEnd?.getTime()! * DAY_IN_MS > Date.now()

    return isValid
  } catch (error) {
    handleError(error)
  }

  if (!userId) {
    return false
  }
}

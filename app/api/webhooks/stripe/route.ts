import {
  createSubscription,
  CreateSubscriptionParams,
  updateSubscription,
} from "@/lib/actions/subscription.action"
import { IModelLimit } from "@/lib/database/models/user.model"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2024-04-10",
  typescript: true,
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error) {
    console.error("error in webhook route: ", error)
    return new NextResponse("webhook error", { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // new subscription
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session?.metadata?.userId) {
      return new NextResponse("no userId", { status: 400 })
    }

    // const planLimits = calculatePlanLimits(session.metadata.membership)
    const planLimits: IModelLimit[] = []

    const userSubscription: CreateSubscriptionParams = {
      userId: session.metadata.userId,
      membership: session.metadata.membership,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    }

    createSubscription(userSubscription, planLimits)
  }

  if (event.type == "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    updateSubscription(subscription.id)
  }

  return new NextResponse(null, { status: 200 }) // need to send 200 to Stripe
}

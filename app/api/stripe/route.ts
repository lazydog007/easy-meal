"use server"
import { getUserSubscription } from "@/lib/actions/subscription.action"
import { auth, currentUser } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const return_url: string | undefined = process.env.NEXT_BASE_URL + "/hub"

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2024-04-10",
  typescript: true,
})
export async function GET(req: NextRequest, res: Response) {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    const membership = req.nextUrl.searchParams.get("membership")
    const cost = req.nextUrl.searchParams.get("cost")

    const dollarUnits = Number(cost) * 100
    // user is unauthorized
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 })
    }

    const _userSubscription = await getUserSubscription(userId)

    if (_userSubscription && _userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: _userSubscription.stripeCustomerId,
        return_url: return_url,
      })
      return NextResponse.json({ url: stripeSession.url })
    }

    // user first time trying to subscribe

    if (!membership || !cost) {
      return new NextResponse("membership and cost are required", {
        status: 400,
      })
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: return_url,
      cancel_url: return_url,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.emailAddresses[0]?.emailAddress || "",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: membership,
              description: "Monthly membership to Power Hub",
            },
            unit_amount: dollarUnits, // convert to full dollar
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId, // we need the userId to see who did the transaction
        membership: membership,
      },
    })

    return NextResponse.json({ url: stripeSession.url })
  } catch (error) {
    console.log("Stripe error", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

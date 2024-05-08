"use server"
import { updateSubscriptionLimits } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

// /api/updateLimits
export async function GET(req: NextRequest, res: Response) {
  const { userId } = await auth()
  const model = req.nextUrl.searchParams.get("model")

  try {
    const _subcription = await updateSubscriptionLimits(userId!, model!)
    return NextResponse.json(_subcription)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error fetching user subscription" },
      { status: 500 }
    )
  }
}

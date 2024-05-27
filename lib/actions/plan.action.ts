"use server"
import { revalidatePath } from "next/cache"
import Plan, {
  CreatePlanParams,
  UpdatePlanParams,
} from "../database/models/plan.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"

// CREATE
export async function createPlan(plan: CreatePlanParams) {
  try {
    await connectToDatabase()
    const newPlan = await Plan.create(plan)
    return JSON.parse(JSON.stringify(newPlan))
  } catch (error) {
    handleError(error)
  }
}

// READ
export async function getPlanById(userId: string) {
  try {
    await connectToDatabase()
    const plan = await Plan.findOne({ userId: userId })
    return JSON.parse(JSON.stringify(plan))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updatePlan(userId: string, plan: UpdatePlanParams) {
  try {
    await connectToDatabase()
    const updatedPlan = await Plan.findOneAndUpdate(
      { userId: userId },
      { ...plan },
      { new: true }
    )
    if (!updatedPlan) throw new Error("Plan update failed")
    return JSON.parse(JSON.stringify(updatedPlan))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deletePlan(userId: string) {
  try {
    await connectToDatabase()
    // Find plan to delete
    const planToDelete = await Plan.findOne({ userId: userId })
    if (!planToDelete) {
      throw new Error("Plan not found")
    }
    // Delete plan
    const deletedPlan = await Plan.findByIdAndDelete(planToDelete._id)
    revalidatePath("/") // Revalidate the path if needed
    return deletedPlan ? JSON.parse(JSON.stringify(deletedPlan)) : null
  } catch (error) {
    handleError(error)
  }
}

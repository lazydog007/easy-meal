import { Document, Schema, model, models } from "mongoose";

export interface IProfileUpdate extends Document {
  age?: string
  gender?: string
  weight?: string
  height?: string
  activityLevel?: string
  diet?: string
  protein?: string
  allergies?: string
  dislikes?: string
  cuisine?: string
}

// Meal Plan
export declare type MealPlanProfile = {
  dailyCalories: number
  dailyProtein: number
  diet?: string
  allergies?: string
  dislikes?: string
  cuisine?: string
}

type Ingredient = {
  name: string
  quantity: string
}

type Meal = {
  meal: string
  macros: {
    protein: number
    carbs: number
    fat: number
  }
  calories: number
  recipeName: string
  ingredients: Ingredient[]
  instructions: string[]
}

export declare type MealPlan = {
  totalCalories: string
  totalProtein: string
  day?: string // Monday/Tuesday/Wednesday/Thursday/Friday/Saturday/Sunday
  meals: Meal[]
}
const PlanSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  planType: { type: String, required: true },
  mealPlan: { type: MealPlan[] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
})

const Profile = models?.Profile || model("Profile", PlanSchema)

export default Profile

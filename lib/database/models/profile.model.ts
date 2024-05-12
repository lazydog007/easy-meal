import { Document, Schema, model, models } from "mongoose"

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
  day?: string // Monday/Tuesday/Wednesday/Thursday/Friday/Saturday/Sunday
  meals: Meal[]
}

// Create Profile
export declare type CreateProfileParams = {
  userId: string
  age: string
  gender: string
  weight: string
  height: string
  activityLevel: string
  diet?: string
  protein?: string
  allergies?: string
  dislikes?: string
  cuisine?: string
}

export declare type UpdateProfileParams = {
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
export interface IProfile extends Document {
  userId: string
  age: string
  gender: string
  weight: string
  height: string
  activityLevel: string
  diet?: string
  protein?: string
  allergies?: string
  dislikes?: string
  cuisine?: string
}

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

const ProfileSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  weight: { type: String, required: true },
  height: { type: String, required: true },
  activityLevel: { type: String, required: true },
  diet: { type: String },
  allergies: { type: String },
  dislikes: { type: String },
  cuisine: { type: String },
})

const Profile = models?.Profile || model("Profile", ProfileSchema)

export default Profile

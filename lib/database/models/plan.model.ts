import { Document, Schema, model, models } from "mongoose"

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

const PlanSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  planType: { type: String, required: true },
  mealPlan: { type: [MealPlan] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
})

const Profile = models?.Profile || model("Profile", ProfileSchema)

export default Profile

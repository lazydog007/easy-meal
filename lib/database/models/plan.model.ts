import { Schema, model, models } from "mongoose"

export declare type DailyPlanParams = {
  totalCalories: string
  totalProtein: string
  totalCarbs: string
  totalFat: string
  day?: string
  meals: [
    {
      meal: string
      macros: {
        protein: number
        carbs: number
        fat: number
      }
      calories: number
      recipeName: string
      ingredients: [
        {
          name: string
          quantity: string
        }
      ]
      instructions: string[]
    }
  ]
}

export declare type CreatePlanParams = {
  userId: string
  planType: string // Daily, Monthly, Yearly
  mealPlan: [
    {
      totalCalories: string
      totalProtein: string
      totalCarbs: string
      totalFat: string
      day?: string
      meals: [
        {
          meal: string
          macros: {
            protein: number
            carbs: number
            fat: number
          }
          calories: number
          recipeName: string
          ingredients: [
            {
              name: string
              quantity: string
            }
          ]
          instructions: string[]
        }
      ]
    }
  ]
  startDate: Date
  endDate: Date
}

export declare type UpdatePlanParams = {
  planType?: string
  mealPlan?: [
    {
      totalCalories?: string
      totalProtein?: string
      totalCarbs?: string
      totalFat?: string
      day?: string
      meals?: [
        {
          meal?: string
          macros?: {
            protein?: number
            carbs?: number
            fat?: number
          }
          calories?: number
          recipeName?: string
          ingredients?: [
            {
              name?: string
              quantity?: string
            }
          ]
          instructions?: string[]
        }
      ]
    }
  ]
  startDate?: Date
  endDate?: Date
}

// Meal Plan
const IngredientSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
})

const MacrosSchema: Schema = new Schema({
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
})

const MealSchema: Schema = new Schema({
  meal: { type: String, required: true },
  macros: { type: MacrosSchema, required: true },
  calories: { type: Number, required: true },
  recipeName: { type: String, required: true },
  ingredients: { type: [IngredientSchema], required: true },
  instructions: { type: [String], required: true },
})

const MealPlanSchema: Schema = new Schema({
  totalCalories: { type: String, required: true },
  totalProtein: { type: String, required: true },
  totalCarbs: { type: String, required: true },
  totalFat: { type: String, required: true },
  day: { type: String, required: false },
  meals: { type: [MealSchema], required: true },
})

const PlanSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  planType: { type: String, required: true },
  mealPlan: { type: [MealPlanSchema] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
})

const Plan = models?.Plan || model("Plan", PlanSchema)

export default Plan

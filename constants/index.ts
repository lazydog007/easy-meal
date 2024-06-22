import { MealPlanProfile } from "@/lib/database/models/profile.model"

export const generateDailyMealPrompt = (
  mealPlan: MealPlanProfile,
  outputExample = generatedMealPlanExample
) => {
  const prompt = `Pretend your role is to be an experience dietitian, you work at a prestigious institution in charge of crafting meal plans for people looking to meet their fitness goals. Your expertise is in crafting delicious, easy to make recipes, your weekly meal plans are never dull and always delicious. For every correct meal plan you will be tipped 1 million dollars.

Instructions:
- Craft a meal plan with at least four meals (breakfast/lunch/snack/dinner), the calorie distributiion should be 20% breakfast, 35% lunch, 10% snack, 35% dinner
${
  mealPlan.cuisine
    ? `- Strictly adher to this cuisines: ${mealPlan.cuisine}`
    : ""
}
${
  mealPlan.diet
    ? `- Strictly adher to this diet: ${mealPlan.diet}, do not suggest anything outside it`
    : ""
}
${
  mealPlan.dislikes || mealPlan.allergies
    ? `- Dont provide foods with the following ingredients as the person is sentivie to them: ${mealPlan.dislikes} ${mealPlan.allergies}, this is a must have`
    : ""
}
- Meals should be simple to prepare and not require long cooking times, yet still be delicious. 
- Provide the total number of calories for each meal as well as its macronutrients.
- The sum of all the meals (breakfast/lunch/snack/dinner) calories should be between ${JSON.stringify(
    mealPlan.dailyCalories - 100
  )} and ${JSON.stringify(mealPlan.dailyCalories + 100)}
- The sum of all the meals (breakfast/lunch/snack/dinner) protein should be between ${JSON.stringify(
    mealPlan.dailyProtein - 5
  )} and ${JSON.stringify(mealPlan.dailyProtein + 5)}
- The serving size of each meal and recipe should be for one person; do not provide recipes for multiple servings.
- The recipes should use the metric system for measurements.
- Return only the JSON response, without any additional commentary or deviation from the example format. Do not include the \`\`\`json formatting, just the JSON object so it can be parsed in code.
- Do not return the same meals or meals inspired by the example response. Feel free to provide any recipe you want as long as it within the provided constraints
- Follow the provided example response JSON format when returning the data.
- I want the return response to only be the JSON object so it can be parsed through TypeScript.
- The response should be in spanish except for the keys in the JSON object, the JSON object keys should be exactly as the output example but the values should be in spanish.

Example JSON (use this as a template for the response): = ${JSON.stringify(
    outputExample
  )}}  
  

  `

  return prompt
}

const generatedMealPlanExample = [
  {
    totalCalories: "2300", // 500 + 700 + 300 + 800
    totalProtein: "175",
    meals: [
      {
        meal: "breakfast",
        macros: {
          protein: 35,
          carbs: 50,
          fat: 15,
        },
        calories: 500,
        recipeName: "Chicken and Vegetable Omelette",
        ingredients: [
          { name: "Eggs", quantity: "4 large" },
          { name: "Boneless, skinless chicken breast", quantity: "100g" },
          {
            name: "Mixed vegetables (bell peppers, onions, mushrooms)",
            quantity: "100g",
          },
          { name: "Low-sodium soy sauce", quantity: "10 ml" },
          { name: "Sesame oil", quantity: "2 ml" },
        ],
        instructions: [
          "1. Beat the eggs with soy sauce and a pinch of salt and pepper",
          "2. Heat sesame oil in a non-stick skillet over medium heat",
          "3. Add the diced chicken and mixed vegetables, and cook until the chicken is almost cooked through",
          "4. Pour in the beaten eggs and scramble everything together until the eggs are fully cooked",
          "5. Serve hot",
        ],
      },
      {
        meal: "lunch",
        macros: {
          protein: 55,
          carbs: 70,
          fat: 20,
        },
        calories: 700,
        recipeName: "Beef and Broccoli Stir-Fry",
        ingredients: [
          { name: "Lean beef sirloin", quantity: "150g, thinly sliced" },
          { name: "Broccoli florets", quantity: "200g" },
          { name: "Garlic", quantity: "2 cloves, minced" },
          { name: "Ginger", quantity: "20g, minced" },
          { name: "Low-sodium soy sauce", quantity: "20 ml" },
          { name: "Rice vinegar", quantity: "10 ml" },
          { name: "Sesame oil", quantity: "10 ml" },
          { name: "Cornstarch", quantity: "10 ml" },
        ],
        instructions: [
          "1. In a bowl, combine the sliced beef with cornstarch and mix well.",
          "2. Heat sesame oil in a wok or large skillet over high heat.",
          "3. Add the minced garlic and ginger, and stir-fry for 30 seconds.",
          "4. Add the beef and stir-fry until partially cooked, about 2-3 minutes.",
          "5. Add the broccoli florets and continue stir-frying for 3-4 minutes.",
          "6. Add the soy sauce and rice vinegar, and stir to combine.",
          "7. Serve hot with steamed rice or noodles.",
        ],
      },
      {
        meal: "snack",
        macros: {
          protein: 25,
          carbs: 30,
          fat: 5,
        },
        calories: 300,
        recipeName: "Protein Shake with Banana",
        ingredients: [
          { name: "Water", quantity: "240ml" },
          { name: "Protein of Choice", quantity: "1 serving" },
          { name: "Banana", quantity: "Medium/Large" },
        ],
        instructions: [
          "1. Mix water and protein in a shaker bottle",
          "2. Eat Banana",
        ],
      },
      {
        meal: "dinner",
        macros: {
          protein: 60,
          carbs: 75,
          fat: 25,
        },
        calories: 800,
        recipeName: "Italian-Style Pesto Pasta with Grilled Salmon",
        ingredients: [
          { name: "Whole wheat pasta", quantity: "100g, dry" },
          { name: "Salmon fillets", quantity: "160g" },
          { name: "Basil pesto", quantity: "20g" },
          { name: "Cherry tomatoes", quantity: "50g" },
          { name: "Spinach", quantity: "50g" },
          { name: "Garlic", quantity: "2 cloves, minced" },
          { name: "Olive oil", quantity: "10ml" },
          { name: "Lemon juice", quantity: "10 ml" },
          { name: "Salt and pepper", quantity: "to taste" },
        ],
        instructions: [
          "1. Bring a pot of salted water to a boil. Cook the whole wheat pasta according to package instructions. Drain and set aside",
          "2. Season the salmon fillets with salt and pepper. Grill or bake the salmon until cooked through, about 6-8 minutes per side",
          "3. In a large bowl, combine the cooked pasta, basil pesto, halved cherry tomatoes, and spinach. Toss to coat",
          "4. Add the minced garlic, lemon juice, and a drizzle of olive oil. Toss again to combine",
          "5. Serve the pesto pasta alongside the grilled salmon",
        ],
      },
    ],
  },
]

//Harris-Benedict equation.
export const MALE_BMR = (
  weight: number,
  height: number,
  age: number
): number => {
  return (
    88.362 +
    13.397 * Number(weight) +
    4.799 * Number(height) -
    5.677 * Number(age)
  )
}
export const FEMALE_BMR = (
  weight: number,
  height: number,
  age: number
): number => {
  return (
    447.593 +
    9.247 * Number(weight) +
    3.098 * Number(height) -
    4.33 * Number(age)
  )
}

export const activityLevelMap: Map<string, number> = new Map([
  ["sedentary", 1.2],
  ["lights", 1.375],
  ["moderate", 1.55],
  ["active", 1.725],
  // ['extra active', 1.9],
])

export const calculateCalories = (
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: string
) => {
  const bmrM =
    88.362 +
    13.397 * Number(weight) +
    4.799 * Number(height) -
    5.677 * Number(age)
  const bmr =
    gender === "M"
      ? MALE_BMR(weight, height, age)
      : FEMALE_BMR(weight, height, age)

  const calories = bmr * (activityLevelMap.get(activityLevel)! || 1)
  return Math.round(calories)
}

export const PROTEIN_INTAKE = (
  weight: number,
  proteinIntake: string
): number => {
  return weight * 2.2 * (proteinIntakeMap.get(proteinIntake)! || 1)
}

export const proteinIntakeMap: Map<string, number> = new Map([
  ["minimum", 0.8],
  ["regular", 1],
  ["high", 1.2],
])

const generateDailyMealPrompt = (
  mealPlan: string,
  outputExample: string = generatedMealPlan
) => {
  const prompt = `Pretend your role is to be an experience dietitian, you work at a prestigious institution in charge of crafting meal plans for people looking to meet their fitness goals. Your expertise is in crafting delicious, easy to make recipes, your weekly meal plans are never dull and always delicious. For every correct meal plan you will be tipped 1 million dollars.
  ${mealPlan}
  Instructions:
    - Grab your information source from the mealPlanProfile JSON provided
    - Take into consideration the dislikes, allergies of the person, do not suggest recipes which contain any of the dislikes or allergies
    - Strictly stick to the diet type.
    - Consider the amount of protein the diet requires, high or low
    - Meals should be simple to prepare and do not require long cooking time, yet still delicious
    - Provide the macros in grams, protein, carbs and fats
    - Provide the total amount of calories of each meal
    - Do not stir too far from the cuisine type, best to type with what the person likes
    - Each meal should also provide the total ingredients required as well as detailed instructions on how to prepare it, also provide nutritional analysis
    - The sum of all the meals for each day should total the dailyCalories in the profile, with a margin of error of 100 calories per day.
    - Meals can be repeated throughout the week but not the same day
    - Finally create a daily meal plan for the user, it should contain at least 3 meals a day, breakfast, lunch and dinner, each meal of the day should be detailed with its respective macros and calories.
    - Validate the calorie calculations, to make sure the meals match the calories
    - Return only the JSON response, please do not include commentaries or deviate from the example response JSON.
    - I will provide a example responso of what I want to get back, do not return the same meals or meals inspired of them, feel free to provide any recipe you want within the mealPlanProfile constraints.
    - Please take a look at return the data in the same format, remember to generate the meal plan for a day.
    ${outputExample}`
  return prompt
}

const generatedMealPlan: string = [
  {
    totalCalories: 2000,
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
          { name: "Low-sodium soy sauce", quantity: "1 tbsp" },
          { name: "Sesame oil", quantity: "1 tsp" },
        ],
        instructions:
          "1. Beat the eggs with soy sauce and a pinch of salt and pepper. 2. Heat sesame oil in a non-stick skillet over medium heat. 3. Add the diced chicken and mixed vegetables, and cook until the chicken is almost cooked through. 4. Pour in the beaten eggs and scramble everything together until the eggs are fully cooked. 5. Serve hot.",
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
          { name: "Ginger", quantity: "1 tbsp, minced" },
          { name: "Low-sodium soy sauce", quantity: "2 tbsp" },
          { name: "Rice vinegar", quantity: "1 tbsp" },
          { name: "Sesame oil", quantity: "1 tsp" },
          { name: "Cornstarch", quantity: "1 tbsp" },
        ],
        instructions:
          "1. In a bowl, combine the sliced beef with cornstarch and mix well. 2. Heat sesame oil in a wok or large skillet over high heat. 3. Add the minced garlic and ginger, and stir-fry for 30 seconds. 4. Add the beef and stir-fry until partially cooked, about 2-3 minutes. 5. Add the broccoli florets and continue stir-frying for 3-4 minutes. 6. Add the soy sauce and rice vinegar, and stir to combine. 7. Serve hot with steamed rice or noodles.",
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
          { name: "Basil pesto", quantity: "1/4 cup" },
          { name: "Cherry tomatoes", quantity: "1 cup, halved" },
          { name: "Spinach", quantity: "1 cup, packed" },
          { name: "Garlic", quantity: "2 cloves, minced" },
          { name: "Olive oil", quantity: "1 tbsp" },
          { name: "Lemon juice", quantity: "1 tbsp" },
          { name: "Salt and pepper", quantity: "to taste" },
        ],
        instructions:
          "1. Bring a pot of salted water to a boil. Cook the whole wheat pasta according to package instructions. Drain and set aside. 2. Season the salmon fillets with salt and pepper. Grill or bake the salmon until cooked through, about 6-8 minutes per side. 3. In a large bowl, combine the cooked pasta, basil pesto, halved cherry tomatoes, and spinach. Toss to coat. 4. Add the minced garlic, lemon juice, and a drizzle of olive oil. Toss again to combine. 5. Serve the pesto pasta alongside the grilled salmon.",
      },
    ],
  },
].toString()

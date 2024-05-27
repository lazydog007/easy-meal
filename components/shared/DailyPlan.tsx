import { DailyPlanParams } from "@/lib/database/models/plan.model"

type Props = {
  dailyPlanParams: DailyPlanParams
}

const DailyPlan = ({ dailyPlanParams }: Props) => {
  return (
    <div className="">
      <div className="card w-full bg-base-100 shadow-2xl mt-4">
        <div className="card-body">
          <div className="flex flex-col items-center justify-center">
            <h2 className="card-title text-4xl p-2">Day 1</h2>
            <h3 className="card-title">
              | {dailyPlanParams.totalCalories} calories |{" "}
              {dailyPlanParams.totalProtein}g protein |
            </h3>
          </div>
          {dailyPlanParams.meals.map((meal: any) => (
            <div className="card w-full bg-base-100 shadow-xl rounded-xl">
              <div className="card-body">
                <p className="font-bold text-2xl">
                  {meal.meal.charAt(0).toUpperCase() + meal.meal.slice(1)}:{" "}
                  {meal.recipeName}
                </p>
                <p>Calories: {meal.calories}</p>
                <p>
                  Macros: Protein {meal.macros.protein} / Carbs{" "}
                  {meal.macros.carbs} / Fat {meal.macros.fat}
                </p>
                <details className="collapse collapse-arrow shadow-md rounded-2xl mt-2">
                  <summary className="collapse-title text-xl bg-secondary/50">
                    Ingredients
                  </summary>
                  <div className="collapse-content mt-2">
                    <ul>
                      {meal.ingredients.map((ingredient: any) => (
                        <li>
                          - {ingredient.name} | {ingredient.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
                <details className="collapse collapse-arrow shadow-md rounded-2xl flex mt-2">
                  <summary className="collapse-title text-xl bg-secondary/50">
                    Instructions
                  </summary>
                  <div className="collapse-content mt-2 ">
                    <ul>
                      {meal.instructions.map((instruction: any) => (
                        <li>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DailyPlan
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
            <h2 className="card-title text-4xl p-2">Dia 1</h2>
            <h3 className="card-title">
              | {dailyPlanParams.totalCalories} calorias |{" "}
              {dailyPlanParams.totalProtein}g proteina |
            </h3>
          </div>
          {dailyPlanParams.meals.map((meal: any, index) => (
            <div
              className="card w-full bg-base-100 shadow-xl rounded-xl"
              key={index}
            >
              <div className="card-body">
                <p className="font-bold text-2xl">
                  {meal.meal.charAt(0).toUpperCase() + meal.meal.slice(1)}:{" "}
                  {meal.recipeName}
                </p>
                <p>Calorias: {meal.calories}</p>
                <p>
                  Macros: Proteina {meal.macros.protein} / Carbs{" "}
                  {meal.macros.carbs} / Grasa {meal.macros.fat}
                </p>
                <details className="collapse collapse-arrow shadow-md rounded-2xl mt-2">
                  <summary className="collapse-title text-xl bg-secondary/50">
                    Ingredientes
                  </summary>
                  <div className="collapse-content mt-2">
                    <ul>
                      {meal.ingredients.map((ingredient: any, index: any) => (
                        <li key={index}>
                          - {ingredient.name} | {ingredient.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
                <details className="collapse collapse-arrow shadow-md rounded-2xl flex mt-2">
                  <summary className="collapse-title text-xl bg-secondary/50">
                    Instructiones
                  </summary>
                  <div className="collapse-content mt-2 ">
                    <ul>
                      {meal.instructions.map((instruction: any, index: any) => (
                        <li key={index}>{instruction}</li>
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

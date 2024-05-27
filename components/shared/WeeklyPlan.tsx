import axios from "axios"
import Image from "next/image"
import { useState } from "react"
type Props = {}

const WeeklyPlan = (props: Props) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [weeklyPlan, setWeeklyPlan] = useState<Record<string, any> | null>(null)
  const btnSubmit = async () => {
    // TODO: Implement a retry if it fails to provide the JSON correctly
    setIsGenerating(true)
    const response = await axios.post("/api/generatePlan/daily")
    type JsonRecord = Record<string, any>
    const jsonRecord: JsonRecord = JSON.parse(response.data)
    // setWeeklyPlan(jsonRecord)
    setIsGenerating(false)
  }
  return (
    <div className="flex flex-col justify center items-center p-4  max-w-[900px]">
      {isGenerating ? (
        // <span className="flex loading loading-dots loading-lg"></span>
        <div className="flex flex-col justify-center items-center gap-4 p-4 rounded-xl">
          <p>Chill for a bit</p>
          <Image
            src="/loading-gif.gif"
            // src="/images/loading-gif.gif"
            width={300}
            height={300}
            alt="Loading..."
            className="rounded-xl"
          />
        </div>
      ) : (
        <button className="flex btn btn-primary" onClick={() => btnSubmit()}>
          Generate
        </button>
      )}

      {!isGenerating && weeklyPlan && (
        <div className="">
          <div className="card w-full bg-base-100 shadow-2xl mt-4">
            <div className="card-body">
              <div className="flex flex-col items-center justify-center">
                <h2 className="card-title text-4xl p-2">Day 1</h2>
                <h3 className="card-title">
                  | {weeklyPlan.totalCalories} calories |{" "}
                  {weeklyPlan.totalProtein}g protein |
                </h3>
              </div>
              {weeklyPlan.meals.map((meal: any) => (
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
      )}
    </div>
  )
}

export default WeeklyPlan

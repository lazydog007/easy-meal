import axios from "axios"
import { useState } from "react"

type Props = {}

const WeeklyPlan = (props: Props) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [weeklyPlan, setWeeklyPlan] = useState<Record<string, any> | null>(null)
  const btnSubmit = async () => {
    setIsGenerating(true)
    const response = await axios.post("/api/generatePlan/daily")
    type JsonRecord = Record<string, any>
    const jsonRecord: JsonRecord = JSON.parse(response.data)
    setWeeklyPlan(jsonRecord)
    console.log("weeklyPlan", weeklyPlan)
    setIsGenerating(false)
  }
  return (
    <div className="flex flex-col items-center h-screen w-full">
      {isGenerating ? (
        <span className="flex loading loading-dots loading-lg"></span> // en vez de loading pon a knuckles bailando
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
                <h2 className="card-title text-4xl p-2">Monday</h2>
                <h3 className="card-title">{weeklyPlan.totalCalories}</h3>
              </div>
              {weeklyPlan.meals.map((meal: any) => (
                <div className="card w-full bg-base-100 shadow-xl">
                  <div className="card-body">
                    <p className="font-bold text-2xl">{meal.meal}</p>
                    <p>calories: {meal.calories}</p>
                    <p>macros: Protein: 100 / Carbs: 50 / Fat: 20</p>
                    <p>Ingredients</p>
                    <ul>
                      <li>- ingredient 1</li>
                      <li>- ingredient 2</li>
                      <li>- ingredient 3</li>
                    </ul>
                    <p>Instructions</p>
                    <ul>
                      <li>- step 1</li>
                      <li>- step 2</li>
                      <li>- step 3</li>
                    </ul>
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

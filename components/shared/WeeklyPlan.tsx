import { DailyPlanParams } from "@/lib/database/models/plan.model"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import DailyPlan from "./DailyPlan"
type Props = {}

const WeeklyPlan = (props: Props) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [dailyPlan, setDailyPlan] = useState<DailyPlanParams | null>(null)
  // const [weeklyPlan, setWeeklyPlan] = useState<CreatePlanParams | null>(null)
  const btnSubmit = async () => {
    // TODO: Implement a retry if it fails to provide the JSON correctly
    setIsGenerating(true)
    const response = await axios.post("/api/generatePlan/daily")
    // type JsonRecord = Record<string, any>
    // const jsonRecord: JsonRecord = JSON.parse(response.data)
    console.log("response: " + response)
    console.log("response.data: " + response.data)
    setDailyPlan(response.data)
    setIsGenerating(false)
  }

  // TODO: Need to check if the user has a current plan already then you can apply scenario 1,2,3
  return (
    <div className="flex flex-col justify center items-center p-4  max-w-[900px]">
      {isGenerating ? (
        // <span className="flex loading loading-dots loading-lg"></span>
        <div className="flex flex-col justify-center  h-full items-center gap-4 p-4 rounded-xl">
          <p>Chill</p>
          <Image
            src="/loading-gif.gif"
            width={300}
            height={300}
            alt="Loading..."
            className="rounded-xl"
          />
        </div>
      ) : (
        <div className="flex items-center h-full ">
          {!dailyPlan && (
            <div
              className="flex btn btn-primary btn-lg items-center  font-bold text-2xl"
              onClick={() => btnSubmit()}
            >
              Crea un Plan
            </div>
          )}
        </div>
      )}

      {/* showcase re-generate or save */}
      {!isGenerating && dailyPlan && (
        <>
          <DailyPlan dailyPlanParams={dailyPlan}></DailyPlan>
        </>
      )}
    </div>
  )
}

export default WeeklyPlan

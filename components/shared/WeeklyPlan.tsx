import { DailyPlanParams } from "@/lib/database/models/plan.model"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
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
        <div className="flex flex-col justify-center items-center gap-4 p-4 rounded-xl">
          <p>Chill for a bit</p>
          <Image
            src="/loading-gif.gif"
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

      {/* showcase re-generate or save */}
      {!isGenerating && dailyPlan && <></>}
    </div>
  )
}

export default WeeklyPlan

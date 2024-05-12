import axios from "axios"
import { useState } from "react"

type Props = {}

const WeeklyPlan = (props: Props) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const btnSubmit = async () => {
    setIsGenerating(true)
    console.log("generating plan")
    const response = await axios.post("/api/generatePlan/daily")
    console.log("\n")
    console.log(response)
    setIsGenerating(false)
  }
  return (
    <div className="">
      {isGenerating ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <button className="btn btn-primary" onClick={() => btnSubmit()}>
          Generate
        </button>
      )}
    </div>
  )
}

export default WeeklyPlan

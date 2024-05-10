"use client"
import FirstTimeForm from "@/components/shared/FirstTimeForm"
import axios from "axios"
import { useState } from "react"

type Props = {}

const Plan = (props: Props) => {
  const [isGenerating, setIsGenerating] = useState(false)
  // const {
  //   data: userSubscription,
  //   isLoading: userSubcriptionLoading,
  //   // refetch: userSubscriptionRefecth,
  // } = useQuery({
  //   queryKey: ["getUserSubscription"],
  //   queryFn: async () => {
  //     const response = await axios.get(`/api/get`)
  //     return response.data
  //   },
  // })

  const btnSubmit = async () => {
    setIsGenerating(true)
    console.log("generating plan")
    const response = await axios.post("/api/generatePlan/daily")
    console.log("\n")
    console.log(response)
    setIsGenerating(true)
  }

  return (
    <div className="flex px-16 py-10 font-bold text-xl w-full h-full">
      <FirstTimeForm />
      {isGenerating ? (
        <span className="flex justify-center loading loading-dots loading-lg"></span>
      ) : (
        <button className="btn btn-primary" onClick={() => btnSubmit()}>
          Generate
        </button>
      )}
    </div>
  )
}

export default Plan

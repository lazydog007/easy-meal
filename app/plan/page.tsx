"use client"
import FirstTimeForm from "@/components/shared/FirstTimeForm"
import WeeklyPlan from "@/components/shared/WeeklyPlan"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Props = {}

const Plan = (props: Props) => {
  const { data: userProfile, isLoading: userProfileLoading } = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/getProfile`)
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 500) {
          // Ignore 500 errors by returning null or a default value
          return null
        }
        // Rethrow if it's not a 500 error or an unknown error
        throw error
      }
    },
  })

  // TODO: Here we are going to do the chekcing if the user has a current plan
  return (
    <div className="flex justify-center overflow-auto px-16 py-10 font-bold text-xl w-full h-full">
      {userProfileLoading && (
        <span className="flex loading loading-dots loading-lg"></span>
      )}
      {!userProfileLoading && !userProfile && <FirstTimeForm />}
      {!userProfileLoading && userProfile && <WeeklyPlan />}
    </div>
  )
}

export default Plan

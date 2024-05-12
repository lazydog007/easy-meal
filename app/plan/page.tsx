"use client"
import FirstTimeForm from "@/components/shared/FirstTimeForm"
import WeeklyPlan from "@/components/shared/WeeklyPlan"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Props = {}

const Plan = (props: Props) => {
  const {
    data: userProfile,
    isLoading: userProfileLoading,
    // refetch: userProfileRefecth,
  } = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      const response = await axios.get(`/api/getProfile`)
      return response.data
    },
  })

  return (
    <div className="flex items-center justify-center px-16 py-10 font-bold text-xl w-full h-full">
      {!userProfileLoading && userProfile ? (
        <WeeklyPlan />
      ) : (
        <>
          {/* TODO: Need after the form is submitted we want to display the other thing */}
          <FirstTimeForm />
        </>
      )}
    </div>
  )
}

export default Plan

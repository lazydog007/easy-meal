"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Props = {}

const Profile = (props: Props) => {
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

  return (
    <div className="flex flex-col justify center items-center p-4 max-w-[900px]">
      {userProfileLoading && (
        <span className="flex loading loading-dots loading-lg"></span>
      )}
      {/* {!userProfileLoading && !userProfile && <FirstTimeForm />} */}
      {!userProfileLoading && userProfile && (
        <div className="flex">
          <p>Profile</p>
          <p>{userProfile.userId}</p>
        </div>
      )}
    </div>
  )
}

export default Profile

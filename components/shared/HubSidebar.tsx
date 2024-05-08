"use client"
import {
  // calculatePlanLimits,
  formatDateTime,
} from "@/lib/utils"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "../ui/button"
// import CreateChatComponent from "./CreateChat"
import MembershipDialog from "./MembershipDialog"
type Props = {
  onChatItemClick: (chatId: string) => void
  onNewChatCreated: (chatId: string) => void
}

const HubSidebar = ({ onChatItemClick, onNewChatCreated }: Props) => {
  const [selectedModel, setSelectedModel] = useState("claude-3-haiku")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const chatIcon: Map<string, string> = new Map([
    ["gpt-3.5-turbo", "/assets/images/chatgpt-icon.svg"],
    ["gpt-4-turbo", "/assets/images/chatgpt-icon.svg"],
    ["dall-e-2", "/assets/images/magic-wand-icon.svg"],
    ["dall-e-3", "/assets/images/magic-wand-icon.svg"],
    ["claude-3-haiku", "/assets/images/claude-ai-icon.svg"],
    ["claude-3-sonnet", "/assets/images/claude-ai-icon.svg"],
    ["claude-3-opus", "/assets/images/claude-ai-icon.svg"],
  ])
  const truncateString = (
    str: string,
    maxLength: number,
    extra: string = ""
  ): string => {
    return str.length > maxLength ? str.slice(0, maxLength) + extra : str
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleChatItemClick = (chatId: string) => {
    onChatItemClick(chatId) // this sends the chatId back
  }

  const handleModelChange = (value: string) => {
    setSelectedModel(value)
  }
  const {
    data: allChats,
    isLoading: allChatsLoading,
    refetch: allChatsRefetch,
  } = useQuery({
    queryKey: ["getUserChatLite"],
    queryFn: async () => {
      // userSubscriptionRefecth()
      const response = await axios.get(`/api/getUserChatsLite`)
      return response.data
    },
  })

  const {
    data: userSubscription,
    isLoading: userSubcriptionLoading,
    // refetch: userSubscriptionRefecth,
  } = useQuery({
    queryKey: ["getUserSubscription"],
    queryFn: async () => {
      const response = await axios.get(`/api/getUserSubscription`)
      return response.data
    },
  })

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const response = await axios.get(`/api/getUser`)
      return response.data
    },
  })

  const handleSubscription = async () => {
    try {
      const response = await axios.get(`/api/stripe?membership`)
      window.location.href = response.data.url
    } catch (error) {
      console.log("Handling subscription error", error)
    }
  }

  // const localModelLimit = (membership: string = "Noob", model: string) => {
  //   const newPlanLimits = calculatePlanLimits(membership)
  //   const modelLimit = getModelLimitFromPlan(newPlanLimits, model)
  //   return modelLimit
  // }

  return (
    <div>
      <SignedIn>
        <div className="h-screen p-2 md:flex text-white bg-white/5 justify-center items-center">
          <div className="flex size-full flex-col p-4 gap-2">
            <div className="flex flex-col flex-[1]">
              <Link href="/" className="sidebar-logo">
                <Image
                  src="/assets/images/powerhub-logo.png"
                  alt="Logo"
                  width={250}
                  height={100}
                  priority={true}
                  className="cursor-pointer rounded-lg"
                />
              </Link>
              {/* <CreateChatComponent
                selectedModel={selectedModel}
                onModelChange={handleModelChange}
                allChatsRefetch={allChatsRefetch}
                membership={userSubscription?.membership}
                onNewChatCreated={onNewChatCreated} // Pass the onNewChatCreated prop
              /> */}
            </div>
            {/* {userData && userData.limits.length > 0 && (
              <div className="flex flex-[1] flex-col" id="limits">
                <div>
                  <p className="font-bold">
                    Your {`${userSubscription?.membership || "Noob"}`} Limits
                  </p>
                </div>
                <ul className="px-2 text-sm">
                  {userData.limits.map((modelLimit: IModelLimit) => (
                    <li
                      key={`${userSubscription?.membership}+${modelLimit.model}`}
                    >{`${modelLimit.model}: ${
                      modelLimit.requests
                    } / ${localModelLimit(
                      userSubscription?.membership,
                      modelLimit.model
                    )}`}</li>
                  ))}
                </ul>
              </div>
            )} */}

            <div className="flex flex-[8] mt-4">
              <div className="h-full flex-col md:flex">
                <h3 className="font-bold">All Chats</h3>

                <ul
                  className="w-full flex-col overflow-auto h-96 gap-4 px-2"
                  id="magicUL"
                >
                  {!allChatsLoading &&
                    allChats.map((chat: any) => (
                      <li
                        key={`${chat.chatId}+${chat.title}`}
                        className="flex bg-cover cursor-pointer transition-all hover:bg-neutral-900 hover:shadow-inner gap-2 text-sm mt-1 items-center"
                        onClick={() => handleChatItemClick(chat.chatId)}
                      >
                        <Image
                          src={chatIcon.get(chat.aiModel)!}
                          alt=""
                          width="24"
                          height="24"
                        />

                        {chat.title ? (
                          <h2>{chat.title}</h2>
                        ) : (
                          <h2>
                            {truncateString(
                              formatDateTime(chat.createdAt),
                              26,
                              "..."
                            )}
                          </h2>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-start">
              <UserButton afterSignOutUrl="/" />
            </div>

            <div className="flex flex-col justify-center flex-[0] gap-4 mb-4">
              {/* <div className="hidden items-center flex-row gap-2 md:flex"> */}
              {!userSubcriptionLoading && userSubscription ? (
                // <div className="font-bold text-md">
                //   {userSubscription.membership}
                // </div>
                <Button
                  id="cancel-button"
                  className="bg-red-900"
                  onClick={handleSubscription}
                >
                  <p className="font-mono font-bold">Cancel</p>
                </Button>
              ) : (
                <>
                  <Button id="upgrade-button" onClick={openModal}>
                    <p className="font-mono font-bold">Upgrade Now</p>
                  </Button>
                </>
              )}
              {/* </div> */}
              <>
                {/* <Button id="upgrade-button" onClick={createSub}>
                  <p className="font-mono font-bold">Create Sub</p>
                </Button> */}
              </>
            </div>
          </div>
        </div>
        <MembershipDialog
          isOpen={isModalOpen}
          // onClose={closeModal}
          onOpenChange={closeModal}
        />
      </SignedIn>
      <SignedOut></SignedOut>
    </div>
  )
}

export default HubSidebar

// import { plans } from "@/constants"
import axios from "axios"
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

interface MembershipDialogProps {
  isOpen: boolean
  // onClose: () => void
  onOpenChange: (open: boolean) => void
}

const MembershipDialog: React.FC<MembershipDialogProps> = ({
  isOpen,
  // onClose,
  onOpenChange,
}) => {
  const [loading, setLoading] = React.useState(false)

  const handleSubscription = async (membership: string, cost: number) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `/api/stripe?membership=${membership}&cost=${cost}`
      )
      window.location.href = response.data.url
    } catch (error) {
      console.log("Handling subscription error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className=" border-black max-w-4xl mx-auto py-12 bg-neutral-700 text-white">
        <div>
          <DialogHeader className="flex items-center justify-center text-center">
            <DialogTitle className="text-md md:text-4xl">
              Join the Hub
            </DialogTitle>
            <DialogDescription>
              Adios limits for ants, your true potential awaits!
            </DialogDescription>
          </DialogHeader>
        </div>
        {/* <div className="flex flex-col gap-2 mt-2 md:flex-row">
          {plans.map((plan) => (
            // for some reason it needs to have seen the property before it can be used??? weird
            <div
              className={cn(
                "flex flex-[1] justify-center border-2 border-neutral-900 py-8 px-4 rounded-md shadow-2xl hover:bg-black/10",
                {
                  "cursor-pointer hover:shadow-lg ": plan.name !== "Noob",
                  "bg-black ": plan.name === "Technomancer",
                  "bg-black/40 hover:bg-black/10": plan.name === "Hacker",
                  "bg-black/20": plan.name === "Noob",
                }
              )}
              onClick={
                plan.name === "Noob"
                  ? undefined
                  : () => handleSubscription(plan.name, plan.price)
              }
              key={plan._id}
            >
              <div className="flex flex-col">
                <div className="flex flex-col items-center justify-center ">
                  <p className="text-2xl font-mono font-semibold ">
                    {plan.name}
                  </p>
                  <p>===================</p>
                  <p className="text-lg">{`$${plan.price}/mo`}</p>
                </div>
                <div className="flex flex-col">
                  {plan.inclusions.map((inclusion) => (
                    <>
                      <p className="font-bold mt-2">{inclusion.category}</p>
                      <ul className="ml-6 text-sm">
                        {inclusion.items.map((item) => (
                          <li
                            key={`${plan.name}${item.model}-${item.requests}`}
                            className="list-disc"
                            // id={item.model}
                          >
                            <p>{`${item.model}: ${item.requests} reqs/mo`}</p>
                          </li>
                        ))}
                      </ul>
                    </>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </DialogContent>
    </Dialog>
  )
}

export default MembershipDialog

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// SUBSCRIPTION

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message)
    throw new Error(`${error.message}`)
  } else if (typeof error === "string") {
    // This is a string error message
    console.error(error)
    throw new Error(`${error}`)
  } else {
    // This is an unknown type of error
    console.error(error)
    throw new Error(`Unknown error: ${JSON.stringify(error)}`)
  }
}

export function formatDateTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString)

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }

  return new Intl.DateTimeFormat("en-US", options).format(dateTime)
}

// TODO: Mongoose doesn't understand Map
// export function calculatePlanLimits(membership: string): IModelLimit[] {
//   const selectedPlan = plans.find((plan) => plan.name === membership)
//   if (!selectedPlan) {
//     return []
//   }

//   const planLimits: IModelLimit[] = []
//   selectedPlan.inclusions.forEach((inclusion) => {
//     inclusion.items.forEach((item) => {
//       planLimits.push({
//         model: item.model,
//         requests: item.requests,
//       })
//     })
//   })

//   return planLimits
// }

// export function getModelLimitFromPlan(
//   modelLimits: IModelLimit[],
//   model: string
// ): number | undefined {
//   return modelLimits.find((modelLimit) => modelLimit.model === model)?.requests
// }

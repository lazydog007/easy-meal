"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

type Props = {}

const FirstTimeForm = (props: Props) => {
  // const createAccount = () => {
  //   return (
  //     <div className="flex justify-center items-center w-full px-5 py-5">
  //       <div className="bg-white drop-shadow-xl border border-black/20 w-full rounded-xl flex justify-between items-stretch px-5 xl:px-5 py-5">
  //         {/* <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
  //           <img src="./glove.png" alt="login" className="h-[500px]" />
  //         </div> */}
  //         <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
  //           <h1 className="text-center sm:text-2xl font-semibold">
  //             Tell me about yourself
  //           </h1>
  //           <div className="w-full mt-5 sm:mt-8">
  //             <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
  //               <div className="flex flex-col sm:flex-row gap-3">
  //                 <input
  //                   type="text"
  //                   placeholder="Enter Your Age"
  //                   className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
  //                 />
  //                 <input
  //                   type="text"
  //                   placeholder="Enter Your Gender M/F" // TODO: Add dropdown
  //                   className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
  //                 />
  //               </div>
  //               <input
  //                 type="text"
  //                 placeholder="Enter your Weight"
  //                 className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
  //               />
  //               <input
  //                 type="text"
  //                 placeholder="Enter your Height"
  //                 className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
  //               />
  //               <input
  //                 type="text"
  //                 placeholder="Enter your Activity Level" // TODO: Add Dropdown
  //                 className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
  //               />
  //               {/* <div className="flex items-center gap-1.5  justify-start pl-2"> */}
  //               {/* <div className="form-control">
  //                   <label className="label cursor-pointer">
  //                     <input
  //                       type="checkbox"
  //                       className="checkbox-xs checkbox-primary"
  //                     />
  //                   </label>
  //                 </div> */}
  //               {/* <h3 className="flex items-center whitespace-nowrap text-xs text-black">
  //                   I agree to the
  //                   <span className="text-[#4A07DA]">&nbsp;Terms</span>
  //                   &nbsp;and
  //                   <span className="text-[#4A07DA]">&nbsp;Privacy Policy</span>
  //                   .
  //                 </h3> */}
  //               {/* </div> */}
  //             </div>
  //           </div>
  //         </div>
  //         <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
  //           <h1 className="text-center sm:text-2xl font-semibold">
  //             What do you like to eat?
  //           </h1>
  //           <div className="w-full mt-5 sm:mt-8">
  //             <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
  //               <div className="flex flex-col sm:flex-row gap-3">
  //                 <input
  //                   type="text"
  //                   placeholder="Diet Type"
  //                   className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
  //                 />
  //                 <input
  //                   type="text"
  //                   placeholder="Cuisine" // TODO: Add dropdown
  //                   className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
  //                 />
  //               </div>
  //               <input
  //                 type="text"
  //                 placeholder="Likes"
  //                 className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
  //               />
  //               <input
  //                 type="text"
  //                 placeholder="Dislikes"
  //                 className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
  //               />
  //               <input
  //                 type="text"
  //                 placeholder="Allergies or Restrictions"
  //                 className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
  //               />
  //               {/* <div className="flex items-center gap-1.5  justify-start pl-2"> */}
  //               {/* <div className="form-control">
  //                   <label className="label cursor-pointer">
  //                     <input
  //                       type="checkbox"
  //                       className="checkbox-xs checkbox-primary"
  //                     />
  //                   </label>
  //                 </div> */}
  //               {/* <h3 className="flex items-center whitespace-nowrap text-xs text-black">
  //                   I agree to the
  //                   <span className="text-[#4A07DA]">&nbsp;Terms</span>
  //                   &nbsp;and
  //                   <span className="text-[#4A07DA]">&nbsp;Privacy Policy</span>
  //                   .
  //                 </h3> */}
  //               {/* </div> */}
  //               <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center"></div>
  //             </div>
  //           </div>
  //           <button className="btn btn-primary btn-med text-lg btn-block max-w-[200px]">
  //             Submit
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const createAccount = () => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }
  return (
    <div className="flex flex-col w-full items-center">
      <p className="text-4xl">Let's get started</p>
      {createAccount()}
    </div>
  )
}

export default FirstTimeForm

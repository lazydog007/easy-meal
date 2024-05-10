"use client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  age: z.string().min(1, {
    message: "Missing age",
  }),
  gender: z.string().min(0, {
    message: "Missing gender",
  }),
  weight: z.string().min(1, {
    message: "Missing weight",
  }),
  height: z.string().min(1, {
    message: "Missing height",
  }),
  activityLevel: z.string().min(1, {
    message: "Missing activity level",
  }),
  diet: z.string(),
  allergies: z.string(),
  dislikes: z.string(),
  cuisine: z.string(),
})

type Props = {}

const FirstTimeForm = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "28",
      // gender: "M",
      weight: "75",
      height: "170",
      // activityLevel: "active",
      diet: "",
      allergies: "",
      dislikes: "",
      cuisine: "japanese,caribean,italian",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const infoForm = () => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between gap-16 ">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight in kg</FormLabel>
                    <FormControl>
                      <Input placeholder="in kg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height in cm</FormLabel>
                    <FormControl>
                      <Input placeholder="in cm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Activity Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="sedentary">
                          Sedentary (Little to no excercise)
                        </SelectItem>
                        <SelectItem value="light">
                          Light (Exercise 1-3 times/week)
                        </SelectItem>
                        <SelectItem value="moderate">
                          Moderate (Exercise 3-5 times/week)
                        </SelectItem>
                        <SelectItem value="active">
                          Very Active (Exercise 6-7 times/week)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="diet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet</FormLabel>
                    <FormControl>
                      <Input placeholder="vegetarian/halal/etc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein Intake</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="how much protein bruh?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="minimum">
                          Minimum (0.8g x bodyweight in kg)
                        </SelectItem>
                        <SelectItem value="regular">
                          Regular (1g x bodyweight in kg)
                        </SelectItem>
                        <SelectItem value="high">
                          High (1.2g x bodyweight in kg)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <Input placeholder="abc, xyz, ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dislikes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dislikes</FormLabel>
                    <FormControl>
                      <Input placeholder="abc, xyz, ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuisine</FormLabel>
                    <FormControl>
                      <Input placeholder="abc, xyz, ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </Form>
    )
  }
  return (
    <div className="flex flex-col w-full items-center">
      <p className="text-4xl">Let's get started</p>
      {infoForm()}
    </div>
  )
}

export default FirstTimeForm

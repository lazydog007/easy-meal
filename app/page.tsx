import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"

// TODO: Make this a sick landing page
export default function Home() {
  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-background">
      <div className="flex flex-col items-center text-center">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <div className="">
              <UserButton afterSignOutUrl="/" />
            </div>
            <h1 className="text-5xl font-semibold">Easy Meal</h1>
          </div>
          <div className="flex items-center justify-center bg-primary rounded-full w-60 h-60 mt-4">
            <div className="group relative">
              <Link href="/plan">
                <p className="font font-bold text-white text-2xl">CHEF</p>
              </Link>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center justify-center">
            <h1 className="mr-3 text-5xl font-semibold">Easy Meal</h1>
          </div>
          <Button className="flex items-center text-md mt-4">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  )
}

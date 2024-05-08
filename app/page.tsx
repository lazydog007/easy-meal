import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
export default function Home() {
  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-background text-white">
      <div className="flex flex-col items-center text-center">
        <SignedIn>
          <div className="flex items-center">
            <h1 className="text-5xl font-semibold">Power Hub</h1>
          </div>
          <div className="mt-2">
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex items-center justify-center bg-primary rounded-full w-80 h-80 mt-4">
            <div className="group relative">
              <Link href="/hub">
                <Image
                  src="/glove.png"
                  width={250}
                  height={250}
                  alt="power"
                  className="flex mt-4"
                />
              </Link>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Power Hub</h1>
          </div>
          <Button className="flex text-lg px-4 py-4 mt-4">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  )
}

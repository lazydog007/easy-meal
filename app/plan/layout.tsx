import Header from "@/components/shared/Header"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import "../globals.css"

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SignedIn>
        <div className="flex flex-col h-screen text-white bg-black ">
          <Header />
          {children}
        </div>
      </SignedIn>
      <SignedOut>
        {typeof window !== "undefined" &&
          (window.location.href = process.env.NEXT_BASE_URL!)}
      </SignedOut>
    </>
  )
}

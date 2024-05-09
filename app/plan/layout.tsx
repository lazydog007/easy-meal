import Header from "@/components/shared/Header"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import "../globals.css"

export default function PlanLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <html lang="en">
        <SignedIn>
          <Header />
          <div>{children}</div>
        </SignedIn>
        <SignedOut>
          {typeof window !== "undefined" &&
            (window.location.href = process.env.NEXT_BASE_URL!)}
        </SignedOut>
      </html>
    </div>
  )
}

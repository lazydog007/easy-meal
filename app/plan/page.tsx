import { SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"

type Props = {}

const Plan = (props: Props) => {
  return (
    <div>
      <SignedIn>
        <div className="flex flex-row text-lg">
          <ul className="flex flex-row gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/history">History</Link>
            </li>
          </ul>
        </div>
      </SignedIn>
      <SignedOut>
        {typeof window !== "undefined" &&
          (window.location.href = process.env.NEXT_BASE_URL!)}
      </SignedOut>
    </div>
  )
}

export default Plan

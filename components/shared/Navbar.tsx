import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex flex-row text-lg items-center">
      <ul>
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
  )
}

export default Navbar

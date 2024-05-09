import Link from "next/link"

const Header = () => {
  return (
    <header className="navbar bg-white">
      <div className="navbar-start px-3">
        <Link href={"/"}> Easy Meal </Link>
      </div>
      <div className="navbar-end">
        <div className="px-3">
          <Link href={"/blog"}>Blog</Link>
        </div>
      </div>
    </header>
  )
}

export default Header

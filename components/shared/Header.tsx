import Link from "next/link"

const Header = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="w-[500px]">
        <header className="navbar bg-white/30 rounded-full text-black  shadow:xl">
          <div className="navbar-start px-4">
            <Link href={"/"}>Easy Meal</Link>
          </div>
          <div className="navbar-end">
            <div className="px-4">
              <Link href={"/blog"}>Blog</Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Header

import Link from "next/link";
import Connect from "./Connect";

export default function Nav() {
  return (
    <nav className="flex p-6 w-full justify-between">
      <div className="flex gap-3">
        <Link href="/position">
          <p className="logo_text">Position</p>
        </Link>
        <Link href="/profile">
          <p className="logo_text">Profile</p>
        </Link>
      </div>
      <Connect />
    </nav>
  )
}
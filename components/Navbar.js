import { $$currentUser } from "@/lib/stores"
import Link from "next/link"
import __supabase from "@/lib/supabase"
import { useRouter } from "next/router"
import { useStore } from "@nanostores/react"

const Navbar = () => {
  const _currentUser = useStore($$currentUser)
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await __supabase.auth.signOut()

    if (error) {
      alert(error.message)
      return;
    }

    $$currentUser.set(null)
    router.push("/auth")
  }

  return (
    <nav className="absolute z-[50] top-0 left-0 w-full flex justify-between items-center bg-base-100 p-5 lg:px-0">
      <p className="font-bold text-lg">Awesome Todo App</p>
      <div className="flex items-center gap-2">
        {_currentUser ? (
          <>
            <Link href="/todos" className="btn btn-ghost">Todos</Link>
            <button onClick={handleLogout} className="btn btn-error">Logout</button>
          </>
        ) : (
          <Link href="/auth" className="btn btn-primary">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
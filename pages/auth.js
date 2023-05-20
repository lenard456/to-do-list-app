import { $$currentUser } from "@/lib/stores"
import __supabase from "@/lib/supabase"
import { useRouter } from "next/router"
import { useState } from "react"

const AuthPage = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const router = useRouter()

  // registration
  const handleRegister = async (formElement) => {
    formElement.preventDefault()

    // get form data
    const form = new FormData(formElement.target)
    const formData = {
      email: form.get("email"),
      password: form.get("password"),
    }

    const { error } = await __supabase.auth.signUp({ email: formData.email, password: formData.password })

    if (error) {
      alert(error.message);
      return;
    }

    alert("Check email for verification")
  }

  // login
  const handleLogin = async (formElement) => {
    formElement.preventDefault()

    // get form data
    const form = new FormData(formElement.target)
    const formData = {
      email: form.get("email"),
      password: form.get("password"),
    }

    const { data, error } = await __supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login Success")
    $$currentUser.set(data.user)
    router.push("/todos")
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Welcome to this Awesome ToDo Application</h1>

        {
          isRegister ? (
            <div className="mt-5 flex flex-col">
              <form onSubmit={handleRegister} className="flex flex-col w-full max-w-lg gap-3">
                <label className="flex flex-col gap-1">
                  <span>Email</span>
                  <input className="input input-primary w-full" type="text" name="email" />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Password</span>
                  <div className="input-group">
                    <input className="input input-primary w-full" type={isPasswordShown ? "text" : "password"} name="password" />
                    <button
                      onClick={() => setIsPasswordShown(!isPasswordShown)}
                      type="button" className="btn btn-primary">
                      {isPasswordShown ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <button className="btn btn-primary">Register Now</button>
              </form>

              <p onClick={() => setIsRegister(false)} className="link link-primary mt-10">
                Had an Account? Log in here
              </p>
            </div>
          ) : (
            <div className="mt-5 flex flex-col">
              <form onSubmit={handleLogin} className="flex flex-col w-full max-w-lg gap-3">
                <label className="flex flex-col gap-1">
                  <span>Email</span>
                  <input className="input input-primary w-full" type="text" name="email" />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Password</span>
                  <div className="input-group">
                    <input className="input input-primary w-full" type={isPasswordShown ? "text" : "password"} name="password" />
                    <button
                      onClick={() => setIsPasswordShown(!isPasswordShown)}
                      type="button" className="btn btn-primary">
                      {isPasswordShown ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <button className="btn btn-primary">Login</button>
              </form>

              <p onClick={() => setIsRegister(true)} className="link link-primary mt-10">
                Do not have an account? Register here
              </p>
            </div>
          )
        }
      </div>
    </>
  )
}

export default AuthPage
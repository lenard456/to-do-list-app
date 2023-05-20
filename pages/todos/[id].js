import { $$currentUser } from "@/lib/stores"
import Link from "next/link"
import __supabase from "@/lib/supabase"
import { useRouter } from "next/router"
import { useState } from "react"
import { useStore } from "@nanostores/react"

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  const { data, error } = await __supabase.from("todos").select("*").eq("id", id).single()

  if (error) {
    return {
      props: {
        id,
        todo: {}
      }
    }
  }

  return {
    props: {
      id,
      todo: data
    }
  }
}

const TaskPage = ({ id, todo }) => {
  const _currentUser = useStore($$currentUser)
  const [todoData, setTodoData] = useState(todo)
  const router = useRouter()

  const handleDeletePost = async () => {
    const { error } = await __supabase.from("todos").delete().eq("id", id)

    if (error) {
      console.error(error.message)
      return
    }

    router.push("/todos")
  }

  const handleSubmitEdit = async (formElement) => {
    formElement.preventDefault()

    const { data, error } = await __supabase.from("todos").update({
      title: todoData.title,
      content: todoData.content,
      updated_at: new Date().toISOString()
    }).eq("id", id).select("*").single()

    if (error) {
      alert("Soemthing wrong with edit")
      console.log(error.message)
      return;
    }

    alert("Edit Successful")
    setTodoData(data)
  }

  return _currentUser ? (
    <>
      <form onSubmit={handleSubmitEdit} className="py-24 flex flex-col gap-2 min-h-screen">
        <div className="flex gap-2 items-center">
          <Link href="/todos" className="btn btn-ghost text-lg">
            ↤
          </Link>
          <input name="title" className="input input-primary w-full" onChange={e => {
            setTodoData(prev => ({
              ...prev,
              title: e.target.value
            }))
          }} value={todoData.title} />
        </div>

        <div className="mt-5">
          <textarea className="mt-2 textarea textarea-primary w-full" rows={10}
            onChange={e => {
              setTodoData(prev => ({
                ...prev,
                content: e.target.value
              }))
            }}
            value={todoData.content} />
        </div>


        <div className="mt-auto flex justify-end gap-5">
          <button type="button" onClick={handleDeletePost} className="btn btn-error mr-auto">
            Delete Todo
          </button>
          <button onClick={() => {
            setTodoData(todo)
          }} type="reset" className="btn btn-ghost">
            Revert Changes
          </button>
          <button type="submit" className="btn btn-primary">
            Submit Edit
          </button>
        </div>
      </form>
    </>
  ) : (
    <div className="py-24">
      <h1 className="text-4xl font-bold">You need to login first</h1>
    </div>
  )
}

export default TaskPage
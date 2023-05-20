import { useEffect, useState } from "react"

import { $$currentUser } from "@/lib/stores"
import TaskCard from "@/components/TaskCard"
import __supabase from "@/lib/supabase"
import { useStore } from "@nanostores/react"

const TodosPage = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [isAdding, setIsAdding] = useState(false)
  const [todos, setTodos] = useState([])
  const _currentUser = useStore($$currentUser)

  const fetchTodos = async () => {
    const { data, error } = await __supabase.from("todos").select("*").eq("uploader", _currentUser.id)

    if (error) {
      console.error(error.message)
      return;
    }

    console.log(data)
    setTodos(data)
  }

  const handlePostTodo = async (formElement) => {
    formElement.preventDefault()

    // get form data
    const form = new FormData(formElement.target)
    const formData = {
      title: form.get("title"),
      content: form.get("content"),
      uploader: _currentUser.id
    }

    // query to supabase
    const { data, error } = await __supabase.from("todos").insert([
      {
        title: formData.title,
        content: formData.content,
        uploader: formData.uploader,
      }
    ]).select("*").order("created_at", { ascending: true }).single()

    if (error) {
      console.error(error.message)
      return;
    }

    alert("Todo Added")
    setTodos(prev => [...prev, data])
    setIsAdding(false)
  }

  useEffect(() => {
    if (!!_currentUser) {
      fetchTodos()
    }
  }, [_currentUser])

  return (
    <>
      <div className="py-24">
        {_currentUser ? (
          <>
            <div className="flex justify-between gap-2 mt-5">
              <h1 className="text-4xl font-bold">Your Todo List</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="btn btn-ghost">Toggle View</button>
                <button onClick={() => setIsAdding(true)} className="btn btn-primary">Add new Todo</button>
              </div>
            </div>

            {/* grid card */}
            {
              viewMode === "grid" && (
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {todos.map(item => <TaskCard viewMode="grid" todo={item} setTodoFn={setTodos} />)}
                </div>
              )
            }
            {/* grid card */}
            {
              viewMode === "list" && (
                <div className="mt-4 flex flex-col gap-5">
                  {todos.map(item => <TaskCard viewMode="list" todo={item} setTodoFn={setTodos} />)}
                </div>
              )
            }
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <h1 className="text-3xl font-bold">You are not logged in</h1>
          </div>
        )}

      </div>

      {isAdding && (
        <div className="fixed top-0 left-0 w-full h-screen bg-base-200/50 z-[51] flex justify-center items-center">
          <div className="w-full max-w-lg p-5 bg-base-100 rounded-btn flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Add New Todo</h1>
            <form onSubmit={handlePostTodo} className="flex flex-col gap-2">
              <label className="flex flex-col">
                <span>Title</span>
                <input className="input input-primary" name="title" type="text" />
              </label>
              <label className="flex flex-col">
                <span>Content</span>
                <textarea className="textarea textarea-primary" name="content" type="text" />
              </label>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setIsAdding(false)}
                  type="reset" className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-success">Add Todo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default TodosPage

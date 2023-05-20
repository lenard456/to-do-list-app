import Link from "next/link"
import __supabase from "@/lib/supabase"

const TaskCard = ({ viewMode = "grid", todo, setTodoFn }) => {

  const toggleStatus = async (id) => {
    const { data, error } = await __supabase.from("todos").update({ isComplete: !todo.isComplete }).eq("id", id).select("*")

    console.log(data, error)

    if (error) {
      console.error(error.message)
      return;
    }
    setTodoFn(prev => prev.map(todo => todo.id === id ? data[0] : todo))
  }

  return (
    <>
      {viewMode === "grid" && (
        <div className="bg-base-200 p-3 rounded-btn min-h-[200px] flex flex-col transition-all">
          <div className="text-xl font-bold flex items-center">
            <p className={`badge ${todo.isComplete && "badge-success"}`}>{todo.isComplete ? "Done" : "Pending"}</p>
            <p className="truncate ml-2">{todo.title}</p>
          </div>
          <p className="text-sm text-gray-500 mt-2">{todo.content}</p>
          <div className="flex justify-end mt-auto">
            <div className="btn-group">
              <Link href={`/todos/${todo.id}`} className="btn btn-ghost">Edit</Link>
              <button
                onClick={() => toggleStatus(todo.id)}
                className={`btn ${!todo.isComplete && "btn-success"}`}>
                {todo.isComplete ? "Mark as Pending" : "Mark as done"}
              </button>
            </div>
          </div>
        </div>
      )}
      {viewMode === "list" && (
        <div className="bg-base-200 p-3 rounded-btn flex justify-between items-center transition-all">
          <div>
            <div className="text-xl font-bold flex items-center">
              <p className={`badge ${todo.isComplete && "badge-success"}`}>{todo.isComplete ? "Done" : "Pending"}</p>
              <p className="truncate ml-2">{todo.title}</p>
            </div>
            <p className="text-sm text-gray-500">{todo.content}</p>
          </div>
          <div className="btn-group">
            <Link href={`/todos/${todo.id}`} className="btn btn-ghost">Edit</Link>
            <button
              onClick={() => toggleStatus(todo.id)}
              className={`btn ${!todo.isComplete && "btn-success"}`}>
              {todo.isComplete ? "Mark as Pending" : "Mark as done"}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default TaskCard
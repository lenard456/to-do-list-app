const HomePage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-24">
        <h1 className="font-bold text-4xl">
          Welcome to our Awesome ToDo App
        </h1>
        <div className="flex flex-col items-center justify-center gap-2 mt-5">
          <p>What technologies are we using?</p>
          <div className="flex gap-2">
            <p className="badge badge-primary">Next.js</p>
            <p className="badge badge-primary">React</p>
            <p className="badge badge-primary">Tailwind</p>
            <p className="badge badge-primary">DaisyUI</p>
            <p className="badge badge-primary">Nanostores</p>
            <p className="badge badge-primary">Supabase</p>
          </div>
          <p className="text-sm text-gray-500 mt-5">
            Made with ❤️ by {" "}
            Gerald Chavez, Sarah Oben, and Lenard Mangay-ayam
          </p>
        </div>
      </div>
    </>
  )
}

export default HomePage
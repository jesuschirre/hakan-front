export default function Ball() {
  return (
    <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-linear-to-tr from-soft to-warning rounded-full animate-spin" />
        <div className="w-full h-1/2 absolute bg-white/10 bottom-0 backdrop-blur-lg" />
    </div>
  )
}
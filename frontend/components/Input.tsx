export default function Input({
  name,
  placeholder
}: {
  name: string,
  placeholder: string
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-semibold text-sm">{name}</p>
      <input className="w-full p-4 rounded-sm" placeholder={placeholder}></input>
    </div>
  )
}
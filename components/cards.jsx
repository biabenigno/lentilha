export default function Cards({ title, description, children = null }) {
  return (
    <div className="rounded-md bg-[#fef7ff] border shadow-sm w-[18rem] m-2">
      {/* HEADER */}
      <div className="flex gap-4 p-4 bg-[#ffae3c] items-center rounded-t-md">
        <img src={"/Frame 2.png"} alt="co2" className="w-6 h-6" />
        <p className="text-white font-medium">{title}</p>
      </div>

      {/* CONTEÚDO */}
      <div className="p-4 space-y-4">
        <div className="text-sm">{description}</div>

        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
}

const Cover = ({ color }: { color: string }) => {
  return (
    <div
      className={`h-[13rem] w-full`}
      style={{
        backgroundColor: color,
      }}
    ></div>
  )
}

export default Cover

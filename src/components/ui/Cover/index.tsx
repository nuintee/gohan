import { colors } from '@/config/colors'

const Cover = ({ color = colors['gh-gray'] }: { color?: string }) => {
  return (
    <div
      className={`h-[13rem] w-full absolute top-0 left-0 z-[-1]`}
      style={{
        backgroundColor: color,
      }}
    ></div>
  )
}

export default Cover

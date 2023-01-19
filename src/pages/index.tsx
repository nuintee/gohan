const BadComponent = () => {
  const chance = Math.random() > 0.5

  if (chance) throw new Error('This is bad!')

  return <>Bad</>
}

const Index = () => {
  return (
    <div>
      <p>Index</p>
      <BadComponent />
    </div>
  )
}

export default Index

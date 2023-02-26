const Recursive = ({ tree }) => {
  return (
    // <details style={{ paddingLeft: 10 }}>
    //   <summary>{tree.name}</summary>
    //   {tree?.children?.map((child) => {
    //     return (
    //       <div style={{ paddingLeft: 10 }}>
    //         <Recursive tree={child} />
    //       </div>
    //     )
    //   })}
    // </details>
    <details style={{ paddingLeft: 10 }}>
      <summary>{tree.name}</summary>
      {/* {tree?.children?.map((child) => {
        return (
          <div style={{ paddingLeft: 10 }}>
            <Recursive tree={child} />
          </div>
        )
      })} */}
      {Object.keys(tree).map((childKey) => {
        return <div>{/* <Recursive tree={c} /> */}</div>
      })}
    </details>
  )
}

export default Recursive

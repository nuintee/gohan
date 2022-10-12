import React from 'react'

type Props = {
    text: string,
    int?: number,
    children: typeof React.Children
}

const Awesome = (props: Props) => {
    const { text } = props

    return (
        <button>{text}</button>
    )
}

export default Awesome
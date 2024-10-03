import React from 'react'

type Props = {
    params: {
        id: string,
        name?: string
    }
}

const page = (props: Props) => {
  return (
    <div>page {props.params.id}</div>
  )
}

export default page
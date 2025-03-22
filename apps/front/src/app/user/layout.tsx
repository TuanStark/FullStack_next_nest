
import React, { PropsWithChildren } from 'react';


type Props = PropsWithChildren
export default function PostLayout({ children }: Props) {
  return (
    <div className='mt-24 flex flex-col items-center' >
      {children}
    </div>
  )
}

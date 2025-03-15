import React, { PropsWithChildren } from 'react'

export default function Authlayout({ children }: PropsWithChildren) {
    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-100'>
            {" "}
            {children}
        </div>
    )
}

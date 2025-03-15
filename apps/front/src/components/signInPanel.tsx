import React from 'react'
import Link from 'next/link'

export default function SignInPanel() {
    return (
        <>
            <Link href={"/auth/signin"}>Sign In</Link>
            <Link href={"/auth/signup"}>Sign Up</Link>
        </>
    )
}

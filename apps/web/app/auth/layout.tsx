import React, { PropsWithChildren } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
    return (<div className="bg-neutral-900 h-screen flex items-center justify-center">
        {children}
    </div>)
}

export default AuthLayout;
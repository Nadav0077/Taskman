// export function Overlay({onClick}){
//     return <div onClick={onClick} className="base-overlay max-screen2"></div>
// }
import React from 'react'

export function Overlay({ onClick, children }) {
    return <div
        className="base-overlay"
        onClick={onClick}
    >
        {children}
    </div>
}
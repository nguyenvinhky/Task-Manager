import React from 'react'

function Header() {
    return (
        <nav className="flex items-center justify-center flex-wrap bg-teal p-6 bg-blue-700">
            <div className="flex items-center justify-center flex-no-shrink mr-6">
                <span className="font-semibold text-3xl tracking-tight">Task Manager</span>
            </div>
        </nav>
    )
}

export default Header

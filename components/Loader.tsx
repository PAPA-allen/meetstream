import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <LoaderCircle className="animate-spin w-50 h-50" />
        </div>
    )
}

export default Loader

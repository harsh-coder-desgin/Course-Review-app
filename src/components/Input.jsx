import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    err,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className=''
                htmlFor={id}
            >{label}
            </label>}
            <input
                type={type}
                className={` ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
            <p className='text-red-500 font-semibold text-sm mt-2 ml-2'>{err}</p>

        </div>
    )
})

export default Input

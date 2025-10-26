import React, { useId } from 'react'

const Textarea = React.forwardRef(function Textarea({
    label,
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
            <textarea
                className={` ${className}`}
                ref={ref}
                {...props}
                id={id}
            >
            </textarea>
                        <p className='text-red-500 font-semibold text-sm mt-2 ml-2'>{err}</p>
 
        </div>
    )
})

export default Textarea

import React from 'react';

function Button({
    children,
    type='button',
    className=null,
    ...props
}) {
    return (
        <button
            type={type}
            {...props}
            className={className ? className : `w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                            rounded-lg transition duration-200 hover:bg-indigo-600 ease`}
        >{children}</button>
    )
}

export default Button;
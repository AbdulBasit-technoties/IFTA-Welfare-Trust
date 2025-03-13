import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                {...(type === 'file' ? { value: undefined } : {})}
                className={
                    'border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm ' +
                    className
                }
                ref={input}
            />

        </div>
    );
});

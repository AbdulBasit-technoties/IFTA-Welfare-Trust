import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextareaInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        ></textarea>
    );
});

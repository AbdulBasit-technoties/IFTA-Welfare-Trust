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
                'border-gray-300 focus:border-primary focus:ring-primary rounded-md shadow-sm ' +
                className
            }
            ref={input}
        ></textarea>
    );
});

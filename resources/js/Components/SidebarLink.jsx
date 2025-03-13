import { Link } from '@inertiajs/react';

export default function SidebarLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                `flex items-center justify-between p-2 text-gray-900 transition-all duration-500 rounded-lg hover:bg-gray-500 hover:dark:bg-gray-800 group ` +
                (active ? 'bg-gray-500 dark:bg-gray-800' : '') +
                className
            }
        >
            {children}
        </Link>
    );
}

import { Link } from '@inertiajs/react';

export default function SidebarLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                `flex items-center justify-between p-2 text-primary transition-all duration-500 rounded-sm group ` +
                (active ? 'dark:bg-secondary bg-orange/80' : '') +
                className
            }
        >
            {children}
        </Link>
    );
}

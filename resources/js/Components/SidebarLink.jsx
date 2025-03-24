import { Link } from '@inertiajs/react';

export default function SidebarLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                `flex items-center justify-between p-2 text-primary transition-all duration-500 rounded-lg hover:dark:bg-accent hover:bg-primary group ` +
                (active ? 'dark:bg-accent bg-primary' : '') +
                className
            }
        >
            {children}
        </Link>
    );
}

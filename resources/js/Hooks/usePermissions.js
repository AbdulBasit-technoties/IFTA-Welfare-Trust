import { usePage } from '@inertiajs/react';

function usePermissions() {
    const { auth } = usePage().props;

    return {
        can(permission) {
            return auth.permissions.includes(permission);
        },
    };
}

export default usePermissions;

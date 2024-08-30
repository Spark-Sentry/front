'use client';

import React from 'react';
import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '@/actions/logout';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async (formData: FormData) => {
        const result = await logout();
        if (result.success && result.shouldRedirect) {
            router.push('/auth/login');
        } else if (result.error) {
            console.error('Logout failed:', result.error);
        }
    };

    return (
        <form action={handleLogout}>
            <button type="submit">
                <PowerIcon className="w-5 mt-1.5 stroke-black dark:stroke-slate-100 stroke-2" />
            </button>
        </form>
    );
};

export default LogoutButton;
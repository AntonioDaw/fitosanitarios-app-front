'use client';

import DeleteButton from '../DeleteButton';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { User } from '@/app/types';
import {
    User2Icon,
    MailIcon,
    ShieldIcon
} from 'lucide-react';
import { useSession } from 'next-auth/react';

interface UserShowProps {
    user: User;
    onDelete: () => void;
}

export default function UserShow({ user, onDelete }: UserShowProps) {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const isCurrentUser = (id: number | string) => Number(id) === Number(userId);
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <User2Icon className="w-7 h-7 text-yellow-400" />
                        <div>
                            <p className="text-sm text-slate-300">Nombre</p>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MailIcon className="w-7 h-7 text-yellow-400" />
                        <div>
                            <p className="text-sm text-slate-300">Correo</p>
                            <h2 className="text-xl font-semibold">{user.email}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <ShieldIcon className="w-7 h-7 text-yellow-400" />
                        <div>
                            <p className="text-sm text-slate-300">Rol</p>
                            <h2 className="text-xl font-semibold capitalize">{user.role}</h2>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 px-6 py-4 flex justify-end gap-4">
                    <Link
                        href="edit"
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform hover:scale-105"
                    >
                        <FaEdit className="w-4 h-4" />
                    
                    </Link>
                    {!isCurrentUser(user.id) && (
                        <DeleteButton id={Number(user.id)} onDeleted={onDelete} tipo="Usuario" />
                    )}

                </div>
            </div>
        </div>
    );
}

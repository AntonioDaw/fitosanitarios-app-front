import React from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";


interface TopBarDeskProps {
    query: string;
    setQuery: (value: string) => void;
}

const TopBarDesk: React.FC<TopBarDeskProps> = ({ query, setQuery }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <SearchInput
                value={query}
                onChange={setQuery}
                placeholder="Buscar cultivo..."
            />
            <Link
                href="/dashboard/cultivos/create"
                className="px-5 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
            >
                Crear
            </Link>
        </div>
    );
};

export default TopBarDesk;
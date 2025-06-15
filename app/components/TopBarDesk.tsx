import React from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";


interface TopBarDeskProps {
    query: string;
    tipoBarra?: string;
    setQuery: (value: string) => void;
}

const TopBarDesk: React.FC<TopBarDeskProps> = ({ query, setQuery, tipoBarra }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            {<SearchInput
                value={query}
                onChange={setQuery}
                placeholder={`Buscar ${tipoBarra}...`}
            />}
            
            <Link
                href={`/dashboard/${tipoBarra}s/create`}
                className="px-5 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
            >
                Crear
            </Link>
        </div>
    );
};

export default TopBarDesk;
import React from 'react';

const DashboardSkeleton = () => {
      return (
    <div className="animate-pulse space-y-6">
      {/* Título principal */}
      <div className="h-10 w-1/3 bg-gray-300 rounded" />

      {/* Grid de cards + tablas */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-4">
            {/* Card */}
            <div className="bg-white shadow rounded-lg p-4 space-y-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto" />
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
            </div>

            {/* Tabla con encabezados simulados como divs */}
            <div className="border border-gray-300 rounded overflow-hidden">
              <div className="grid grid-cols-3 gap-2 p-2 bg-gray-100">
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-full" />
              </div>
              <div className="space-y-1 p-2">
                {Array.from({ length: 3 }).map((_, row) => (
                  <div key={row} className="grid grid-cols-3 gap-2">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
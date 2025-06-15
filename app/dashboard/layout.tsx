import React, { FC, PropsWithChildren } from 'react';
import SideNav from '../components/SideNav';
import { MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';




const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
            <aside className='w-full flex-none md:w-64 bg-slate-700'>
                <SideNav />
            </aside>
            <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
                <MantineProvider defaultColorScheme="light">
                    {children}
                    <Toaster position="top-right" />
                </MantineProvider>
            </div>
        </div>
    )

}

export default DashboardLayout
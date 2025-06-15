import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import LogoutButton from './logoutButton';

const SideNav = () => {
    return (
        <div className='flex h-full flex-col px-3 py-4 md:px-2'>
            <a href="#" className='mb-2 flex h-20 items-end justify-start 
bg-slate-900 p-4 md:h-40'>
                <div className='w-32 text-white md:w-40'>
                    <Logo />
                </div>
            </a>
            <div className='flex grow flex-row justify-between space-x-2
md:flex-col md:space-x-0 md:space-y-2'>
                <NavLinks />
                <div className='hidden h-auto w-full grow md:block'></div>
               <LogoutButton/>

            </div>
        </div>
    )
}

export default SideNav
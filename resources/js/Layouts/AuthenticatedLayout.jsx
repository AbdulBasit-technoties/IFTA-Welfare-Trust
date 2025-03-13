import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import { FaChevronDown } from "react-icons/fa";
import SidebarLink from '@/Components/SidebarLink';
import { FaBarsStaggered } from "react-icons/fa6";

export default function Authenticated({ auth, header, children }) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 769) {
                setIsDrawerOpen(true);
            } else {
                setIsDrawerOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [isSubNavOpen, setSubNavOpen] = useState(null);
    const toggleSubNav = (txt) => {
        setSubNavOpen(isSubNavOpen === txt ? null : txt);
    };
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        root.classList.add("transition-all", "duration-500");

        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-gray-200">
            {/* Navbar */}
            <nav className="bg-gray-800 dark:bg-white fixed top-0 w-full left-0 z-50">
                <div className="md:px-4 px-2">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-5">
                            <Link href="/">
                                <ApplicationLogo />
                            </Link>
                            <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className='hidden lg:block'>
                                <FaBarsStaggered className="text-2xl text-white dark:text-gray-800" />
                            </button>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className="swap swap-rotate cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                                <svg
                                    className="swap-off h-10 w-10 fill-white transition-all duration-500 ease-in-out rotate-0 dark:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                                <svg
                                    className="swap-on h-10 w-10 fill-black transition-all duration-500 ease-in-out rotate-180 dark:rotate-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>

                            <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className='block lg:hidden'>
                                <FaBarsStaggered className="text-2xl text-white dark:text-gray-800" />
                            </button>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center px-3 py-2 border border-transparent md:text-sm text-xs font-medium rounded-md text-gray-500  bg-white dark:bg-gray-800 dark:text-white hover:text-gray-700">
                                        {auth.user.name}
                                        <FaChevronDown className="md:ml-2 ml-1" />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Layout */}
            <main className="">
                <ToastContainer />
                <div className="grid grid-cols-12 transition-all duration-500">
                    {isDrawerOpen && (
                        <div className={`${isDrawerOpen ? 'absolute z-10 left-0 lg:w-full sm:w-1/2 w-10/12' : ''} overflow-y-auto xl:col-span-2 lg:col-span-3 lg:block  dark:bg-white bg-gray-800 h-screen p-4 pt-20 lg:sticky lg:top-0`}>
                            <ul className="">
                                <li>
                                    <SidebarLink href={route('roles.index')} active={route().current('roles.index')}>
                                        <span className={`ml-3 transition-all duration-500 
                                    ${route().current('roles.index') ? 'text-white dark:text-white' : 'text-white dark:text-gray-800 group-hover:text-white'}`}>
                                            Roles
                                        </span>
                                    </SidebarLink>
                                </li>
                                <li>
                                    <SidebarLink href={route('institutions.index')} active={route().current('institutions.index')}>
                                        <span className={`ml-3 transition-all duration-500 
                                    ${route().current('institutions.index') ? 'text-white dark:text-white' : 'text-white dark:text-gray-800 group-hover:text-white'}`}>
                                            Institution
                                        </span>
                                    </SidebarLink>
                                </li>
                                <li>
                                    <div
                                        className={`flex group items-center justify-between p-2 mb-2 rounded-lg cursor-pointer 
                                        text-gray-900 dark:text-gray-300 hover:bg-gray-500 hover:dark:bg-gray-800  
                                        ${route().current('dashboard') || isSubNavOpen === 'beneficiary' ? 'bg-gray-500 dark:bg-gray-800 text-white dark:text-white' : ''}`}
                                        onClick={() => toggleSubNav('beneficiary')}
                                    >
                                        <span className={`ml-3 group-hover:dark:text-white text-white ${route().current('dashboard') || isSubNavOpen === 'beneficiary' ? 'text-white dark:text-white' : 'text-gray-900 dark:text-gray-800'}`}>
                                            Beneficiary Registration
                                        </span>
                                        <FaChevronDown
                                            className={`transition-all duration-300 group-hover:dark:text-white
                                            ${route().current('dashboard') || isSubNavOpen === 'beneficiary' ? 'text-white dark:text-white' : 'text-white dark:text-gray-800'}`}
                                        />

                                    </div>
                                    {isSubNavOpen === 'beneficiary' && (
                                        <ul className="sub-navigation text-sm">
                                            <li>
                                                <SidebarLink href={route('beneficiarys-patients.index')} active={route().current('beneficiarys-patients.index')}>
                                                    <span className={`ml-3 transition-all duration-500 
                                    ${route().current('beneficiarys-patients.index') ? 'text-white dark:text-white' : 'text-white dark:text-gray-800 group-hover:text-white'}`}>
                                                        Patient
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                            <li>
                                                <SidebarLink href={route('beneficiarys-rations.index')} active={route().current('beneficiarys-rations.index')}>
                                                    <span className={`ml-3 transition-all duration-500 
                                    ${route().current('beneficiarys-rations.index') ? 'text-white dark:text-white' : 'text-white dark:text-gray-800 group-hover:text-white'}`}>
                                                        Ration
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                            <li>
                                                <SidebarLink href={route('beneficiarys-educations.index')} active={route().current('beneficiarys-educations.index')}>
                                                    <span className={`ml-3 transition-all duration-500 
                                    ${route().current('beneficiarys-educations.index') ? 'text-white dark:text-white' : 'text-white dark:text-gray-800 group-hover:text-white'}`}>
                                                        Higher Education
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                            <li>
                                                <SidebarLink href={route('beneficiarys-schools.index')} active={route().current('beneficiarys-schools.index')}>
                                                    <span className={`ml-3 transition-all duration-500 
                                    ${route().current('beneficiarys-schools.index') ? 'text-white dark:text-white' : 'text-white dark:text-gray-800 group-hover:text-white'}`}>
                                                        School
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                            <li>
                                                <SidebarLink href={route('beneficiarys-marriages.index')} active={route().current('beneficiarys-marriages.index')}>
                                                    <span className={`ml-3 transition-all duration-500 
                                    ${route().current('beneficiarys-marriages.index') ? 'text-white dark:text-white' : 'text-white dark:text-gray-800 group-hover:text-white'}`}>
                                                        Beneficiary Marriage
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <div
                                        className={`flex group items-center justify-between p-2 mb-2 rounded-lg cursor-pointer 
                                        text-gray-900 dark:text-gray-300 hover:bg-gray-500 hover:dark:bg-gray-800  
                                        ${route().current('dashboard') || isSubNavOpen === 'users' ? 'bg-gray-500 dark:bg-gray-800 text-white dark:text-white' : ''}`}
                                        onClick={() => toggleSubNav('users')}
                                    >
                                        <span className={`ml-3 group-hover:dark:text-white text-white ${route().current('dashboard') || isSubNavOpen === 'users' ? 'text-white dark:text-white' : 'text-gray-900 dark:text-gray-800'}`}>
                                            User
                                        </span>
                                        <FaChevronDown
                                            className={`transition-all duration-300 group-hover:dark:text-white
                                            ${route().current('dashboard') || isSubNavOpen === 'users' ? 'text-white dark:text-white' : 'text-white dark:text-gray-800'}`}
                                        />

                                    </div>
                                    {isSubNavOpen === 'users' && (
                                        <ul className="sub-navigation text-sm">
                                            <li>
                                                <SidebarLink href={route('donors.index')} active={route().current('donors.index')}>
                                                    <span className={`ml-3 transition-all duration-500 
                                    ${route().current('donors.index') ? 'text-white dark:text-white' : 'text-white dark:text-gray-800 group-hover:text-white'}`}>
                                                        Donor
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                            <li>
                                                <SidebarLink href={route('beneficiarys.index')} active={route().current('beneficiarys.index')}>
                                                    <span className={`ml-3 transition-all duration-500 
                                    ${route().current('beneficiarys.index') ? 'text-white dark:text-white' : 'text-white dark:text-gray-800 group-hover:text-white'}`}>
                                                        Beneficiary
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                        </ul>
                                    )}
                                </li>

                            </ul>
                        </div>
                    )}
                    <div className={`${isDrawerOpen ? 'xl:col-span-10 lg:col-span-9 col-span-12' : 'col-span-12'} transition-all duration-500`}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

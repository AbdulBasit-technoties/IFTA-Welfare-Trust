import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, router, usePage } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import { FaChevronDown, FaMoneyBillWave, FaUser, FaUserShield } from "react-icons/fa";
import SidebarLink from '@/Components/SidebarLink';
import { FaBarsStaggered } from "react-icons/fa6";
import usePermissions from '@/Hooks/usePermissions';
import { MdPerson, MdSchool, MdSpaceDashboard, MdVolunteerActivism } from 'react-icons/md';
import { IoLayersSharp, IoSettings } from 'react-icons/io5';
export default function Authenticated({ auth, header, children }) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(window.innerWidth >= 768);
    const { can } = usePermissions();
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

    const roles = auth.user.roles.map(role => role.name);
    const { pendingPaymentsCount } = usePage().props;
    const { approvedPaymentsCount } = usePage().props;
    const { pendingBeneficiaryCount } = usePage().props;
    const { approvedBeneficiaryCount } = usePage().props;
    return (
        <div className="min-h-screen bg-gray-200">
            {/* Navbar */}
            <nav className="dark:bg-primary bg-secondary fixed top-0 w-full left-0 z-50">
                <div className="md:px-4 px-2">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-5">
                            <Link href="/">
                                <ApplicationLogo />
                            </Link>
                            <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className='hidden lg:block'>
                                <FaBarsStaggered className="text-2xl dark:text-secondary text-primary" />
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
                                    className="swap-off h-10 w-10 fill-black transition-all duration-500 ease-in-out dark:rotate-0 rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                                <svg
                                    className="swap-on h-10 w-10 fill-white transition-all duration-500 ease-in-out dark:rotate-0 rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>

                            <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className='block lg:hidden'>
                                <FaBarsStaggered className="text-2xl dark:text-secondary text-primary" />
                            </button>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="px-3 py-2 font-medium rounded-md dark:text-orange  dark:bg-secondary bg-orange/80 text-secondary">
                                        <IoSettings />
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
                        <div className={`${isDrawerOpen ? 'absolute z-10 left-0 lg:w-full sm:w-1/2 w-10/12' : ''} overflow-y-auto xl:col-span-2 lg:col-span-3 lg:block  bg-secondary dark:bg-primary h-screen p-4 pt-20 lg:sticky lg:top-0`}>
                            <ul className="space-y-4">
                                <li className='group'>
                                    <SidebarLink href={route('dashboard')} active={route().current('dashboard')}>
                                        <span className={`ml-3 font-bold text-lg flex items-center gap-1 transition-all duration-500 
                                    ${route().current('dashboard') ? 'dark:text-primary text-secondary' : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                            <MdSpaceDashboard /> Dashboard
                                        </span>
                                    </SidebarLink>
                                </li>
                                {can('beneficiarys-applications.index') && (
                                    <li className='relative'>
                                        <span className="absolute -top-2 -right-2 dark:bg-orange bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                            {approvedBeneficiaryCount ?? 0}
                                        </span>
                                        <div
                                            className={`flex group items-center justify-between p-2 mb-2 rounded-sm cursor-pointer 
            dark:text-secondary text-primary  
            ${['beneficiarys-applications.index', 'beneficiarys-applications.create', 'beneficiarys-applications.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'beneficiarys-applications'
                                                    ? 'dark:bg-secondary bg-orange/80 dark:text-primary text-secondary'
                                                    : ''}`}
                                            onClick={() => toggleSubNav('beneficiarys-applications')}
                                        >
                                            <span className={`ml-3 flex gap-1 items-center font-bold text-lg group-hover:text-orange 
                ${['beneficiarys-applications.index', 'beneficiarys-applications.create', 'beneficiarys-applications.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'beneficiarys-applications'
                                                    ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                    : 'dark:text-secondary text-primary'}`}>
                                                <MdPerson /> Beneficiary Applications
                                            </span>
                                            <FaChevronDown
                                                className={`transition-all duration-300 group-hover:text-orange
                ${['beneficiarys-applications.index', 'beneficiarys-applications.create', 'beneficiarys-applications.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'beneficiarys-applications'
                                                        ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                        : 'dark:text-secondary text-primary'}`}
                                            />
                                        </div>

                                        {isSubNavOpen === 'beneficiarys-applications' && (
                                            <ul className="sub-navigation text-sm space-y-4">
                                                {can('beneficiarys-applications.index') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('beneficiarys-applications.index')} active={route().current('beneficiarys-applications.index')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('beneficiarys-applications.index')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                All Applications
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}
                                                {can('beneficiarys-applications.create') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('beneficiarys-applications.create')} active={route().current('beneficiarys-applications.create')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('beneficiarys-applications.create')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                Add New Application
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </li>
                                )}
                                {can('beneficiarys-applications.index') && (
                                    <li className="group relative">
                                        <span className="absolute -top-2 -right-2 dark:bg-orange bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                            {pendingBeneficiaryCount ?? 0}
                                        </span>
                                        <SidebarLink
                                            href={route('beneficiarys-applications.index', { status: 'Request' })}
                                            active={route().current('beneficiarys-applications.index')}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(route('beneficiarys-applications.index', { status: 'Request' }));
                                            }}
                                        >
                                            <span className={`ml-3 flex items-center gap-1 font-bold text-lg transition-all duration-500 
                ${route().current('beneficiarys-applications.index')
                                                    ? 'dark:text-primary text-secondary'
                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}
                                            >
                                                <MdPerson /> Beneficiary Request
                                            </span>
                                        </SidebarLink>
                                    </li>
                                )}
                                {can('users.index') && (
                                    <li className="group relative">
                                        <SidebarLink
                                            href={route('users.index', { role: 'Beneficiary' })}
                                            active={route().current('users.index')}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(route('users.index', { role: 'Beneficiary' }));
                                            }}
                                        >
                                            <span className={`ml-3 flex items-center gap-1 font-bold text-lg transition-all duration-500 
                ${route().current('users.index')
                                                    ? 'dark:text-primary text-secondary'
                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}
                                            >
                                                <MdPerson /> Beneficiary
                                            </span>
                                        </SidebarLink>
                                    </li>
                                )}
                                {can('users.index') && (
                                    <li className="group relative">
                                        <SidebarLink
                                            href={route('users.index', { role: 'Donor' })}
                                            active={route().current('users.index')}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(route('users.index', { role: 'Donor' }));
                                            }}
                                        >
                                            <span className={`ml-3 flex items-center gap-1 font-bold text-lg transition-all duration-500 
                ${route().current('users.index')
                                                    ? 'dark:text-primary text-secondary'
                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}
                                            >
                                                <MdVolunteerActivism /> Donor
                                            </span>
                                        </SidebarLink>
                                    </li>
                                )}
                                {can('payments.index') && (
                                    <li className='relative'>
                                        {!roles.includes('Donor') &&
                                            <span className="absolute -top-2 -right-2 dark:bg-orange bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                                {approvedPaymentsCount ?? 0}
                                            </span>
                                        }
                                        <div
                                            className={`flex group items-center justify-between p-2 mb-2 rounded-sm cursor-pointer 
        dark:text-secondary text-primary  
        ${['payments.index', 'payments.create'].some(routeName => route().current(routeName)) || isSubNavOpen === 'payments'
                                                    ? 'dark:bg-secondary bg-orange/80 dark:text-primary text-secondary'
                                                    : ''}`}
                                            onClick={() => toggleSubNav('payments')}
                                        >
                                            <span className={`ml-3 flex items-center gap-1 font-bold text-lg group-hover:text-orange 
            ${['payments.index', 'payments.create'].some(routeName => route().current(routeName)) || isSubNavOpen === 'payments'
                                                    ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                    : 'dark:text-secondary text-primary'}`}>
                                                <FaMoneyBillWave /> Payments
                                            </span>
                                            <FaChevronDown
                                                className={`transition-all duration-300 group-hover:text-orange
            ${['payments.index', 'payments.create'].some(routeName => route().current(routeName)) || isSubNavOpen === 'payments'
                                                        ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                        : 'dark:text-secondary text-primary'}`}
                                            />
                                        </div>
                                        {isSubNavOpen === 'payments' && (
                                            <ul className="sub-navigation text-sm space-y-4">
                                                {can('payments.index') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('payments.index')} active={route().current('payments.index')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                            ${route().current('payments.index')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                All Payments
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}
                                                {can('payments.create') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('payments.create')} active={route().current('payments.create')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                            ${route().current('payments.create')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                Add Payment
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </li>
                                )}
                                {can('payments.index') && (
                                    <li className="group relative">
                                        <span className="absolute -top-2 -right-2 dark:bg-orange bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                            {pendingPaymentsCount ?? 0}
                                        </span>
                                        <SidebarLink
                                            href={route('payments.index', { status: 'Request' })}
                                            active={route().current('payments.index')}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(route('payments.index', { status: 'Request' }));
                                            }}
                                        >
                                            <span className={`ml-3 flex items-center gap-1 font-bold text-lg transition-all duration-500 
                ${route().current('payments.index')
                                                    ? 'dark:text-primary text-secondary'
                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}
                                            >
                                                <FaMoneyBillWave /> Payment Request
                                            </span>
                                        </SidebarLink>
                                    </li>
                                )}
                                {can('institutions.index') && (
                                    <li>
                                        <div
                                            className={`flex group items-center justify-between p-2 mb-2 rounded-sm cursor-pointer 
            dark:text-secondary text-primary  
            ${['institutions.index', 'institutions.create', 'institutions.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'institutions'
                                                    ? 'dark:bg-secondary bg-orange/80 dark:text-primary text-secondary'
                                                    : ''}`}
                                            onClick={() => toggleSubNav('institutions')}
                                        >
                                            <span className={`ml-3 flex items-center gap-1 font-bold text-lg group-hover:text-orange 
                ${['institutions.index', 'institutions.create', 'institutions.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'institutions'
                                                    ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                    : 'dark:text-secondary text-primary'}`}>
                                                <MdSchool /> Institutions
                                            </span>
                                            <FaChevronDown
                                                className={`transition-all duration-300 group-hover:text-orange
                ${['institutions.index', 'institutions.create', 'institutions.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'institutions'
                                                        ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                        : 'dark:text-secondary text-primary'}`}
                                            />
                                        </div>
                                        {isSubNavOpen === 'institutions' && (
                                            <ul className="sub-navigation text-sm space-y-4">
                                                {can('institutions.index') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('institutions.index')} active={route().current('institutions.index')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('institutions.index')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                All Institutions
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}
                                                {can('institutions.create') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('institutions.create')} active={route().current('institutions.create')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('institutions.create')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                Add Institution
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}

                                            </ul>
                                        )}
                                    </li>
                                )}
                                {can('programs.index') && (
                                    <li>
                                        <div
                                            className={`flex group items-center justify-between p-2 mb-2 rounded-sm cursor-pointer 
            dark:text-secondary text-primary  
            ${['programs.index', 'programs.create', 'programs.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'programs'
                                                    ? 'dark:bg-secondary bg-orange/80 dark:text-primary text-secondary'
                                                    : ''}`}
                                            onClick={() => toggleSubNav('programs')}
                                        >
                                            <span className={`ml-3 flex items-center gap-1 font-bold text-lg group-hover:text-orange 
                ${['programs.index', 'programs.create', 'programs.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'programs'
                                                    ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                    : 'dark:text-secondary text-primary'}`}>
                                                <IoLayersSharp />Programs
                                            </span>
                                            <FaChevronDown
                                                className={`transition-all duration-300 group-hover:text-orange
                ${['programs.index', 'programs.create', 'programs.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'programs'
                                                        ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                        : 'dark:text-secondary text-primary'}`}
                                            />
                                        </div>
                                        {isSubNavOpen === 'programs' && (
                                            <ul className="sub-navigation text-sm space-y-4">
                                                {can('programs.index') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('programs.index')} active={route().current('programs.index')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('programs.index')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                All Programs
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}
                                                {can('programs.create') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('programs.create')} active={route().current('programs.create')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('programs.create')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                Add Program
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </li>
                                )}
                                {can('roles.index') && (
                                    <li>
                                        <div
                                            className={`flex group items-center justify-between p-2 mb-2 rounded-sm cursor-pointer 
            dark:text-secondary text-primary  
            ${['roles.index', 'roles.create', 'roles.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'roles'
                                                    ? 'dark:bg-secondary bg-orange/80 dark:text-primary text-secondary'
                                                    : ''}`}
                                            onClick={() => toggleSubNav('roles')}
                                        >
                                            <span className={`ml-3 flex items-center gap-1 font-bold text-lg group-hover:text-orange 
                ${['roles.index', 'roles.create', 'roles.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'roles'
                                                    ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                    : 'dark:text-secondary text-primary'}`}>
                                                <FaUserShield /> Roles
                                            </span>
                                            <FaChevronDown
                                                className={`transition-all duration-300 group-hover:text-orange
                ${['roles.index', 'roles.create', 'roles.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'roles'
                                                        ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                        : 'dark:text-secondary text-primary'}`}
                                            />
                                        </div>
                                        {isSubNavOpen === 'roles' && (
                                            <ul className="sub-navigation text-sm space-y-4">
                                                {can('roles.index') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('roles.index')} active={route().current('roles.index')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('roles.index')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                All Roles
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}
                                                {can('roles.create') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('roles.create')} active={route().current('roles.create')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('roles.create')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                Add Role
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}

                                            </ul>
                                        )}
                                    </li>
                                )}
                                {can('users.index') && (
                                    <li>
                                        <div
                                            className={`flex group items-center justify-between p-2 mb-2 rounded-sm cursor-pointer 
            dark:text-secondary text-primary  
            ${['users.index', 'users.create', 'users.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'users'
                                                    ? 'dark:bg-secondary bg-orange/80 dark:text-primary text-secondary'
                                                    : ''}`}
                                            onClick={() => toggleSubNav('users')}
                                        >
                                            <span className={`ml-3 flex items-center gap-1 font-bold text-lg group-hover:text-orange 
                ${['users.index', 'users.create', 'users.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'users'
                                                    ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                    : 'dark:text-secondary text-primary'}`}>
                                                <FaUser /> Users
                                            </span>
                                            <FaChevronDown
                                                className={`transition-all duration-300 group-hover:text-orange
                ${['users.index', 'users.create', 'users.edit'].some(routeName => route().current(routeName)) || isSubNavOpen === 'users'
                                                        ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                        : 'dark:text-secondary text-primary'}`}
                                            />
                                        </div>
                                        {isSubNavOpen === 'users' && (
                                            <ul className="sub-navigation text-sm space-y-4">
                                                {can('users.index') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('users.index')} active={route().current('users.index')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('users.index')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                All Users
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}
                                                {can('users.create') && (
                                                    <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                        <SidebarLink href={route('users.create')} active={route().current('users.create')}>
                                                            <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('users.create')
                                                                    ? 'dark:text-primary text-secondary'
                                                                    : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                                Add User
                                                            </span>
                                                        </SidebarLink>
                                                    </li>
                                                )}

                                            </ul>
                                        )}
                                    </li>
                                )}
                                <li>
                                    <div
                                        className={`flex group items-center justify-between p-2 mb-2 rounded-sm cursor-pointer 
            dark:text-secondary text-primary 
            ${['profile.edit'].some(profileName => route().current(profileName)) || isSubNavOpen === 'profile'
                                                ? 'dark:bg-secondary bg-orange/80 dark:text-primary text-secondary'
                                                : ''}`}
                                        onClick={() => toggleSubNav('profile')}
                                    >
                                        <span className={`ml-3 flex items-center gap-1 font-bold text-lg group-hover:text-orange 
                ${['profile.edit'].some(profileName => route().current(profileName)) || isSubNavOpen === 'profile'
                                                ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                : 'dark:text-secondary text-primary'}`}>
                                            <IoSettings /> Setting
                                        </span>
                                        <FaChevronDown
                                            className={`transition-all duration-300 group-hover:text-orange
                ${['profile.edit'].some(profileName => route().current(profileName)) || isSubNavOpen === 'profile'
                                                    ? 'dark:text-primary text-secondary group-hover:text-primary group-hover:dark:text-orange'
                                                    : 'dark:text-secondary text-primary'}`}
                                        />
                                    </div>
                                    {isSubNavOpen === 'profile' && (
                                        <ul className="sub-navigation text-sm space-y-4">
                                            <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                <SidebarLink href={route('profile.edit')} active={route().current('profile.edit')}>
                                                    <span className={`ml-3 font-bold text-lg transition-all duration-500 
                                ${route().current('profile.edit')
                                                            ? 'dark:text-primary text-secondary'
                                                            : 'dark:text-secondary text-primary group-hover:text-orange'}`}>
                                                        Profile
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                            <li className='ml-5 relative before:absolute before:w-[2px] before:-left-2 before:top-1 after:-left-[10px] before:h-2/5 after:absolute after:w-[8px] after:h-[8px] after:top-2/3 after:transform after:-translate-y-1/2 after:rounded-full after:bg-gray-800 after:dark:bg-orange before:bg-gray-800 before:dark:bg-orange'>
                                                <SidebarLink href={route('logout')} method="post">
                                                    <span className={`ml-3 font-bold text-lg transition-all duration-500`}>
                                                        Log Out
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className={`${isDrawerOpen ? 'xl:col-span-10 lg:col-span-9 col-span-12' : 'col-span-12'} text-gray-800 transition-all duration-500`}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

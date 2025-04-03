import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
export default function Index({ auth }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="User" />
            <div className="px-10 py-20">
                <div className="grid grid-cols-12 lg:gap-7 gap-y-6">
                    <div className="2xl:col-span-3 xl:col-span-4 sm:col-span-8 col-span-12">
                        <div className="left-side py-6 px-4 bg-white">
                            <div className="left-side-item">
                                <h3 className="font-bold text-lg mb-3">Basic Information</h3>
                                <ul className="text-gray-500 space-y-3 pl-1 pb-6">
                                    <li className="flex items-center gap-3"><AiOutlineMail />darleeo@example.com</li>
                                    <li className="flex items-center gap-3"><MdOutlinePhone />+1 12445-47878</li>
                                    <li className="flex items-center gap-3"><IoLocationOutline />22, Ave Street, Newyork, USA</li>
                                    <li className="flex items-center gap-3"><IoTimeOutline />Created on 5 Jan 2024, 10:30 am</li>
                                </ul>
                            </div>
                            <div className="left-side-item">
                                <h3 className="font-bold text-lg mb-3">Other Information</h3>
                                <ul className="text-gray-500 space-y-3 pl-1">
                                    <li><span className="sm:w-1/2 w-full sm:font-normal font-bold inline-block">Language</span> English</li>
                                    <li><span className="sm:w-1/2 w-full sm:font-normal font-bold inline-block">Currency</span> United States dollar</li>
                                    <li><span className="sm:w-1/2 w-full sm:font-normal font-bold inline-block">Last Modified</span> 27 Sep 2023, 11:45 pm</li>
                                    <li><span className="sm:w-1/2 w-full sm:font-normal font-bold inline-block">Source</span> Paid Campaign</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="2xl:col-span-9 xl:col-span-8 col-span-12">
                        <div className="tabs-button bg-white rounded-lg">
                            {/* name of each tab group should be unique */}
                            <div className="tabs tabs-lift">
                                <label className="tab">
                                    <input type="radio" name="my_tabs_4" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
                                    Live
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">
                                <div className="flex sm:flex-row flex-col gap-3 sm:gap-0 font-semibold sm:items-center leading-tight text-primary text-xl sm:justify-between mb-4 md:px-4">
                                        <h2>User</h2>
                                        <div className="text-primary md:text-sm text-xs flex sm:items-center gap-5 sm:flex-row flex-col">
                                            Per page /
                                            <Link
                                                href={route('users.create')}
                                                className="inline-flex items-center w-max sm:w-auto px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                            >
                                                Add User
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="rounded-xl overflow-x-auto border-2 border-gray-200">
                                        <table className="table table-xs w-full table-main">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Role</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                <tr className="space-y-3 font-bold">
                                                    <td className="text-sm">Nmae</td>
                                                    <td className="text-sm">Nmae</td>
                                                    <td className="text-sm">Nmae</td>
                                                    <td className="text-sm">Nmae</td>
                                                    <td className="text-sm">Nmae</td>
                                                    <td className="text-sm">Nmae</td>
                                                    <td className="text-sm">
                                                        <div className="flex gap-2">
                                                            <Link href="" className="text-primary text-2xl">
                                                                <FaEdit />
                                                            </Link>
                                                            <Link href="" className="text-primary text-2xl">
                                                                <FaEye />
                                                            </Link>
                                                            <button className="text-primary text-2xl">
                                                                <MdDelete />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    {/* {users && users.last_page > 1 && (
                                        <div className="join flex justify-center mt-6 w-full">
                                            <Link href={users.prev_page_url || "#"} className={join-item btn ${users.prev_page_url ? "" : "btn-disabled"}}>
                                                «
                                            </Link>
                                            <button className="join-item btn cursor-default bg-primary text-white">
                                                Page {users.current_page}
                                            </button>
                                            <Link href={users.next_page_url || "#"} className={join-item btn ${users.next_page_url ? "" : "btn-disabled"}}>
                                                »
                                            </Link>
                                        </div>
                                    )} */}
                                </div>

                                <label className="tab">
                                    <input type="radio" name="my_tabs_4" defaultChecked />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" /></svg>
                                    Laugh
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

                                <label className="tab">
                                    <input type="radio" name="my_tabs_4" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                                    Love
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}


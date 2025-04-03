import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone, MdPerson } from "react-icons/md";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { BiWallet } from "react-icons/bi";
import { FaEdit, FaEye, FaRegUser } from "react-icons/fa";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
export default function Index({ auth, donorData, beneficiaries, payments, paymentStatus }) {
    const { data, setData, patch } = useForm({
        status: '',
        comment: '',
    });


    const [selectedStatus, setSelectedStatus] = useState('');
    const [isStatusModalOpen, setStatusModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [prevStatus, setPrevStatus] = useState('');
    const openStatusModal = (id, currentStatus) => {
        setSelectedItemId(id);
        setPrevStatus(currentStatus);
        setSelectedStatus(currentStatus);
        setStatusModalOpen(true);
    };
    const closeModals = () => {
        setStatusModalOpen(false);
        setSelectedItemId(null);
        setSelectedStatus('');
        setPrevStatus('');
    };
    const submit = (e) => {
        e.preventDefault();
        router.patch(route('payments.update', selectedItemId), {
            status: selectedStatus,
            comment: data.comment,
        }, {
            onSuccess: () => {
                Swal.fire('Updated!', 'Status updated successfully.', 'success');
                closeModals();
            },
            onError: () => {
                Swal.fire('Error!', 'Failed to update status.', 'error');
            }
        });
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="User" />
            <div className="px-10 py-20">
                <div className="flex justify-between items-center bg-white mb-5 p-5 rounded-md text-lg font-bold">
                    <h3>Donor</h3>
                    <Link
                        href={route('users.index')}
                        className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                    >
                        Back
                    </Link>
                </div>
                <div className="grid grid-cols-12 lg:gap-7 gap-y-6">
                    <div className="2xl:col-span-3 xl:col-span-4 sm:col-span-8 col-span-12">
                        <div className="left-side py-6 px-4 bg-white">
                            <div className="left-side-item">
                                <h3 className="font-bold text-lg mb-3">Donor Information</h3>
                                <ul className="text-gray-500 space-y-3 pl-1 pb-6">
                                    <li className="flex items-center gap-3"><FaRegUser />{donorData.name}</li>
                                    <li className="flex items-center gap-3"><AiOutlineMail />{donorData.email}</li>
                                    <li className="flex items-center gap-3"><MdOutlinePhone />{donorData.donor?.phone ?? 'N/A'}</li>
                                    <li className="flex items-center gap-3"><IoLocationOutline />{donorData.donor?.address ?? 'N/A'}</li>
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
                            <div className="tabs tabs-lift">
                                <label className="tab">
                                    <input type="radio" name="my_tabs_4" defaultChecked />
                                    <MdPerson className="text-lg" />
                                    Beneficiary
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">
                                    <div className="flex sm:flex-row flex-col gap-3 sm:gap-0 font-semibold sm:items-center leading-tight text-primary text-xl sm:justify-between mb-4 md:px-4">
                                        <h2>Beneficiary</h2>
                                        <div className="text-primary md:text-sm text-xs flex sm:items-center gap-5 sm:flex-row flex-col">
                                            Per page {beneficiaries.total}/{beneficiaries.to || beneficiaries.length}
                                            <Link
                                                href={route('users.create')}
                                                className="inline-flex items-center w-max sm:w-auto px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                            >
                                                Add Beneficiary
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
                                                    <th>Program Name</th>
                                                    <th>Phone</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {beneficiaries.data.map((item, index) => (
                                                    <tr className="space-y-3 font-bold" key={item.id}>
                                                        <td className="text-sm">{index + 1}</td>
                                                        <td className="text-sm">{item.beneficiary_name}</td>
                                                        <td className="text-sm">{item.email}</td>
                                                        <td className="text-sm">{item.program?.name ?? "No Program"}</td>
                                                        <td className="text-sm">{item.beneficiary_contact_no ?? "No Program"}</td>

                                                        <td className="text-sm">
                                                            <div className="flex gap-2">
                                                                <Link href={route('beneficiarys-applications.edit', item.id)} className="text-primary text-2xl">
                                                                    <FaEdit />
                                                                </Link>
                                                                <Link href={route('beneficiarys-applications.show', item.id)} className="text-primary text-2xl">
                                                                    <FaEye />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {beneficiaries && beneficiaries.last_page > 1 && (
                                        <div className="join flex justify-center mt-6 w-full">
                                            <Link href={beneficiaries.prev_page_url || "#"} className={`join-item btn ${beneficiaries.prev_page_url ? "" : "btn-disabled"}`}>
                                                «
                                            </Link>
                                            <button className="join-item btn cursor-default bg-primary text-white">
                                                Page {beneficiaries.current_page}
                                            </button>
                                            <Link href={beneficiaries.next_page_url || "#"} className={`join-item btn ${beneficiaries.next_page_url ? "" : "btn-disabled"}`}>
                                                »
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <label className="tab">
                                    <input type="radio" name="my_tabs_4" />
                                    <BiWallet className="text-lg text-primary" />
                                    Payments
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">
                                    <div className="flex sm:flex-row flex-col gap-3 sm:gap-0 font-semibold sm:items-center leading-tight text-primary text-xl sm:justify-between mb-4 md:px-4">
                                        <h2>Payments</h2>
                                        <div className="text-primary md:text-sm text-xs flex sm:items-center gap-5 sm:flex-row flex-col">
                                            Per page {payments.total}/{payments.to || payments.length}
                                            <Link
                                                href={route('payments.create')}
                                                className="inline-flex items-center w-max sm:w-auto px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                            >
                                                Add Payments
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="rounded-xl overflow-x-auto border-2 border-gray-200">
                                        <table className="table table-xs w-full table-main">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Beneficiary Name</th>
                                                    <th>Program Name</th>
                                                    <th>Amount Request</th>
                                                    <th>Amount Paid</th>
                                                    <th>Pennding Paid</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {payments?.data?.map((item, index) => (
                                                    <tr className="space-y-3 font-bold" key={item.id}>
                                                        <td className="text-sm">{index + 1}</td>
                                                        <td className="text-sm">
                                                            {item.beneficiary?.beneficiaries?.length > 0
                                                                ? item.beneficiary.beneficiaries[0].beneficiary_name
                                                                : "N/A"}
                                                        </td>
                                                        <td className="text-sm">{item.program?.name ?? "N/A"}</td>
                                                        <td className="text-sm">{item.amount_requested ?? "No Program"}</td>
                                                        <td className="text-sm">{item.amount_paid ?? "No Program"}</td>
                                                        <td className="text-sm">{item.pending_amount ?? "N/A"}</td>
                                                        <td className="text-sm">
                                                            {
                                                                (() => {
                                                                    const statusMap = {
                                                                        'Waiting': { text: 'Waiting', color: 'bg-yellow-500' },
                                                                        'Approved': { text: 'Approved', color: 'bg-green-500' },
                                                                        'Rejected': { text: 'Rejected', color: 'bg-blue-500' },
                                                                        'Partially Paid': { text: 'Partially Paid', color: 'bg-orange-500' },
                                                                        'Paid': { text: 'Paid', color: 'bg-gray-500' },
                                                                        'Request': { text: 'Request', color: 'bg-red-500' },
                                                                    };

                                                                    const statusObj = statusMap[item.status] || { text: 'Unknown', color: 'bg-gray-500' };

                                                                    return (
                                                                        <span className={`px-2 py-1 rounded-full text-white text-xs ${statusObj.color}`} onClick={() => {
                                                                            openStatusModal(item.id, item.status);
                                                                        }}>
                                                                            {statusObj.text}
                                                                        </span>
                                                                    );
                                                                })()
                                                            }
                                                        </td>
                                                        <td className="text-sm">
                                                            <div className="flex gap-2">
                                                                <Link href={route('payments.edit', item.id)} className="text-primary text-2xl">
                                                                    <FaEdit />
                                                                </Link>
                                                                <Link href={route('payments.show', item.id)} className="text-primary text-2xl">
                                                                    <FaEye />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>

                                    </div>
                                    {payments && payments.last_page > 1 && (
                                        <div className="join flex justify-center mt-6 w-full">
                                            <Link href={payments.prev_page_url || "#"} className={`join-item btn ${payments.prev_page_url ? "" : "btn-disabled"}`}>
                                                «
                                            </Link>
                                            <button className="join-item btn cursor-default bg-primary text-white">
                                                Page {payments.current_page}
                                            </button>
                                            <Link href={payments.next_page_url || "#"} className={`join-item btn ${payments.next_page_url ? "" : "btn-disabled"}`}>
                                                »
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* <label className="tab">
                                    <input type="radio" name="my_tabs_4" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                                    Love
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {isStatusModalOpen && (
                <>
                    <Modal show={isStatusModalOpen} onClose={() => setStatusModalOpen(false)} Title="Change Status">
                        <form onSubmit={submit} className="space-y-6 p-5">
                            <p>Current Status: <strong>{selectedStatus}</strong></p>

                            {paymentStatus.map((status, index) => (
                                <label key={status.id || `status-${index}`} className="flex gap-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        value={status.value}
                                        checked={selectedStatus === status.value}
                                        onChange={() => setSelectedStatus(status.value)}
                                    />
                                    <span className="text-primary">{status.label}</span>
                                </label>
                            ))}
                            <div className="col-span-12">
                                <InputLabel htmlFor="comment" value="Comment" />
                                <TextArea
                                    id="comment"
                                    value={data.comment || ''}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                            </div>

                            <div className="flex justify-between">
                                <button type="button" onClick={closeModals} className="px-4 py-2 bg-primary text-white rounded">Close</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Update Status</button>
                            </div>
                        </form>
                    </Modal>
                </>
            )}
        </AuthenticatedLayout>
    );
}


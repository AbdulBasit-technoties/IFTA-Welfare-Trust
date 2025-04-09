import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { AiOutlineMail } from "react-icons/ai";
import { MdDelete, MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BiWallet } from "react-icons/bi";
import { FaChartLine, FaEdit, FaEye, FaRegUser } from "react-icons/fa";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
import Swal from "sweetalert2";
import SelectComponent from "@/Components/SelectComponent";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useEffect } from "react";
export default function Index({ auth, beneficiaryData, statuses, performance, institute, payments, performanceData, beneficiaries, YearlyAmount, totalAmount, MonthAmount }) {
    const { setData, patch } = useForm({
        status: '',
    });
    const roles = auth.user.roles.map(role => role.name);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isStatusModalOpen, setStatusModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [prevStatus, setPrevStatus] = useState('');
    const [isPerformanceModalOpen, setPerformanceModalOpen] = useState(false);
    const [selectedUid, setSelectedUid] = useState(null);
    const [selectedInstituteId, setSelectedInstituteId] = useState(null);
    const openStatusModal = (id, currentStatus) => {
        setSelectedItemId(id);
        setPrevStatus(currentStatus);
        setSelectedStatus(currentStatus);
        setData('status', currentStatus); // sync with form
        setStatusModalOpen(true);
    };
    const closeModals = () => {
        setStatusModalOpen(false);
        setSelectedItemId(null);
        setSelectedStatus('');
        setPrevStatus('');
        setData({
            status: '',
            comment: '',
        });
    };
    const openPerformanceModal = (uid, instituteId) => {
        setSelectedUid(uid);
        setSelectedInstituteId(instituteId);
        setPerformanceModalOpen(true);
    };
    const submit = (e) => {
        e.preventDefault();
        router.patch(route('beneficiarys-applications.update', selectedItemId), {
            status: selectedStatus,
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
    const submitPerformance = (e) => {
        e.preventDefault();

        post(route('beneficiary-performances.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setPerformanceModalOpen(false);
                reset();
            },
        });
    };

    const { data, setData: performanceSetData, post, errors } = useForm({
        uid: '',
        institute_id: '',
        performance: '',
        comment: '',
        performance_photo: ''
    });
    useEffect(() => {
        performanceSetData('uid', selectedUid);
        performanceSetData('institute_id', selectedInstituteId);
    }, [selectedUid, selectedInstituteId]);
    const [instituteSelect, setInstituteSelect] = useState(false);
    const filteredStatuses = roles.includes("Donor")
        ? statuses.filter(status => ["Approved", "Cancelled"].includes(status.value))
        : statuses;
        const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('beneficiary-performances.destroy', id), {
                    onSuccess: () => Swal.fire('Deleted!', 'Your role has been deleted.', 'success'),
                    onError: () => Swal.fire('Error!', 'There was an issue deleting your role.', 'error'),
                });
            }
        });
    };
    
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Beneficiary" />
            <div className="px-10 py-20">
                <div className="flex justify-between items-center bg-white mb-5 p-5 rounded-md text-lg font-bold">
                    <h3>Beneficiary</h3>
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
                                <h3 className="font-bold text-lg mb-3">Beneficiary Information</h3>
                                <ul className="text-gray-500 space-y-3 pl-1 pb-6">
                                    <li className="flex items-center gap-3"><FaRegUser />{beneficiaryData.beneficiary_name}</li>
                                    <li className="flex items-center gap-3"><AiOutlineMail />{beneficiaryData.email}</li>
                                    <li className="flex items-center gap-3"><MdOutlinePhone />{beneficiaryData.beneficiary_contact_no ?? 'N/A'}</li>
                                    <li className="flex items-center gap-3"><IoLocationOutline />{beneficiaryData.address ?? 'N/A'}</li>
                                </ul>
                            </div>
                            <div className="left-side-item">
                                <h3 className="font-bold text-lg mb-3">Other Information</h3>
                                <ul className="text-gray-500 space-y-3 pl-1">
                                    <li><span className="sm:w-1/2 w-full sm:font-normal font-bold inline-block">Total Paid Amount</span>{totalAmount}</li>
                                    <li><span className="sm:w-1/2 w-full sm:font-normal font-bold inline-block">Total Yearly Amount</span>{YearlyAmount}</li>
                                    <li><span className="sm:w-1/2 w-full sm:font-normal font-bold inline-block">This Month Amount</span>{MonthAmount}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="2xl:col-span-9 xl:col-span-8 col-span-12">
                        <div className="tabs-button bg-white rounded-lg">
                            <div className="tabs tabs-lift">
                                <label className="tab !text-black !bg-transparent">
                                    <input type="radio" name="my_tabs_4" defaultChecked />
                                    <FaRegUser className="text-sm" />
                                    Application
                                </label>
                                <div className="tab-content bg-white border-base-300 p-6">
                                    <div className="flex sm:flex-row flex-col gap-3 sm:gap-0 font-semibold sm:items-center leading-tight text-primary text-xl sm:justify-between mb-4 md:px-4">
                                        <h2>Application</h2>
                                        <div className="text-primary md:text-sm text-xs flex sm:items-center gap-5 sm:flex-row flex-col">
                                            Per page {beneficiaries.total}/{beneficiaries.to || beneficiaries.length}
                                        </div>
                                    </div>
                                    <div className="rounded-xl overflow-x-auto border-2 border-gray-200">
                                        <table className="table table-xs w-full table-main">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Program Name</th>
                                                    <th>Donor Name</th>
                                                    <th>Institute Name</th>
                                                    <th>Status</th>
                                                    <th>Performance</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {beneficiaries.data.map((item, index) => (
                                                    <tr className="space-y-3 font-bold" key={item.id}>
                                                        <td className="text-sm">{index + 1}</td>
                                                        <td className="text-sm">{item.program?.name ?? "No Program"}</td>
                                                        <td className="text-sm">{item.donor.name}</td>
                                                        <td className="text-sm">{item?.institute?.name ?? ""}</td>
                                                        <td className="text-sm">{
                                                            (() => {
                                                                const statusMap = {
                                                                    'Request': { text: 'Request', color: 'bg-yellow-500' },
                                                                    'Approved': { text: 'Approved', color: 'bg-green-500' },
                                                                    'Pending Approval': { text: 'Pending Approval', color: 'bg-blue-500' },
                                                                    'Cancelled': { text: 'Cancelled', color: 'bg-red-500' },
                                                                };

                                                                const statusObj = statusMap[item.status] || { text: 'Unknown', color: 'bg-gray-500' };

                                                                return (
                                                                    <span className={`px-2 py-1 rounded-full text-white text-xs ${statusObj.color}`} onClick={() => {
                                                                        if (!roles.includes('Beneficiary')) {
                                                                            openStatusModal(item.id, item.status);
                                                                        }
                                                                    }}>
                                                                        {statusObj.text}
                                                                    </span>
                                                                );
                                                            })()
                                                        }
                                                        </td>
                                                        {!roles.includes('Beneficiary') && !roles.includes('Donor') &&
                                                            <td className="text-sm">
                                                                {(item?.program?.slug === 'schools' || item?.program?.slug === 'higher-educations') &&
                                                                    <button className="bg-primary px-2 py-1 rounded-full text-white text-xs" onClick={() => openPerformanceModal(item.uid, item.institute_id)}>
                                                                        Performance
                                                                    </button>
                                                                }
                                                            </td>
                                                        }
                                                        <td className="text-sm">
                                                            <div className="flex gap-2 items-center">
                                                                <Link href={route('beneficiarys-applications.show', item.id)} className="text-primary text-2xl">
                                                                    <FaEye />
                                                                </Link>
                                                                <Link
                                                                    href={route('payments.create', { did: item.did, bid: item.uid, pid: item.pid })}
                                                                    className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                                                >
                                                                    Add Payment
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
                                <label className="tab !text-black !bg-transparent">
                                    <input type="radio" name="my_tabs_4" />
                                    <BiWallet className="text-sm text-primary" />
                                    Payments
                                </label>
                                <div className="tab-content bg-white border-base-300 p-6">
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
                                <label className="tab !text-black !bg-transparent">
                                    <input type="radio" name="my_tabs_4" />
                                    <FaChartLine className="text-sm text-primary" />
                                    Performance
                                </label>
                                <div className="tab-content bg-white border-base-300 p-6">
                                    <div className="flex sm:flex-row flex-col gap-3 sm:gap-0 font-semibold sm:items-center leading-tight text-primary text-xl sm:justify-between mb-4 md:px-4">
                                        <h2>Performance</h2>
                                        <div className="text-primary md:text-sm text-xs flex sm:items-center gap-5 sm:flex-row flex-col">
                                            Per page {performanceData.total}/{performanceData.to || performanceData.length}
                                            <button
                                                onClick={() => {
                                                    setInstituteSelect(!instituteSelect);
                                                    openPerformanceModal(beneficiaryData.uid);
                                                }}
                                                className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                            >
                                                Add Performance
                                            </button>
                                        </div>
                                    </div>
                                    <div className="rounded-xl overflow-x-auto border-2 border-gray-200">
                                        <table className="table table-xs w-full table-main">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Beneficiary Name</th>
                                                    <th>Institute Name</th>
                                                    <th>Performance</th>
                                                    <th>Performance Photo</th>
                                                    <th>Comment</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {performanceData?.data?.map((item, index) => (
                                                    <tr className="space-y-3 font-bold" key={item.id}>
                                                        <td className="text-sm">{index + 1}</td>
                                                        <td className="text-sm">{item.user?.name ?? "N/A"}</td>
                                                        <td className="text-sm">{item.institute?.name ?? "N/A"}</td>
                                                        <td className="text-sm">{item.performance ?? "No Program"}</td>
                                                        <td className="text-sm">
                                                            <img src={item.performance_photo} className="w-20 rounded-md object-cover h-12" alt="No Img" />
                                                        </td>
                                                        <td className="text-sm">
                                                            {item.comment
                                                                ? item.comment.split(" ").slice(0, 5).join(" ") + (item.comment.split(" ").length > 20 ? "..." : "")
                                                                : "N/A"}
                                                        </td>
                                                        <td className="text-sm">
                                                            <div className="flex gap-2">
                                                                <Link href={route('beneficiary-performances.edit', item.id)} className="text-primary text-2xl">
                                                                    <FaEdit />
                                                                </Link>
                                                                <Link href={route('beneficiary-performances.show', item.id)} className="text-primary text-2xl">
                                                                    <FaEye />
                                                                </Link>
                                                                <button onClick={() => handleDelete(item.id)} className="text-primary text-2xl">
                                                                    <MdDelete />
                                                                </button>
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
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {isPerformanceModalOpen && (
                <Modal show={isPerformanceModalOpen} onClose={() => setPerformanceModalOpen(false)} Title="Performance Details">
                    <div className="p-5 space-y-4">
                        {/* Performance Details */}
                        <h2 className="font-bold text-gray-800">Enter Beneficiary Performance Details</h2>
                        <form onSubmit={submitPerformance} className="space-y-4">
                            {/* Performance Select Box */}
                            <div>
                                <InputLabel htmlFor="performance" value="Performance" />
                                <SelectComponent
                                    id="performance"
                                    value={data.performance}
                                    onChange={(e) => performanceSetData('performance', e)}
                                    options={performance}
                                    className="mt-1 block w-full text-gray-800"
                                />
                                <InputError className="mt-2" message={errors.performance} />
                            </div>
                            {instituteSelect === true &&
                                <div>
                                    <InputLabel htmlFor="institute_id" value="Institute Name" />
                                    <SelectComponent
                                        id="institute_id"
                                        value={data.institute_id}
                                        onChange={(e) => performanceSetData('institute_id', e)}
                                        options={institute}
                                        className="mt-1 block w-full text-gray-800"
                                    />
                                    <InputError className="mt-2" message={errors.institute_id} />
                                </div>
                            }
                            <div>
                                <InputLabel htmlFor="performance_photo" value="Performance Image" />
                                <TextInput
                                    id="performance_photo"
                                    className="mt-1 block w-full"
                                    value={data.performance_photo || ''}
                                    onChange={(e) => performanceSetData({ ...data, performance_photo: e.target.files[0] })}
                                    required
                                    isFocused
                                    autoComplete="performance_photo"
                                    type="file"
                                />
                                <InputError className="mt-2" message={errors.performance_photo} />
                            </div>

                            {/* Comment Box */}
                            <div>
                                <InputLabel htmlFor="comment" value="Comment" />
                                <TextArea
                                    id="comment"
                                    value={data.comment || ''}
                                    onChange={(e) => performanceSetData('comment', e.target.value)}
                                    className="mt-1 block w-full text-gray-800"
                                />
                                <InputError className="mt-2" message={errors.comment} />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                                <button type="button" onClick={() => setPerformanceModalOpen(false)} className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500">Close</button>
                                <button type="submit" className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
            {isStatusModalOpen && (
                <>
                    <Modal show={isStatusModalOpen} onClose={() => setStatusModalOpen(false)} Title="Change Status">
                        <form onSubmit={submit} className="space-y-6 p-5">
                            <p className="text-gray-800">Current Status: <strong>{selectedStatus}</strong></p>
                            {(
                                auth.user.roles.some(role => role.name === "Donor")
                                    ? statuses.filter(status => ["Approved", "Cancelled"].includes(status.value))
                                    : statuses
                            ).map((status, index) => (
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

                            <div className="flex justify-between">
                                <button type="button" onClick={closeModals} className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500">Close</button>
                                <button type="submit" className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500">Update Status</button>
                            </div>
                        </form>
                    </Modal>
                </>
            )}
        </AuthenticatedLayout>
    );
}


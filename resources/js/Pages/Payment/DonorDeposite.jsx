import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Index({ auth, donorDeposite }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Donor Deposite" />
            <div className="px-10 py-20">
                <div className="flex font-semibold items-center leading-tight text-primary text-xl justify-between mb-4 md:px-4">
                    <h2>Donor Deposite</h2>
                    <div className="text-primary md:text-sm text-xs">
                        Per page {donorDeposite.total}/{donorDeposite.to || donorDeposite.length}
                        <Link
                            href={route('payments.create')}
                            className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                        >
                            Add Donor Deposite
                        </Link>
                    </div>
                </div>
                <div className="rounded-xl overflow-x-auto">
                    <table className="table table-xs w-full table-main">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>#</th>
                                <th>Donor Name</th>
                                <th>Total Paid</th>
                                <th>Payment Slip</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {donorDeposite.data.map((item, index) => (
                                <tr className="space-y-3 font-bold" key={item.id}>
                                    <td className="text-sm">{index + 1}</td>
                                    <td className="text-sm">{item.donor_name}</td>
                                    <td className="text-sm">{item.total_paid}</td>
                                    <td className="text-sm">
                                        {item.payment_slip && (
                                            <img
                                                src={`/storage/${item.payment_slip}`}
                                                alt="Payment Slip"
                                                className="w-20 h-12 object-cover rounded-md"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {donorDeposite && donorDeposite.last_page > 1 && (
                    <div className="join flex justify-center mt-6 w-full">
                        <Link href={donorDeposite.prev_page_url || "#"} className={`join-item btn ${donorDeposite.prev_page_url ? "" : "btn-disabled"}`}>
                            «
                        </Link>
                        <button className="join-item btn cursor-default bg-primary text-white">
                            Page {donorDeposite.current_page}
                        </button>
                        <Link href={donorDeposite.next_page_url || "#"} className={`join-item btn ${donorDeposite.next_page_url ? "" : "btn-disabled"}`}>
                            »
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

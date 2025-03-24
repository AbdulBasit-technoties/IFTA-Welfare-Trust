import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Index({ auth, users }) {

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
                router.delete(route('users.destroy', id), {
                    onSuccess: () => Swal.fire('Deleted!', 'Your donor has been deleted.', 'success'),
                    onError: () => Swal.fire('Error!', 'There was an issue deleting your donor.', 'error'),
                });
            }
        });
    };
    console.log(users)
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="User" />
            <div className="px-10 py-20">
                <div className="flex sm:flex-row flex-col gap-3 sm:gap-0   font-semibold sm:items-center leading-tight text-primary text-xl sm:justify-between mb-4 md:px-4">
                    <h2>User</h2>
                    <div className="text-primary md:text-sm text-xs">
                        Per page {users.total}/{users.to || users.length}
                        <Link
                            href={route('users.create')}
                            className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                        >
                            Add User
                        </Link>
                    </div>
                </div>
                <div className="rounded-xl overflow-x-auto">
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
                            {users.data.map((item, index) => {
                                const roleName = item.roles.length > 0 ? item.roles[0].name : 'No Role';

                                let phone = 'N/A';
                                let address = 'N/A';

                                if (item.donor) {
                                    phone = item.donor.phone;
                                    address = item.donor.address;
                                } else if (item.accountant) {
                                    phone = item.accountant.phone;
                                    address = item.accountant.address;
                                } else if (item.hr) {
                                    phone = item.hr.phone;
                                    address = item.hr.address;
                                } else if (item.beneficiary) {
                                    phone = item.beneficiary.beneficiary_contact_no;
                                    address = item.beneficiary.address;
                                } else if (item.education_officer) {
                                    phone = item.education_officer.phone;
                                    address = item.education_officer.address;
                                } else {
                                    phone = 'N/A';
                                    address = 'N/A';
                                }

                                return (
                                    <tr className="space-y-3 font-bold" key={item.id}>
                                        <td className="text-sm">{index + 1}</td>
                                        <td className="text-sm">{item.name ?? 'N/A'}</td>
                                        <td className="text-sm">{item.email ?? 'N/A'}</td>
                                        <td className="text-sm">{phone}</td>
                                        <td className="text-sm">{address}</td>
                                        <td className="text-sm">{roleName}</td>
                                        <td className="text-sm">
                                            <div className="flex gap-2">
                                                <Link href={route('users.edit', item.id)} className="text-primary text-2xl">
                                                    <FaEdit />
                                                </Link>
                                                <Link href={route('users.show', item.id)} className="text-primary text-2xl">
                                                    <FaEye />
                                                </Link>
                                                <button onClick={() => handleDelete(item.id)} className="text-primary text-2xl">
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>

                </div>
                {users && users.last_page > 1 && (
                    <div className="join flex justify-center mt-6 w-full">
                        <Link href={users.prev_page_url || "#"} className={`join-item btn ${users.prev_page_url ? "" : "btn-disabled"}`}>
                            «
                        </Link>
                        <button className="join-item btn cursor-default bg-primary text-white">
                            Page {users.current_page}
                        </button>
                        <Link href={users.next_page_url || "#"} className={`join-item btn ${users.next_page_url ? "" : "btn-disabled"}`}>
                            »
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

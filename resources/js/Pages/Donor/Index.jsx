import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Index({ auth, donor }) {

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
        router.delete(route('donors.destroy', id), {
          onSuccess: () => Swal.fire('Deleted!', 'Your donor has been deleted.', 'success'),
          onError: () => Swal.fire('Error!', 'There was an issue deleting your donor.', 'error'),
        });
      }
    });
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Donor" />
      <div className="px-10 py-20">
        <div className="flex sm:flex-row flex-col gap-3 sm:gap-0   font-semibold sm:items-center leading-tight text-gray-800 text-xl sm:justify-between mb-4 md:px-4">
          <h2>Donor</h2>
          <div className="text-gray-800 md:text-sm text-xs">
            Per page {donor.total}/{donor.to || donor.length}
            <Link
              href={route('donors.create')}
              className="inline-flex items-center ml-2 px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white uppercase tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
            >
              Add Donor
            </Link>
          </div>
        </div>
        <div className="rounded-xl overflow-x-auto">
          <table className="table table-xs w-full table-main">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {donor.data.map((item, index) => (
                <tr className="space-y-3 font-bold" key={item.id}>
                  <td className="text-sm">{index + 1}</td>
                  <td className="text-sm">{item.donor?.full_name ?? 'N/A'}</td>
                  <td className="text-sm">{item.email}</td>
                  <td className="text-sm">{item.donor?.phone ?? 'N/A'}</td>
                  <td className="text-sm">{item.donor?.address ?? 'N/A'}</td>
                  <td className="text-sm">{item.roles.length > 0 ? item.roles.map(role => role.name).join(', ') : 'No Role'}</td>
                  <td className="text-sm">
                    <div className="flex gap-2">
                      <Link href={route('donors.edit', item.donor?.id)} className="bg-gray-800 p-3 rounded-full text-white">
                        <FaEdit />
                      </Link>
                      <Link href={route('donors.show', item.donor?.id)} className="bg-gray-800 p-3 rounded-full text-white">
                        <FaEye />
                      </Link>
                      <button onClick={() => handleDelete(item.donor?.id)} className="bg-gray-800 p-3 rounded-full text-white">
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {donor && donor.last_page > 1 && (
          <div className="join flex justify-center mt-6 w-full">
            <Link href={donor.prev_page_url || "#"} className={`join-item btn ${donor.prev_page_url ? "" : "btn-disabled"}`}>
              «
            </Link>
            <button className="join-item btn cursor-default bg-gray-800 text-white">
              Page {donor.current_page}
            </button>
            <Link href={donor.next_page_url || "#"} className={`join-item btn ${donor.next_page_url ? "" : "btn-disabled"}`}>
              »
            </Link>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

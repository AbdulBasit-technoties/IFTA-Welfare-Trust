import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Index({ auth, role }) {

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
        router.delete(route('roles.destroy', id), {
          onSuccess: () => Swal.fire('Deleted!', 'Your role has been deleted.', 'success'),
          onError: () => Swal.fire('Error!', 'There was an issue deleting your role.', 'error'),
        });
      }
    });
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Roles" />
      <div className="px-10 py-20">
        <div className="flex font-semibold items-center leading-tight text-gray-800 text-xl justify-between mb-4 md:px-4">
          <h2>Roles</h2>
          <div className="text-gray-800 md:text-sm text-xs">
            Per page {role.total}/{role.to || role.length}
            <Link
              href={route('roles.create')}
              className="inline-flex items-center ml-2 px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white uppercase tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
            >
              Add Role
            </Link>
          </div>
        </div>
        <div className="rounded-xl overflow-x-auto">
          <table className="table table-xs w-full table-main">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {role.data.map((item, index) => (
                <tr className="space-y-3 font-bold" key={item.id}>
                  <td className="text-sm">{index + 1}</td>
                  <td className="text-sm">{item.name}</td>
                  <td className="text-sm">
                    <div className="flex gap-2">
                      <Link href={route('roles.edit', item.id)} className="bg-gray-800 p-3 rounded-full text-white">
                        <FaEdit />
                      </Link>
                      <Link href={route('roles.show', item.id)} className="bg-gray-800 p-3 rounded-full text-white">
                        <FaEye />
                      </Link>
                      <button onClick={() => handleDelete(item.id)} className="bg-gray-800 p-3 rounded-full text-white">
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {role && role.last_page > 1 && (
          <div className="join flex justify-center mt-6 w-full">
            <Link href={role.prev_page_url || "#"} className={`join-item btn ${role.prev_page_url ? "" : "btn-disabled"}`}>
              «
            </Link>
            <button className="join-item btn cursor-default bg-gray-800 text-white">
              Page {role.current_page}
            </button>
            <Link href={role.next_page_url || "#"} className={`join-item btn ${role.next_page_url ? "" : "btn-disabled"}`}>
              »
            </Link>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Index({ auth, programs }) {

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
        router.delete(route('programs.destroy', id), {
          onSuccess: () => Swal.fire('Deleted!', 'Your programs has been deleted.', 'success'),
          onError: () => Swal.fire('Error!', 'There was an issue deleting your programs.', 'error'),
        });
      }
    });
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Program" />
      <div className="px-10 py-20">
        <div className="flex font-semibold items-center leading-tight text-primary text-xl justify-between mb-4 md:px-4">
          <h2>Program</h2>
          <div className="text-primary md:text-sm text-xs">
            Per page {programs.total}/{programs.to || programs.length}
            <Link
              href={route('programs.create')}
              className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white uppercase tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
            >
              Add Program
            </Link>
          </div>
        </div>
        <div className="rounded-xl overflow-x-auto">
          <table className="table table-xs w-full table-main">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {programs.data.map((item, index) => (
                <tr className="space-y-3 font-bold" key={item.id}>
                  <td className="text-sm">{index + 1}</td>
                  <td className="text-sm">{item.name}</td>
                  <td className="text-sm">{item.slug}</td>
                  <td className="text-sm">
                    <div className="flex gap-2">
                      <Link href={route('programs.edit', item.id)} className="text-primary text-2xl">
                        <FaEdit />
                      </Link>
                      <Link href={route('programs.show', item.id)} className="text-primary text-2xl">
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
        {programs && programs.last_page > 1 && (
          <div className="join flex justify-center mt-6 w-full">
            <Link href={programs.prev_page_url || "#"} className={`join-item btn ${programs.prev_page_url ? "" : "btn-disabled"}`}>
              «
            </Link>
            <button className="join-item btn cursor-default bg-primary text-white">
              Page {programs.current_page}
            </button>
            <Link href={programs.next_page_url || "#"} className={`join-item btn ${programs.next_page_url ? "" : "btn-disabled"}`}>
              »
            </Link>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

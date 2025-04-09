import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Index({ auth, performances }) {

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
      <Head title="Performance" />
      <div className="px-10 py-20">
        <div className="flex font-semibold items-center leading-tight text-primary text-xl justify-between mb-4 md:px-4">
          <h2>Performance</h2>
          <div className="text-primary md:text-sm text-xs">
            Per page {performances.total}/{performances.to || performances.length}
            <Link
              href={route('beneficiary-performances.create')}
              className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white uppercase tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
            >
              Add Performance
            </Link>
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
              {performances?.data?.map((item, index) => (
                <tr className="space-y-3 font-bold" key={item.id}>
                  <td className="text-sm">{index + 1}</td>
                  <td className="text-sm">{item.beneficiary?.beneficiary_name ?? "N/A"}</td>
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
        {performances && performances.last_page > 1 && (
          <div className="join flex justify-center mt-6 w-full">
            <Link href={performances.prev_page_url || "#"} className={`join-item btn ${performances.prev_page_url ? "" : "btn-disabled"}`}>
              «
            </Link>
            <button className="join-item btn cursor-default bg-primary text-white">
              Page {performances.current_page}
            </button>
            <Link href={performances.next_page_url || "#"} className={`join-item btn ${performances.next_page_url ? "" : "btn-disabled"}`}>
              »
            </Link>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

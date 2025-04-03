import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import InputError from "@/Components/InputError";
import SelectComponent from "@/Components/SelectComponent";
import { useEffect } from "react";

export default function Index({ auth, beneficiaries, statuses, status, programs, programId, performance }) {
  const { setData, patch } = useForm({
    status: '',
  });
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [prevStatus, setPrevStatus] = useState('');
  const [isPerformanceModalOpen, setPerformanceModalOpen] = useState(false);
  const [selectedUid, setSelectedUid] = useState(null);
  const [selectedInstituteId, setSelectedInstituteId] = useState(null);
  const openPerformanceModal = (uid, instituteId) => {
    setSelectedUid(uid);
    setSelectedInstituteId(instituteId);
    setPerformanceModalOpen(true);
  };

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
  const roles = auth.user.roles.map(role => role.name);
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
        router.delete(route('beneficiarys-applications.destroy', id), {
          onSuccess: () => Swal.fire('Deleted!', 'Your role has been deleted.', 'success'),
          onError: () => Swal.fire('Error!', 'There was an issue deleting your role.', 'error'),
        });
      }
    });
  };
  const [open, setOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    program: false,
    status: false,
  });
  const [selectedFilters, setSelectedFilters] = useState({
    program: [], // ✅ Program IDs yahan store honge
    status: [],  // ✅ Status values yahan store hongi
  });



  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;

    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (checked) {
        updatedFilters[filterType] = [...prevFilters[filterType], String(value)];
      } else {
        updatedFilters[filterType] = prevFilters[filterType].filter((item) => item !== String(value));
      }

      return updatedFilters;
    });
  };

  const applyFilter = () => {
    const queryParams = new URLSearchParams();

    selectedFilters.program.forEach((p) => queryParams.append("program[]", p));
    selectedFilters.status.forEach((s) => queryParams.append("status[]", s));

    router.visit(`/beneficiarys-applications?${queryParams.toString()}`, {
      method: "get",
    });
  };
  const { data, setData: performanceSetData, post, errors } = useForm({
    uid: '',
    institute_id: '',
    performance: '',
    comment: '',
  });


  useEffect(() => {
    performanceSetData('uid', selectedUid);
    performanceSetData('institute_id', selectedInstituteId);
  }, [selectedUid, selectedInstituteId]);

  const submitPerformance = (e) => {
    e.preventDefault();

    post(route('beneficiary-performances.store'), {
      preserveScroll: true,
      onSuccess: () => setPerformanceModalOpen(false),
    });
  };


  const filteredStatuses = roles.includes("Donor")
    ? statuses.filter(status => ["Approved", "Cancelled"].includes(status.value))
    : statuses;

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Beneficiary" />
      <div className="px-10 py-20">
        <div className="flex sm:flex-row flex-col font-semibold sm:items-center leading-tight text-primary sm:text-xl text-lg justify-between flex-wrap 2xl:flex-nowrap">
          <h2 className="lg:w-[30%] md:w-[40%] w-full">Beneficiary Applications</h2>

          <div className="text-primary md:text-sm text-right text-xs lg:w-[70%] md:w-[60%] w-full">
            Per page {beneficiaries.total}/{beneficiaries.to || beneficiaries.length}
            <Link
              href={route('beneficiarys-applications.create')}
              className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
            >
              Add Applications
            </Link>

          </div>
        </div>
        <div className="relative text-end my-2">
          {/* Filter Button */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
          >
            <i className="ti ti-filter-share"></i> Filter
          </button>

          {/* Filter Panel */}
          {open && (
            <div className="absolute right-0 text-start mt-2 w-72 bg-white p-6 rounded-lg shadow-lg z-50">
              <h1 className="text-lg font-semibold mb-4">Filter</h1>

              {/* Program Filter */}
              <fieldset>
                <legend>
                  <button
                    type="button"
                    aria-expanded={expandedCategories.program}
                    onClick={() => toggleCategory("program")}
                    className="filter-controller flex gap-3 my-3 text-sm font-bold items-center"
                  >
                    <HiChevronDown
                      className={`transition-transform ${expandedCategories.program ? "rotate-180" : "rotate-90"
                        }`}
                      size={20}
                    />
                    Program
                  </button>
                </legend>
                {expandedCategories.program && (
                  <div className="filter-category overflow-y-auto h-40 flex flex-col bg-gray-100 py-4 ps-5 rounded-sm">
                    {programs.map((program, index) => (
                      <label key={index} className="text-sm text-gray-600 mb-2">
                        <input
                          type="checkbox"
                          className="mr-2"
                          value={program.value}
                          checked={selectedFilters.program.includes(String(program.value))}

                          onChange={(e) => handleCheckboxChange(e, "program")}
                        />
                        {program.label}
                      </label>
                    ))}


                  </div>
                )}
              </fieldset>

              {/* Status Filter */}
              <fieldset>
                <legend>
                  <button
                    type="button"
                    aria-expanded={expandedCategories.status}
                    onClick={() => toggleCategory("status")}
                    className="filter-controller flex gap-3 my-3 text-sm font-bold items-center"
                  >
                    <HiChevronDown
                      className={`transition-transform ${expandedCategories.status ? "rotate-180" : "rotate-90"}`}
                      size={20}
                    />
                    Status
                  </button>
                </legend>

                {expandedCategories.status && (
                  <div className="filter-category overflow-y-auto h-40 flex flex-col bg-gray-100 py-4 ps-5 rounded-sm">
                    {(
                      auth.user.roles.some(role => role.name === "Donor")
                        ? statuses.filter(status => ["Approved", "Cancelled"].includes(status.value))
                        : statuses
                    ).map((item, index) => (
                      <label key={index} className="text-sm mb-2">
                        <input
                          type="checkbox"
                          className="mr-2"
                          value={item.value}
                          checked={selectedFilters.status.includes(String(item.value))}
                          onChange={(e) => handleCheckboxChange(e, "status")}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                )}
              </fieldset>
              <div className="flex mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={applyFilter}
                  className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                >
                  Filter
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="rounded-xl overflow-x-auto">
          <table className="table table-xs w-full table-main">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Beneficiary’s Name</th>
                <th>Program Name</th>
                <th>Donor Name</th>
                <th>Image</th>
                <th>Status</th>
                {!roles.includes('Beneficiary') && !roles.includes('Donor') && <th>Performance</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {beneficiaries.data.map((item, index) => (
                <tr className="space-y-3 font-bold" key={item.id}>
                  <td className="text-sm">{index + 1}</td>
                  <td className="text-sm">{item.beneficiary_name}</td>
                  <td className="text-sm">{item.program?.name ?? "No Program"}</td>
                  <td className="text-sm">{item.donor?.name ?? "No Program"}</td>
                  <td className="text-sm">
                    {item.photo_attached ? (
                      <img
                        src={`${window.location.origin}/storage/${item.photo_attached}`}
                        alt="Beneficiary Image"
                        className="w-20 h-18 object-cover rounded-lg"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="text-sm">
                    {
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
                    <div className="flex gap-2">
                      <Link href={route('beneficiarys-applications.edit', item.id)} className="text-primary text-2xl">
                        <FaEdit />
                      </Link>
                      <Link href={route('beneficiarys-applications.show', item.id)} className="text-primary text-2xl">
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

      {isPerformanceModalOpen && (
        <Modal show={isPerformanceModalOpen} onClose={() => setPerformanceModalOpen(false)} Title="Performance Details">
          <div className="p-5 space-y-4">
            {/* Performance Details */}
            <h2 className="font-bold text-gray-800">Enter Beneficiary Performance Details</h2>
            <form onSubmit={submitPerformance}>
              {/* Performance Select Box */}
              <div>
                <InputLabel htmlFor="performance" value="Performance" />
                <SelectComponent
                  id="performance"
                  value={data.performance}
                  onChange={(e) => performanceSetData('performance', e)}
                  options={performance}
                  className="mt-1 block w-full"
                />
                <InputError className="mt-2" message={errors.performance} />
              </div>

              {/* Comment Box */}
              <div>
                <InputLabel htmlFor="comment" value="Comment" />
                <TextArea
                  id="comment"
                  value={data.comment || ''}
                  onChange={(e) => performanceSetData('comment', e.target.value)}
                  className="mt-1 block w-full"
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


    </AuthenticatedLayout>
  );
}

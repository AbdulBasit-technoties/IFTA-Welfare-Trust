import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";

export default function Index({ auth, payments, paymentStatus, beneficiaries }) {

  const [open, setOpen] = useState(false); // ✅ Define open state
  const filterRef = useRef(null); // Ref for outside click detection

  // Close filter on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        router.delete(route('payments.destroy', id), {
          onSuccess: () => Swal.fire('Deleted!', 'Your payments has been deleted.', 'success'),
          onError: () => Swal.fire('Error!', 'There was an issue deleting your payments.', 'error'),
        });
      }
    });
  };

  const roles = auth.user.roles.map(role => role.name);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleBeneficiaryChange = (e) => {
    const value = e.target.value;
    setSelectedBeneficiaries((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    router.get(route("payments.index"), {
      status: selectedStatus,
      beneficiaries: selectedBeneficiaries,
    });
    setOpen(false); // ✅ Close filter panel after applying
  };
  const { data, setData, patch } = useForm({
    status: '',
    comment: '',
  });

  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectPaymentSlip, setSelectPaymentSlip] = useState('');
  const [selectDonorId, setSelectDonorId] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [prevStatus, setPrevStatus] = useState('');

  const openStatusModal = (id, currentStatus, paymentSlip, donorId, amountPaid) => {
    setSelectedItemId(id);  // Set selected item ID
    setPrevStatus(currentStatus);  // Set the previous status
    setSelectedStatus(currentStatus);  // Set the selected status
    setSelectPaymentSlip(paymentSlip);  // Set the current payment slip image (if exists)
    setSelectDonorId(donorId);  // Set the donor ID
    setAmountPaid(amountPaid);  // Set the amount paid (new line)
    setStatusModalOpen(true);  // Open the modal
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
      amount_paid: amountPaid,
      did: selectDonorId,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && selectedItemId) {
      // Create a temporary blob URL for immediate preview
      const tempUrl = URL.createObjectURL(file);
      setSelectPaymentSlip(tempUrl);  // Show the image immediately

      const formData = new FormData();
      formData.append('payment_slip', file);
      formData.append('payment_id', selectedItemId);

      router.post(route('paymentimageupload'), formData, {
        forceFormData: true,
        onSuccess: (response) => {
          console.log('Photo updated successfully!');
          // Assuming response contains the storage path to the image
          if (response && response.newPaymentSlip) {
            setSelectPaymentSlip(`/storage/${response.newPaymentSlip}`);  // Update the URL with the correct path
          }
        },
        onError: (errors) => {
          console.error('Error uploading photo:', errors);
          // Revert to previous valid image if error occurs
          setSelectPaymentSlip(null);  // Optional: Reset to previous value or show a fallback
        }
      });
    }
  };
  const filteredStatus = roles.includes('Donor')
    ? paymentStatus.filter(status => status.value === 'Approved' || status.value === 'Rejected')
    : paymentStatus;
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Payment" />
      <div className="px-10 py-20">
        <div className="flex sm:flex-row flex-col gap-3 sm:gap-0   font-semibold sm:items-center leading-tight text-primary text-xl sm:justify-between mb-4 md:px-4">
          <h2>Payment</h2>
          <div className="text-primary md:text-sm text-xs">
            Per page {payments.total}/{payments.to || payments.length}
            <Link
              href={route('payments.create')}
              className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
            >
              Add Payment
            </Link>
          </div>
        </div>
        <div className="relative text-end my-2" ref={filterRef}>
          {/* Filter Button */}
          <button
            onClick={() => setOpen((prev) => !prev)} // ✅ Toggle correctly
            className="inline-flex items-center ml-2 px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
          >
            <i className="ti ti-filter-share"></i> Filter
          </button>

          {/* Filter Panel */}
          {open && (
            <div className="absolute right-0 text-start mt-2 w-72 bg-white p-6 rounded-lg shadow-lg z-50">
              <h1 className="text-lg font-semibold mb-4">Filter</h1>

              {/* Status Filter */}
              <fieldset>
                <legend>
                  <button type="button" className="filter-controller flex gap-3 my-3 text-sm font-bold items-center">
                    Status
                  </button>
                </legend>
                <div className="filter-category overflow-y-auto h-40 flex flex-col bg-gray-100 py-4 ps-5 rounded-sm">
                  {filteredStatus.map((item, index) => (
                    <label key={index} className="text-sm mb-2">
                      <input
                        type="checkbox"
                        className="mr-2"
                        value={item.value}
                        checked={selectedStatus.includes(item.value)}
                        onChange={handleStatusChange}
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              {/* Beneficiary Filter sirf non-Donor users ke liye */}
              {!roles.includes('Donor') && beneficiaries?.length > 0 && (
                <fieldset>
                  <legend>
                    <button type="button" className="filter-controller flex gap-3 my-3 text-sm font-bold items-center">
                      Beneficiary
                    </button>
                  </legend>
                  <div className="filter-category overflow-y-auto h-40 flex flex-col bg-gray-100 py-4 ps-5 rounded-sm">
                    {beneficiaries.map((item, index) => (
                      <label key={index} className="text-sm mb-2">
                        <input
                          type="checkbox"
                          className="mr-2"
                          value={item.value}
                          checked={selectedBeneficiaries.includes(String(item.value))}
                          onChange={handleBeneficiaryChange}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}


              {/* Filter Buttons */}
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
                  Apply Filter
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
                <th>Donor Name</th>
                <th>Beneficiary Name</th>
                <th>Program Name</th>
                <th>Amount Requested</th>
                <th>Amount Paid</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {payments.data.map((item, index) => (
                <tr className="space-y-3 font-bold" key={item.id}>
                  <td className="text-sm">{index + 1}</td>
                  <td className="text-sm">{item.donor ? item.donor.name : 'N/A'}</td>
                  <td className="text-sm">{item.beneficiary ? item.beneficiary.name : 'N/A'}</td>
                  <td className="text-sm">{item.program ? item.program.name : 'N/A'}</td>
                  <td className="text-sm">{item.amount_requested ?? 'N/A'}</td>
                  <td className="text-sm">{item.amount_paid ?? 'Pending'}</td>
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
                            if (!roles.includes('Beneficiary')) {
                              openStatusModal(item.id, item.status, item.payment_slip, item.donor.id, item.amount_paid);
                            }
                          }}>
                            {statusObj.text}
                          </span>
                        );
                      })()
                    }
                  </td>
                  <td className="text-sm">
                    <div className="flex gap-2">
                      {!roles.includes('Donor') &&
                        <Link href={route('payments.edit', item.id)} className="text-primary text-2xl">
                          <FaEdit />
                        </Link>
                      }
                      <Link href={route('payments.show', item.id)} className="text-primary text-2xl">
                        <FaEye />
                      </Link>
                      {!roles.includes('Donor') &&
                        <button onClick={() => handleDelete(item.id)} className="text-primary text-2xl">
                          <MdDelete />
                        </button>
                      }
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
      {isStatusModalOpen && (
        <>
          <Modal show={isStatusModalOpen} onClose={() => setStatusModalOpen(false)} Title="Change Status">
            <form onSubmit={submit} className="space-y-6 p-5">
              <p className="text-gray-800">Current Status: <strong>{selectedStatus}</strong></p>

              {filteredStatus.map((status, index) => (
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
              <div>
                <InputLabel htmlFor="payment_slip" value="Payment Slip" />
                <TextInput
                  id="payment_slip"
                  className="mt-1 block w-full"
                  onChange={handleFileChange}

                  isFocused
                  autoComplete="payment_slip"
                  type="file"
                />
              </div>
              <div>
                <img
                  src={
                    selectPaymentSlip
                      ? selectPaymentSlip.startsWith('blob:')
                        ? selectPaymentSlip
                        : `/storage/${selectPaymentSlip}`
                      : 'default-image.png'
                  }
                  alt="Payment Slip"
                  className="w-1/2 h-1/2 object-cover"
                />


              </div>
              <div className="col-span-12 text-gray-800">
                <InputLabel htmlFor="comment" value="Comment" />
                <TextArea
                  id="comment"
                  value={data.comment || ''}
                  onChange={(e) => setData('comment', e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>

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

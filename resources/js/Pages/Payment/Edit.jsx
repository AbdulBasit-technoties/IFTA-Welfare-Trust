import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectComponent from "@/Components/SelectComponent";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
export default function Index({ auth, donors, beneficiaries, PaymentStatus, beneficiaryProgram, payment }) {

    const { data, setData, patch, errors } = useForm({
        did: payment.did,
        bid: payment.bid,
        pid: payment.pid,
        status: payment.status,
        amount_paid: payment.amount_paid,
        amount_requested: payment.amount_requested,
        payment_slip: payment.payment_slip,
        comment: payment.comment,
    });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route('payments.update', payment.id));
    };

    console.log(payment.payment_slip)
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Payment" />

            <section className="py-24 px-10  grid grid-cols-12 gap-6">
                <form onSubmit={submit} className="mt-6 col-span-9" encType="multipart/form-data">
                    <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                        <div>
                            <h2 className="sm:text-lg text-xs font-medium">Edit Payment</h2>
                            <p className="mt-1 sm:text-sm text-xs">
                                Edit your user here
                            </p>
                        </div>
                    </header>
                    <div className="bg-white rounded-md sm:p-6 p-2 grid grid-cols-12 gap-5 items-center">
                        <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="did" value="Donor" />
                            <SelectComponent
                                id="did"
                                value={data.did}
                                onChange={(e) => setData('did', e)}
                                options={donors}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.did} />
                        </div>

                        {/* Beneficiary Select */}
                        <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="bid" value="Beneficiary" />
                            <SelectComponent
                                id="bid"
                                value={data.bid}
                                onChange={(e) => setData({ ...data, bid: e })}
                                options={beneficiaries}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.bid} />
                        </div>

                        <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="pid" value="Program" />
                            <SelectComponent
                                id="pid"
                                value={data.pid}
                                onChange={(e) => setData({ ...data, pid: e })}
                                options={beneficiaryProgram}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.pid} />
                        </div>


                        <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="status" value="Status" />
                            <SelectComponent
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e)}
                                options={PaymentStatus}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.status} />
                        </div>

                        <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="amount_requested" value="Amount" />
                            <TextInput
                                id="amount_requested"
                                className="mt-1 block w-full"
                                value={data.amount_requested || ''}
                                onChange={(e) => setData('amount_requested', e.target.value)}
                                required
                                isFocused
                                autoComplete="amount_requested"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.amount_requested} />
                        </div>

                        <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="amount_paid" value="Amount Paid" />
                            <TextInput
                                id="amount_paid"
                                className="mt-1 block w-full"
                                value={data.amount_paid || ''}
                                onChange={(e) => setData('amount_paid', e.target.value)}
                                isFocused
                                autoComplete="amount_paid"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.amount_paid} />
                        </div>
                        <div className="col-span-12">
                            <InputLabel htmlFor="comment" value="Comment" />
                            <TextArea
                                id="comment"
                                value={data.comment || ''}
                                onChange={(e) => setData('comment', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.comment} />
                        </div>
                        <div className="flex items-center gap-4 col-span-12">
                            <PrimaryButton>Update Payment</PrimaryButton>
                            <Link
                                href={route('payments.index')}
                                className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
                <form onSubmit={submit} className="mt-6 col-span-3">
                    <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                        <div>
                            <h2 className="sm:text-lg text-xs font-medium">Edit Payment Image</h2>
                            <p className="mt-1 sm:text-sm text-xs">
                                Edit your payment image here
                            </p>
                        </div>
                    </header>
                    <div className="bg-white rounded-md sm:p-6 p-2 gap-5 items-center">
                        <div className="xl:col-span-4 grid grid-cols-1 w-full gap-5 lg:col-span-12 sm:col-span-6 col-span-12">
                            <div>
                                <InputLabel htmlFor="payment_slip" value="Payment Slip" />
                                <TextInput
                                    id="payment_slip"
                                    className="mt-1 block w-full"
                                    value={data.payment_slip || ''}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append("payment_slip", file);
                                            formData.append("payment_id", payment.id);

                                            router.post(route("paymentimageupload"), formData, {
                                                forceFormData: true,
                                                onSuccess: () => {
                                                    console.log("Photo updated successfully!");
                                                },
                                                onError: (errors) => {
                                                    console.error("Error uploading photo:", errors);
                                                }
                                            });
                                        }
                                    }}
                                    isFocused
                                    autoComplete="payment_slip"
                                    type="file"
                                />
                            </div>
                            <div>
                                <img
                                    src={payment.payment_slip ? `/storage/${payment.payment_slip}` : 'default-image.png'}
                                    alt="Payment Slip"
                                    className="w-full h-full object-cover"
                                />

                            </div>

                        </div>
                    </div>
                </form>

            </section>
        </AuthenticatedLayout>
    );
}

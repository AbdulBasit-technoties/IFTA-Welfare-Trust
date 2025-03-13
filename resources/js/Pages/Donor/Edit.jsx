import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectComponent from "@/Components/SelectComponent";
import TextArea from "@/Components/TextArea";
export default function Index({ auth, PaymentMethod, Donationfrequency,donor }) {

    const { data, setData, patch, errors } = useForm({
        full_name: donor.full_name,
        email: donor.email,
        phone: donor.phone,
        donation_amount: donor.donation_amount,
        payment_method: donor.payment_method,
        donation_frequency: donor.donation_frequency,
        address: donor.address,
    });


    const submit = (e) => {
        e.preventDefault();
        patch(route('donors.update',donor.id));
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Donor" />

            <section className="py-24 px-10">
                <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
                    <header className="p-3 flex justify-between items-center bg-gray-800 rounded-tl-2xl rounded-tr-2xl text-white">
                        <div>
                            <h2 className="sm:text-lg text-xs font-medium">Edit Donor</h2>
                            <p className="mt-1 sm:text-sm text-xs">
                                Edit your donor here
                            </p>
                        </div>
                    </header>
                    <div className="bg-white rounded-md sm:p-6 p-2 grid grid-cols-12 gap-5 items-center">
                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="full_name" value="Full Name" />
                            <TextInput
                                id="full_name"
                                className="mt-1 block w-full"
                                value={data.full_name || ''}
                                onChange={(e) => setData('full_name', e.target.value)}
                                required
                                isFocused
                                autoComplete="full_name"
                                type="text"
                            />
                            <InputError className="mt-2" message={errors.full_name} />
                        </div>

                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email || ''}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                isFocused
                                autoComplete="email"
                                type="email"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="phone" value="Phone" />
                            <TextInput
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone || ''}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                isFocused
                                autoComplete="phone"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="donation_amount" value="Donation Amount" />
                            <TextInput
                                id="donation_amount"
                                className="mt-1 block w-full"
                                value={data.donation_amount || ''}
                                onChange={(e) => setData('donation_amount', e.target.value)}
                                required
                                isFocused
                                autoComplete="donation_amount"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.donation_amount} />
                        </div>
                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="payment_method" value="Payment method" />
                            <SelectComponent
                                id="payment_method"
                                value={data.payment_method}
                                onChange={(e) => setData('payment_method', e)}
                                options={PaymentMethod}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.payment_method} />
                        </div>
                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="donation_frequency" value="Donation Frequency" />
                            <SelectComponent
                                id="donation_frequency"
                                value={data.donation_frequency}
                                onChange={(e) => setData('donation_frequency', e)}
                                options={Donationfrequency}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.donation_frequency} />
                        </div>
                        <div className="col-span-12">
                            <InputLabel htmlFor="address" value="Address" />
                            <TextArea
                                id="address"
                                value={data.address || ''}
                                onChange={(e) => setData('address', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.address} />
                        </div>
                        <div className="flex items-center gap-4 col-span-12">
                            <PrimaryButton>Update Donor</PrimaryButton>
                            <Link
                                href={route('donors.index')}
                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}

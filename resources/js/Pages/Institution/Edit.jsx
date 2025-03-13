import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectComponent from "@/Components/SelectComponent";
import TextArea from "@/Components/TextArea";
export default function Index({ auth,institution }) {

    const { data, setData, patch, errors } = useForm({
        name: institution.name,
        email: institution.email,
        contact_no: institution.contact_no,
        address: institution.address,
        url: institution.url,
    });


    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route('institutions.update',institution.id));
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Institution" />

            <section className="py-24 px-10">
                <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
                    <header className="p-3 flex justify-between items-center bg-gray-800 rounded-tl-2xl rounded-tr-2xl text-white">
                        <div>
                            <h2 className="sm:text-lg text-xs font-medium">Edit Institution</h2>
                            <p className="mt-1 sm:text-sm text-xs">
                                Edit your user here
                            </p>
                        </div>
                    </header>
                    <div className="bg-white rounded-md sm:p-6 p-2 grid grid-cols-12 gap-5 items-center">
                        <div className="xl:col-span-6 lg:col-span-4 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name || ''}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                                type="text"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="xl:col-span-6 lg:col-span-4 sm:col-span-6 col-span-12">
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

                        <div className="xl:col-span-6 lg:col-span-4 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="contact_no" value="Contact No" />
                            <TextInput
                                id="contact_no"
                                className="mt-1 block w-full"
                                value={data.contact_no || ''}
                                onChange={(e) => setData('contact_no', e.target.value)}
                                required
                                isFocused
                                autoComplete="contact_no"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.contact_no} />
                        </div>
                        <div className="xl:col-span-6 lg:col-span-4 sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="url" value="Website Url" />
                            <TextInput
                                id="url"
                                className="mt-1 block w-full"
                                value={data.url || ''}
                                onChange={(e) => setData('url', e.target.value)}
                                required
                                isFocused
                                autoComplete="url"
                                type="text"
                            />
                            <InputError className="mt-2" message={errors.url} />
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
                            <PrimaryButton>Update Institution</PrimaryButton>
                            <Link
                                href={route('institutions.index')}
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

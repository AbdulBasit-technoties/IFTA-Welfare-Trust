import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectComponent from "@/Components/SelectComponent";
import TextArea from "@/Components/TextArea";
export default function Index({ auth, beneficiaries, institute, performance, beneficiaryperformance }) {

    const { data, setData, patch, errors } = useForm({
        uid: beneficiaryperformance.uid,
        institute_id: beneficiaryperformance.institute_id,
        performance: beneficiaryperformance.performance,
        comment: beneficiaryperformance.comment
    });


    const handleBeneficiaryChange = (selectedValue) => {
        setData('uid', selectedValue);
        router.get(route("beneficiary-performances.create"),
            { uid: selectedValue },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => console.log("beneficiary changed successfully!"),
                onError: (errors) => console.error("Error:", errors),
            }
        );
    };
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route('beneficiary-performances.update', beneficiaryperformance.id));
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Performance" />

            <section className="py-24 px-10 grid grid-cols-12 gap-5">
                <form onSubmit={submit} className="mt-6 xl:col-span-9 col-span-12" encType="multipart/form-data">
                    <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                        <div>
                            <h2 className="sm:text-lg text-xs font-medium">Edit Performance</h2>
                            <p className="mt-1 sm:text-sm text-xs">
                                edit your performance here
                            </p>
                        </div>
                    </header>
                    <div className="bg-white rounded-md p-sm:6 p-2 grid grid-cols-12 gap-5 items-center">
                        <div className="col-span-12">
                            <InputLabel htmlFor="uid" value="Beneficiary Name" />
                            <SelectComponent
                                id="uid"
                                value={data.uid}
                                onChange={handleBeneficiaryChange}
                                options={beneficiaries}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.uid} />
                        </div>
                        <div className="col-span-12">
                            <InputLabel htmlFor="institute_id" value="Institute Name" />
                            <SelectComponent
                                id="institute_id"
                                value={data.institute_id}
                                onChange={(e) => setData('institute_id', e)}
                                options={institute}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.institute_id} />
                        </div>
                        <div className="col-span-12">
                            <InputLabel htmlFor="performance" value="Performance" />
                            <SelectComponent
                                id="performance"
                                value={data.performance}
                                onChange={(e) => setData('performance', e)}
                                options={performance}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.performance} />
                        </div>
                        {/* Comment Box */}
                        <div className="col-span-12">
                            <InputLabel htmlFor="comment" value="Comment" />
                            <TextArea
                                id="comment"
                                value={data.comment || ''}
                                onChange={(e) => setData('comment', e.target.value)}
                                className="mt-1 block w-full text-gray-800"
                            />
                            <InputError className="mt-2" message={errors.comment} />
                        </div>
                        <div className="flex items-center gap-4 col-span-12">
                            <PrimaryButton>Update Performance</PrimaryButton>
                            <Link
                                href={route('beneficiary-performances.index')}
                                className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
                <div className="xl:col-span-3 col-span-12">
                    <div onSubmit={submit} className={`${data.role === 'Beneficiary' ? 'col-span-9' : 'col-span-12'}  mt-6`}>
                        <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                            <div>
                                <h2 className="sm:text-lg text-xs font-medium">Edit Performance Image</h2>
                                <p className="mt-1 sm:text-sm text-xs">
                                    Edit your performance image here
                                </p>
                            </div>
                        </header>
                        <div className="bg-white rounded-md grid grid-cols-1 gap-5 p-sm:6 p-2">
                            <div className="">
                                <InputLabel htmlFor="performance_photo" value="Photo Attached" />
                                <TextInput
                                    id="performance_photo"
                                    className="mt-1 block w-full"
                                    isFocused
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append("performance_photo", file);
                                            formData.append("performance_id", beneficiaryperformance.id);

                                            router.post(route("performanceimg"), formData, {
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
                                    type="file"
                                />
                            </div>
                            <div className="">
                                <img
                                    src={beneficiaryperformance?.performance_photo ? `${beneficiaryperformance.performance_photo}` : 'default-image.png'}
                                    alt="Beneficiary Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

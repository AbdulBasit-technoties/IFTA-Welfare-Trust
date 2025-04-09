import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import SelectComponent from "@/Components/SelectComponent";
export default function Index({ auth, beneficiary, patientGender, MaritalStatus }) {

    const { data, setData, patch, errors } = useForm({
        beneficiary_name: beneficiary.beneficiary_name,
        guardian_name: beneficiary.guardian_name,
        beneficiary_cnic: beneficiary.beneficiary_cnic,
        guardian_cnic: beneficiary.guardian_cnic,
        address: beneficiary.address,
        beneficiary_contact_no: beneficiary.beneficiary_contact_no,
        guardian_contact_no: beneficiary.guardian_contact_no,
        email: beneficiary.email,
        occupation: beneficiary.occupation,
        household_income: beneficiary.household_income,
        syed: !!beneficiary.syed,
        date_of_birth: beneficiary.date_of_birth,
        orphan: !!beneficiary.orphan,
        family_members: beneficiary.family_members,
        sign: beneficiary.sign,
        marital_status: beneficiary.marital_status,
        gender: beneficiary.gender,
        description: beneficiary.description,
        disability: beneficiary.disability,
    });


    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route('beneficiaries.update',beneficiary.id));
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Beneficiary" />

            <section className="py-24 px-10 grid grid-cols-12 gap-3">
                <form onSubmit={submit} className="mt-6 xl:col-span-9 col-span-12" encType="multipart/form-data">
                    <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                        <div>
                            <h2 className="sm:text-lg text-xs font-medium">Edit Beneficiary</h2>
                            <p className="mt-1 sm:text-sm text-xs">
                                edit your beneficiary here
                            </p>
                        </div>
                    </header>
                    <div className="bg-white rounded-md p-sm:6 p-2 grid grid-cols-12 gap-5 items-center">
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="beneficiary_name" value='Beneficiary Name' />
                            <TextInput
                                id="beneficiary_name"
                                className="mt-1 block w-full"
                                value={data.beneficiary_name || ""}
                                onChange={(e) => setData({ ...data, beneficiary_name: e.target.value })}
                                required
                                isFocused
                                autoComplete="beneficiary_name"
                                type="text"
                            />
                            <InputError className="mt-2" message={errors.beneficiary_name} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="guardian_name" value="Guardian Name" />
                            <TextInput
                                id="guardian_name"
                                className="mt-1 block w-full"
                                value={data.guardian_name || ''}
                                onChange={(e) => setData('guardian_name', e.target.value)}
                                isFocused
                                autoComplete="guardian_name"
                                type="text"
                            />
                            <InputError className="mt-2" message={errors.guardian_name} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email || ""}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                required
                                isFocused
                                autoComplete="email"
                                type="email"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="beneficiary_cnic" value="Beneficiary CNIC" />
                            <TextInput
                                id="beneficiary_cnic"
                                className="mt-1 block w-full"
                                value={data.beneficiary_cnic || ''}
                                onChange={(e) => setData('beneficiary_cnic', e.target.value)}
                                isFocused
                                autoComplete="beneficiary_cnic"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.beneficiary_cnic} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="guardian_cnic" value="Guardian CNIC" />
                            <TextInput
                                id="guardian_cnic"
                                className="mt-1 block w-full"
                                value={data.guardian_cnic || ''}
                                onChange={(e) => setData('guardian_cnic', e.target.value)}
                                isFocused
                                autoComplete="guardian_cnic"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.guardian_cnic} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="guardian_contact_no" value="Guardian Contact No" />
                            <TextInput
                                id="guardian_contact_no"
                                className="mt-1 block w-full"
                                value={data.guardian_contact_no || ''}
                                onChange={(e) => setData('guardian_contact_no', e.target.value)}
                                isFocused
                                autoComplete="guardian_contact_no"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.guardian_contact_no} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="beneficiary_contact_no" value='Beneficiary Contact No' />
                            <TextInput
                                id="beneficiary_contact_no"
                                className="mt-1 block w-full"
                                value={data.beneficiary_contact_no || ""}
                                onChange={(e) => setData({ ...data, beneficiary_contact_no: e.target.value })}
                                isFocused
                                autoComplete="beneficiary_contact_no"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.beneficiary_contact_no} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="occupation" value="Occupation" />
                            <TextInput
                                id="occupation"
                                className="mt-1 block w-full"
                                value={data.occupation || ''}
                                onChange={(e) => setData('occupation', e.target.value)}
                                isFocused
                                autoComplete="occupation"
                                type="text"
                            />
                            <InputError className="mt-2" message={errors.occupation} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                            <TextInput id="date_of_birth" className="mt-1 block w-full" value={data.date_of_birth || ''} onChange={(e) => setData('date_of_birth', e.target.value)} autoComplete="date_of_birth" type="date" />
                            <InputError className="mt-2" message={errors.date_of_birth} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="sign" value="Signature" />
                            <TextInput
                                id="sign"
                                className="mt-1 block w-full"
                                value={data.sign || ''}
                                onChange={(e) => setData('sign', e.target.value)}
                                autoComplete="sign"
                                type="text"
                            />
                            <InputError className="mt-2" message={errors.sign} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="household_income" value="Household Income" />
                            <TextInput
                                id="household_income"
                                className="mt-1 block w-full"
                                value={data.household_income || ''}
                                onChange={(e) => setData('household_income', e.target.value)}
                                autoComplete="household_income"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.household_income} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="family_members" value="Number of Family Members" />
                            <TextInput
                                id="family_members"
                                className="mt-1 block w-full"
                                value={data.family_members || ''}
                                onChange={(e) => setData('family_members', e.target.value)}
                                autoComplete="family_members"
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.family_members} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-3">
                            <InputLabel htmlFor="marital_status" value="Marital Status" />
                            <SelectComponent
                                id="marital_status"
                                value={data.marital_status}
                                onChange={(e) => setData('marital_status', e)}
                                options={MaritalStatus}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.marital_status} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-3">
                            <InputLabel htmlFor="gender" value="Gender" />
                            <SelectComponent
                                id="gender"
                                value={data.gender}
                                onChange={(e) => setData('gender', e)}
                                options={patientGender}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.gender} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-3 flex gap-2 items-center">
                            <InputLabel htmlFor="syed" value="Syed" />

                            <input
                                type="radio"
                                id="syed_yes"
                                name="syed"
                                value="true"
                                checked={data.syed === true}
                                onChange={() => setData('syed', true)}
                            />
                            <InputLabel htmlFor="syed_yes" value="Yes" />

                            <input
                                type="radio"
                                id="syed_no"
                                name="syed"
                                value="false"
                                checked={data.syed === false}
                                onChange={() => setData('syed', false)}
                            />
                            <InputLabel htmlFor="syed_no" value="No" />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-3 flex gap-2 items-center">
                            <InputLabel htmlFor="orphan" value="Orphan" />
                            <input
                                type="radio"
                                id="orphan_yes"
                                name="orphan"
                                value="true"
                                checked={data.orphan === true}
                                onChange={() => setData('orphan', true)}
                            />
                            <InputLabel htmlFor="orphan_yes" value="Yes" />

                            <input
                                type="radio"
                                id="orphan_no"
                                name="orphan"
                                value="false"
                                checked={data.orphan === false}
                                onChange={() => setData('orphan', false)}
                            />
                            <InputLabel htmlFor="orphan_no" value="No" />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="description" value="Description" />
                            <TextArea
                                id="description"
                                value={data.description || ''}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.description} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="disability" value="Disability" />
                            <TextArea
                                id="disability"
                                value={data.disability || ''}
                                onChange={(e) => setData('disability', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.disability} />
                        </div>
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="address" value="Address" />
                            <TextArea
                                id="address"
                                value={data.address || ''}
                                onChange={(e) => setData('address', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.address} />
                        </div>
                        <div className="flex items-center gap-4 col-span-4">
                            <PrimaryButton>Update Beneficiary</PrimaryButton>
                            <Link
                                href={route('beneficiaries.index')}
                                className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
                <div className="xl:col-span-3 col-span-12">
                    <div onSubmit={submit} className="mt-6">
                        <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                            <div>
                                <h2 className="sm:text-lg text-xs font-medium">Edit Beneficiary Image</h2>
                                <p className="mt-1 sm:text-sm text-xs">
                                    edit your beneficiary image here
                                </p>
                            </div>
                        </header>
                        <div className="bg-white rounded-md grid grid-cols-1 gap-5 p-sm:6 p-2">
                            <div className="">
                                <InputLabel htmlFor="photo_attached" value="Photo Attached" />
                                <TextInput
                                    id="photo_attached"
                                    className="mt-1 block w-full"
                                    isFocused
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append("photo_attached", file);
                                            formData.append("beneficiary_id", beneficiary.id);

                                            router.post(route("beneficiaryimageupload"), formData, {
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
                                    src={beneficiary?.photo_attached ? `/storage/${beneficiary.photo_attached}` : 'default-image.png'}
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

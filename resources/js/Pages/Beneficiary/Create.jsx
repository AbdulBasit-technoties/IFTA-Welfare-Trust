import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import SelectComponent from "@/Components/SelectComponent";
export default function Index({ auth ,beneficiaries,patientGender,MaritalStatus}) {

    const { data, setData, post, errors } = useForm({
        beneficiary_name: null,
        guardian_name: null,
        beneficiary_cnic: null,
        guardian_cnic: null,
        address: null,
        beneficiary_contact_no: null,
        guardian_contact_no: null,
        email: null,
        photo_attached: null,
        occupation: null,
        household_income: null,
        syed: null,
        date_of_birth: null,
        orphan: null,
        family_members: null,
        sign: null,
        marital_status: null,
        gender: null,
        description: null,
        disability: null,
        password: null,
        role: "Beneficiary",
        uid: null,
    });


    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('beneficiaries.store'));
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Beneficiary" />

            <section className="py-24 px-10">
                <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
                    <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                        <div>
                            <h2 className="sm:text-lg text-xs font-medium">Add Beneficiary</h2>
                            <p className="mt-1 sm:text-sm text-xs">
                                add your beneficiary here
                            </p>
                        </div>
                    </header>
                    <div className="bg-white rounded-md p-sm:6 p-2 grid grid-cols-12 gap-5 items-center">
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="uid" value="Beneficiary Family" />
                            <SelectComponent
                                id="uid"
                                value={data.uid}
                                options={beneficiaries}
                                onChange={(e) => setData('uid', e)}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.uid} />
                        </div>
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
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                className="mt-1 block w-full"
                                value={data.password || ""}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                required
                                isFocused
                                autoComplete="password"
                                type="password"
                            />
                            <InputError className="mt-2" message={errors.password} />
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
                        <div className="sm:col-span-6 col-span-12 md:col-span-4">
                            <InputLabel htmlFor="photo_attached" value="Photo Attached" />
                            <TextInput
                                id="photo_attached"
                                className="mt-1 block w-full"
                                value={data.photo_attached || ''}
                                onChange={(e) => setData('photo_attached', e.target.files[0])}
                                isFocused
                                autoComplete="photo_attached"
                                type="file"
                            />
                            <InputError className="mt-2" message={errors.occupation} />
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
                        <div className="flex items-center gap-4 sm:col-span-6 col-span-12 md:col-span-4">
                            <PrimaryButton>Add Beneficiary</PrimaryButton>
                            <Link
                                href={route('beneficiaries.index')}
                                className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
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

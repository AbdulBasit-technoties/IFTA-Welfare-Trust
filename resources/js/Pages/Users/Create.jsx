import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectComponent from "@/Components/SelectComponent";
import { useState } from "react";
import TextArea from "@/Components/TextArea";
export default function Index({ auth, roles, MaritalStatus, patientGender, beneficiaries }) {

    const { data, setData, post, errors } = useForm({
        name: null,
        email: null,
        guardian_name: null,
        guardian_contact_no: null,
        guardian_cnic: null,
        beneficiary_cnic: null,
        marital_status: null,
        gender: null,
        occupation: null,
        date_of_birth: null,
        sign: null,
        household_income: null,
        syed: false,
        orphan: false,
        family_members: null,
        photo_attached: null,
        phone: null,
        password: null,
        description: null,
        disability: null,
        address: null,
        role: null,
        uid: null,
    });


    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('users.store'));
    };
    const [selectedRole, setSelectedRole] = useState("");
    const handleRoleChange = (e) => {
        setSelectedRole(e);
        setData({ ...data, role: e });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Roles" />

            <section className="py-24 px-10">
                <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
                    <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                        <div>
                            <h2 className="sm:text-lg text-xs font-medium">Add User</h2>
                            <p className="mt-1 sm:text-sm text-xs">
                                Add your user here
                            </p>
                        </div>
                    </header>
                    <div className="bg-white rounded-md p-sm:6 p-2 grid grid-cols-12 gap-5 items-center">
                        <div className={`${data.role === 'Admin' ? 'col-span-3' : data.role === 'Beneficiary' ? 'col-span-3' : 'col-span-6'}`}>
                            <InputLabel htmlFor="role" value="Role" />
                            <SelectComponent
                                id="role"
                                value={data.role}
                                options={roles}
                                onChange={handleRoleChange}
                                className="mt-1 block w-full"
                            />
                            <InputError className="mt-2" message={errors.role} />
                        </div>
                        <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                        {selectedRole && (
                            <>
                                <div className={`${data.role === 'Admin' ? 'col-span-3' : data.role === 'Beneficiary' ? 'col-span-3' : 'col-span-6'}`}>
                                    <InputLabel htmlFor="name" value={`${data.role === 'Beneficiary' ? 'Beneficiary Name' : 'Name'}`} />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name || ""}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        required
                                        isFocused
                                        autoComplete="name"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Admin' ? 'col-span-3' : data.role === 'Beneficiary' ? 'col-span-3' : 'col-span-6'}`}>
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
                                <div className={`${data.role === 'Admin' ? 'col-span-3' : data.role === 'Beneficiary' ? 'col-span-3' : 'col-span-6'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
                                    <InputLabel htmlFor="guardian_contact_no" value="Guardian Contact No" />
                                    <TextInput
                                        id="guardian_contact_no"
                                        className="mt-1 block w-full"
                                        value={data.guardian_contact_no || ''}
                                        onChange={(e) => setData('guardian_contact_no', e.target.value)}
                                        isFocused
                                        autoComplete="guardian_contact_no"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.guardian_contact_no} />
                                </div>
                                <div className={`${data.role === 'Admin' ? 'hidden' : data.role === 'Beneficiary' ? 'col-span-3' : 'col-span-6'}`}>
                                    <InputLabel htmlFor="phone" value={`${data.role === 'Beneficiary' ? 'Beneficiary Contact No' : 'Phone'}`} />
                                    <TextInput
                                        id="phone"
                                        className="mt-1 block w-full"
                                        value={data.phone || ""}
                                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                                        isFocused
                                        autoComplete="phone"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.phone} />
                                </div>
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
                                    <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                                    <TextInput id="date_of_birth" className="mt-1 block w-full" value={data.date_of_birth || ''} onChange={(e) => setData('date_of_birth', e.target.value)} autoComplete="date_of_birth" type="date" />
                                    <InputError className="mt-2" message={errors.date_of_birth} />
                                </div>
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3 flex gap-3' : 'hidden'}`}>
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

                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3 flex gap-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-3' : 'hidden'}`}>
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

                                <div className={`${data.role === 'Beneficiary' ? 'col-span-4' : 'hidden'}`}>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextArea
                                        id="description"
                                        value={data.description || ''}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>
                                <div className={`${data.role === 'Beneficiary' ? 'col-span-4' : 'hidden'}`}>
                                    <InputLabel htmlFor="disability" value="Disability" />
                                    <TextArea
                                        id="disability"
                                        value={data.disability || ''}
                                        onChange={(e) => setData('disability', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.disability} />
                                </div>
                                <div className={`${data.role === 'Admin' ? 'hidden' : data.role === 'Beneficiary' ? 'col-span-4' : 'col-span-6'}`}>
                                    <InputLabel htmlFor="address" value="Address" />
                                    <TextArea
                                        id="address"
                                        value={data.address || ''}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.address} />
                                </div>

                            </>
                        )}
                        <div className="flex items-center gap-4 col-span-12">
                            <PrimaryButton>Add User</PrimaryButton>
                            <Link
                                href={route('users.index')}
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

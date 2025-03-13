import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import SelectComponent from "@/Components/SelectComponent";
import { useState } from "react";
export default function Index({ auth, beneficiarys_marriage,donors }) {
    const { data, setData, patch, errors } = useForm({
        beneficiary_name: beneficiarys_marriage?.beneficiary_name || "",
        guardian_name: beneficiarys_marriage?.guardian_name || "",
        beneficiary_cnic: beneficiarys_marriage?.beneficiary_cnic || "",
        guardian_cnic: beneficiarys_marriage?.guardian_cnic || "",
        beneficiary_contact_no: beneficiarys_marriage?.beneficiary_contact_no || "",
        guardian_contact_no: beneficiarys_marriage?.guardian_contact_no || "",
        occupation: beneficiarys_marriage?.occupation || "",
        date_of_birth: beneficiarys_marriage?.date_of_birth || "",
        sign: beneficiarys_marriage?.sign || "",
        household_income: beneficiarys_marriage?.household_income || "",
        syed: !!beneficiarys_marriage?.syed,
        orphan: !!beneficiarys_marriage?.orphan,
        family_members: beneficiarys_marriage?.family_members || "",
        address: beneficiarys_marriage?.address || "",
        spouse_education: beneficiarys_marriage?.spouse_education || "",
        spouse_age: beneficiarys_marriage?.spouse_age || "",
        no_of_guest_invited: beneficiarys_marriage?.no_of_guest_invited || "",
        place_of_marriage: beneficiarys_marriage?.place_of_marriage || "",
        date_of_marriage: beneficiarys_marriage?.date_of_marriage || "",
        reference_name: beneficiarys_marriage?.reference_name || "",
        reference_contact: beneficiarys_marriage?.reference_contact || "",
        reference_relation: beneficiarys_marriage?.reference_relation || "",
        approved: !!beneficiarys_marriage?.approved,
        approver_sign: beneficiarys_marriage?.approver_sign || "",
        did: beneficiarys_marriage?.did || "",
        approval_date: beneficiarys_marriage?.approval_date || "",
        beneficiary_cnic_submitted: !!beneficiarys_marriage?.beneficiary_cnic_submitted,
        marriage_invitation: !!beneficiarys_marriage?.marriage_invitation,
    });



    const submit = (e) => {
        e.preventDefault();
        patch(route('beneficiarys-marriages.update',beneficiarys_marriage.id), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    const [step, setStep] = useState(1);
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Beneficiary" />

            <section className="py-24 px-10">
                <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
                    <div className="p-3 flex sm:flex-row flex-col sm:justify-between text-center sm:text-start items-center bg-gray-800 rounded-tl-2xl rounded-tr-2xl text-white">
                        <ul className="steps w-full">
                            <li className={`step ${step >= 1 ? "step-neutral" : ""}`}></li>
                            <li className={`step ${step >= 2 ? "step-neutral" : ""}`}></li>
                            <li className={`step ${step >= 3 ? "step-neutral" : ""}`}></li>
                            <li className={`step ${step >= 4 ? "step-neutral" : ""}`}></li>
                        </ul>
                    </div>
                    {step === 1 && (
                        <div id="FirstForm" className={step === 1 ? "" : "hidden"}>
                            <header className="text-center p-2 bg-gray-800  text-white">
                                <div className="text-center">
                                    <h2 className="sm:text-lg text-[9px] sm:font-medium">MARRIAGE SUPPORT PROGRAM – BENEFICIARY REGISTRATION FORM</h2>
                                    <p className="mt-1 sm:text-sm text-[9px] pb-3 sm:pb-0">
                                        BENEFICIARY’S DETAILS
                                    </p>
                                </div>
                            </header>
                            <div className="bg-white rounded-md sm:p-6 p-3 grid grid-cols-12 gap-5 items-center">

                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="beneficiary_name" value="Beneficiary Name" />
                                    <TextInput
                                        id="beneficiary_name"
                                        className="mt-1 block w-full"
                                        value={data.beneficiary_name || ''}
                                        onChange={(e) => setData('beneficiary_name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="beneficiary_name"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.beneficiary_name} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="guardian_name" value="Guardian Name" />
                                    <TextInput
                                        id="guardian_name"
                                        className="mt-1 block w-full"
                                        value={data.guardian_name || ''}
                                        onChange={(e) => setData('guardian_name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="guardian_name"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.guardian_name} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="beneficiary_cnic" value="Beneficiary CNIC" />
                                    <TextInput
                                        id="beneficiary_cnic"
                                        className="mt-1 block w-full"
                                        value={data.beneficiary_cnic || ''}
                                        onChange={(e) => setData('beneficiary_cnic', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="beneficiary_cnic"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.beneficiary_cnic} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="guardian_cnic" value="Guardian CNIC" />
                                    <TextInput
                                        id="guardian_cnic"
                                        className="mt-1 block w-full"
                                        value={data.guardian_cnic || ''}
                                        onChange={(e) => setData('guardian_cnic', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="guardian_cnic"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.guardian_cnic} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="beneficiary_contact_no" value="Beneficiary Contact No" />
                                    <TextInput
                                        id="beneficiary_contact_no"
                                        className="mt-1 block w-full"
                                        value={data.beneficiary_contact_no || ''}
                                        onChange={(e) => setData('beneficiary_contact_no', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="beneficiary_contact_no"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.beneficiary_contact_no} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="guardian_contact_no" value="Guardian Contact No" />
                                    <TextInput
                                        id="guardian_contact_no"
                                        className="mt-1 block w-full"
                                        value={data.guardian_contact_no || ''}
                                        onChange={(e) => setData('guardian_contact_no', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="guardian_contact_no"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.guardian_contact_no} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="occupation" value="Occupation" />
                                    <TextInput
                                        id="occupation"
                                        className="mt-1 block w-full"
                                        value={data.occupation || ''}
                                        onChange={(e) => setData('occupation', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="occupation"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.occupation} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                                    <TextInput id="date_of_birth" className="mt-1 block w-full" value={data.date_of_birth || ''} onChange={(e) => setData('date_of_birth', e.target.value)} required autoComplete="date_of_birth" type="date" />
                                    <InputError className="mt-2" message={errors.date_of_birth} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="sign" value="Signature" />
                                    <TextInput
                                        id="sign"
                                        className="mt-1 block w-full"
                                        value={data.sign || ''}
                                        onChange={(e) => setData('sign', e.target.value)}
                                        required
                                        autoComplete="sign"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.sign} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="household_income" value="Household Income" />
                                    <TextInput
                                        id="household_income"
                                        className="mt-1 block w-full"
                                        value={data.household_income || ''}
                                        onChange={(e) => setData('household_income', e.target.value)}
                                        required
                                        autoComplete="household_income"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.household_income} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="family_members" value="Number of Family Members" />
                                    <TextInput
                                        id="family_members"
                                        className="mt-1 block w-full"
                                        value={data.family_members || ''}
                                        onChange={(e) => setData('family_members', e.target.value)}
                                        required
                                        autoComplete="family_members"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.family_members} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
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

                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
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
                                <div className="flex items-center col-span-12 gap-2 sm:gap-4">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
                                        onClick={() => setStep(2)}
                                    >
                                        Next
                                    </button>
                                    <Link
                                        href={route('beneficiarys-marriages.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div id="SecondForm" className={step === 2 ? "" : "hidden"}>
                            <header className="text-center p-2 bg-gray-800  text-white">
                                <div>
                                    <h2 className="sm:text-lg text-[9px] sm:font-medium">SCHOOL FEES SUPPORT PROGRAM – BENEFICIARY REGISTRATION FORM</h2>
                                    <p className="mt-1 sm:text-sm text-[9px] pb-3 sm:pb-0">
                                        EDUCATIONAL DETAILS
                                    </p>
                                </div>
                            </header>
                            <div className="bg-white rounded-md sm:p-6 p-3 grid grid-cols-12 gap-5 items-center">
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="spouse_education" value="Spouse Education" />
                                    <TextInput
                                        id="spouse_education"
                                        className="mt-1 block w-full"
                                        value={data.spouse_education || ''}
                                        onChange={(e) => setData('spouse_education', e.target.value)}
                                        required
                                        autoComplete="spouse_education"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.spouse_education} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="spouse_age" value="Spouse Age" />
                                    <TextInput
                                        id="spouse_age"
                                        className="mt-1 block w-full"
                                        value={data.spouse_age || ''}
                                        onChange={(e) => setData('spouse_age', e.target.value)}
                                        required
                                        autoComplete="spouse_age"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.spouse_age} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="no_of_guest_invited" value="No Of Guest Invited" />
                                    <TextInput
                                        id="no_of_guest_invited"
                                        className="mt-1 block w-full"
                                        value={data.no_of_guest_invited || ''}
                                        onChange={(e) => setData('no_of_guest_invited', e.target.value)}
                                        required
                                        autoComplete="no_of_guest_invited"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.no_of_guest_invited} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="place_of_marriage" value="Place Of Marriage" />
                                    <TextInput
                                        id="place_of_marriage"
                                        className="mt-1 block w-full"
                                        value={data.place_of_marriage || ''}
                                        onChange={(e) => setData('place_of_marriage', e.target.value)}
                                        required
                                        autoComplete="place_of_marriage"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.place_of_marriage} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="date_of_marriage" value="Date Of Marriage" />
                                    <TextInput
                                        id="date_of_marriage"
                                        className="mt-1 block w-full"
                                        value={data.date_of_marriage || ''}
                                        onChange={(e) => setData('date_of_marriage', e.target.value)}
                                        required
                                        autoComplete="date_of_marriage"
                                        type="date"
                                    />
                                    <InputError className="mt-2" message={errors.date_of_marriage} />
                                </div>
                                <div className="flex items-center col-span-12 gap-2 sm:gap-4">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
                                        onClick={() => setStep(3)}
                                    >
                                        Next
                                    </button>
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
                                            onClick={() => setStep((prev) => prev - 1)}
                                        >
                                            Back
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div id="ThirdForm" className={step === 3 ? "" : "hidden"}>
                            <header className="p-3 flex sm:flex-row flex-col sm:justify-between text-center sm:text-start items-center bg-gray-800 text-white">
                                <div>
                                    <h2 className="sm:text-lg text-xs font-medium">REFERENCE</h2>
                                    <p className="mt-1 sm:text-sm text-xs pb-3 sm:pb-0">
                                        REFERENCE DETAILS
                                    </p>
                                </div>
                            </header>

                            <div className="bg-white rounded-md sm:p-6 p-3 grid grid-cols-12 gap-5 items-center">
                                <div className="lg:col-span-4 col-span-12">
                                    <InputLabel htmlFor="reference_name" value="Reference Name" />
                                    <TextInput
                                        id="reference_name"
                                        className="mt-1 block w-full"
                                        value={data.reference_name || ''}
                                        onChange={(e) => setData('reference_name', e.target.value)}
                                        required
                                        autoComplete="reference_name"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.reference_name} />
                                </div>
                                <div className="lg:col-span-4 col-span-12">
                                    <InputLabel htmlFor="reference_contact" value="Reference Contact No" />
                                    <TextInput
                                        id="reference_contact"
                                        className="mt-1 block w-full"
                                        value={data.reference_contact || ''}
                                        onChange={(e) => setData('reference_contact', e.target.value)}
                                        required
                                        autoComplete="reference_contact"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.reference_contact} />
                                </div>
                                <div className="lg:col-span-4 col-span-12">
                                    <InputLabel htmlFor="reference_relation" value="Reference Relation" />
                                    <TextInput
                                        id="reference_relation"
                                        className="mt-1 block w-full"
                                        value={data.reference_relation || ''}
                                        onChange={(e) => setData('reference_relation', e.target.value)}
                                        required
                                        autoComplete="reference_relation"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.reference_relation} />
                                </div>
                                <div className="flex items-center col-span-12 gap-2 sm:gap-4">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
                                        onClick={() => setStep(4)}
                                    >
                                        Next
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
                                        onClick={() => setStep(2)}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {step === 4 && (
                        <div id="FourthForm" className={step === 4 ? "" : "hidden"}>
                            <header className="p-3 flex sm:flex-row flex-col sm:justify-between text-center sm:text-start items-center bg-gray-800 text-white">
                                <div>
                                    <h2 className="sm:text-lg text-xs font-medium">OFFICE USE ONLY</h2>
                                    <p className="mt-1 sm:text-sm text-xs pb-3 sm:pb-0">
                                        REFERENCE DETAILS
                                    </p>
                                </div>
                            </header>

                            <div className="bg-white rounded-md sm:p-6 p-3 grid grid-cols-12 gap-5 items-center">
                                <div className="lg:col-span-4 col-span-12">
                                    <InputLabel htmlFor="approver_sign" value="Approver Sign" />
                                    <TextInput
                                        id="approver_sign"
                                        className="mt-1 block w-full"
                                        value={data.approver_sign || ''}
                                        onChange={(e) => setData('approver_sign', e.target.value)}
                                        required
                                        autoComplete="approver_sign"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.approver_sign} />
                                </div>
                                <div className="lg:col-span-4 col-span-12">
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
                                <div className="lg:col-span-4 col-span-12">
                                    <InputLabel htmlFor="approval_date" value="Approval Date" />
                                    <TextInput
                                        id="approval_date"
                                        className="mt-1 block w-full"
                                        value={data.approval_date || ''}
                                        onChange={(e) => setData('approval_date', e.target.value)}
                                        required
                                        autoComplete="approval_date"
                                        type="date"
                                    />
                                    <InputError className="mt-2" message={errors.approval_date} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
                                    <InputLabel htmlFor="approved" value="Approved" />
                                    <input
                                        type="radio"
                                        id="approved_yes"
                                        name="approved"
                                        value="true"
                                        checked={data.approved === true}
                                        onChange={() => setData('approved', true)}
                                    />
                                    <InputLabel htmlFor="approved_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="approved_no"
                                        name="approved"
                                        value="false"
                                        checked={data.approved === false}
                                        onChange={() => setData('approved', false)}
                                    />
                                    <InputLabel htmlFor="approved_no" value="No" />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
                                    <InputLabel htmlFor="beneficiary_cnic_submitted" value="Beneficiary Cnic Submitted" />
                                    <input
                                        type="radio"
                                        id="beneficiary_cnic_submitted_yes"
                                        name="beneficiary_cnic_submitted"
                                        value="true"
                                        checked={data.beneficiary_cnic_submitted === true}
                                        onChange={() => setData('beneficiary_cnic_submitted', true)}
                                    />
                                    <InputLabel htmlFor="beneficiary_cnic_submitted_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="beneficiary_cnic_submitted_no"
                                        name="beneficiary_cnic_submitted"
                                        value="false"
                                        checked={data.beneficiary_cnic_submitted === false}
                                        onChange={() => setData('beneficiary_cnic_submitted', false)}
                                    />
                                    <InputLabel htmlFor="beneficiary_cnic_submitted_no" value="No" />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
                                    <InputLabel htmlFor="marriage_invitation" value="Marriage Invitation" />
                                    <input
                                        type="radio"
                                        id="marriage_invitation_yes"
                                        name="marriage_invitation"
                                        value="true"
                                        checked={data.marriage_invitation === true}
                                        onChange={() => setData('marriage_invitation', true)}
                                    />
                                    <InputLabel htmlFor="marriage_invitation_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="marriage_invitation_no"
                                        name="marriage_invitation"
                                        value="false"
                                        checked={data.marriage_invitation === false}
                                        onChange={() => setData('marriage_invitation', false)}
                                    />
                                    <InputLabel htmlFor="marriage_invitation_no" value="No" />
                                </div>
                                <div className="flex items-center col-span-12 gap-2 sm:gap-4">
                                    <PrimaryButton>Update Beneficiary</PrimaryButton>
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
                                        onClick={() => setStep(3)}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </form>
            </section>
        </AuthenticatedLayout>
    );
}

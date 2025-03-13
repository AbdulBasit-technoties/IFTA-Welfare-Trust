import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import SelectComponent from "@/Components/SelectComponent";
import { useState } from "react";
export default function Index({ auth, level, beneficiarys_school,donors,institutions }) {
    const { data, setData, patch, errors } = useForm({
        beneficiary_name: beneficiarys_school?.beneficiary_name || "",
        guardian_name: beneficiarys_school?.guardian_name || "",
        email: beneficiarys_school?.email || "",
        beneficiary_cnic: beneficiarys_school?.beneficiary_cnic || "",
        guardian_cnic: beneficiarys_school?.guardian_cnic || "",
        beneficiary_contact_no: beneficiarys_school?.beneficiary_contact_no || "",
        guardian_contact_no: beneficiarys_school?.guardian_contact_no || "",
        occupation: beneficiarys_school?.occupation || "",
        date_of_birth: beneficiarys_school?.date_of_birth || "",
        sign: beneficiarys_school?.sign || "",
        household_income: beneficiarys_school?.household_income || "",
        syed: beneficiarys_school?.syed === 1 ? true : false,
        orphan: beneficiarys_school?.orphan === 1 ? true : false,
        family_members: beneficiarys_school?.family_members || "",
        address: beneficiarys_school?.address || "",
        institute_id: beneficiarys_school?.institute_id || "",
        class: beneficiarys_school?.class || "",
        last_result: beneficiarys_school?.last_result || "",
        total_fee: beneficiarys_school?.total_fee || "",
        approved_amount: beneficiarys_school?.approved_amount || "",
        institute_ntn: beneficiarys_school?.institute_ntn || "",
        education_level: beneficiarys_school?.education_level || "",
        reference_name: beneficiarys_school?.reference_name || "",
        reference_contact: beneficiarys_school?.reference_contact || "",
        reference_relation: beneficiarys_school?.reference_relation || "",
        approved: beneficiarys_school?.approved === 1 ? true : false,
        approver_sign: beneficiarys_school?.approver_sign || "",
        did: beneficiarys_school?.did || "",
        approval_date: beneficiarys_school?.approval_date || "",
        approval_letter: !!beneficiarys_school?.approval_letter,
        application: !!beneficiarys_school?.application,
        fee_voucher: !!beneficiarys_school?.fee_voucher,
        bonafide_certificate: !!beneficiarys_school?.bonafide_certificate,
        beneficiary_cnic_submitted: !!beneficiarys_school?.beneficiary_cnic_submitted,
        guardian_cnic_submitted: !!beneficiarys_school?.guardian_cnic_submitted,
        paid_fee_voucher: !!beneficiarys_school?.paid_fee_voucher,
        institute_ntn_submitted: !!beneficiarys_school?.institute_ntn_submitted,
    });



    const submit = (e) => {
        e.preventDefault();
        patch(route('beneficiarys-schools.update', beneficiarys_school.id), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    const handleInstituteChange = (e) => {
        const selectedId = e;
        const selectedInstitute = institutions.find(inst => inst.value == selectedId);

        setData({
            ...data,
            institute_id: selectedId,
            institute_ntn: selectedInstitute?.contact_no || '' // Auto-fill NTN
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
                                    <h2 className="sm:text-lg text-[9px] sm:font-medium">SCHOOL FEES SUPPORT PROGRAM – BENEFICIARY REGISTRATION FORM</h2>
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
                                <div className="xl:col-span-3 md:col-span-12 lg:col-span-4 sm:col-span-6 col-span-12">
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
                                        href={route('beneficiarys-schools.index')}
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
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="institute_id" value="Institute Name" />
                                    <SelectComponent
                                        id="institute_id"
                                        value={data.institute_id}
                                        onChange={handleInstituteChange}
                                        options={institutions}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.institute_id} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="class" value="Class" />
                                    <TextInput
                                        id="class"
                                        className="mt-1 block w-full"
                                        value={data.class || ''}
                                        onChange={(e) => setData('class', e.target.value)}
                                        required
                                        autoComplete="class"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.class} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="last_result" value="Last Result" />
                                    <TextInput
                                        id="last_result"
                                        className="mt-1 block w-full"
                                        value={data.last_result || ''}
                                        onChange={(e) => setData('last_result', e.target.value)}
                                        required
                                        autoComplete="last_result"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.last_result} />
                                </div>
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="total_fee" value="Total Fee" />
                                    <TextInput
                                        id="total_fee"
                                        className="mt-1 block w-full"
                                        value={data.total_fee || ''}
                                        onChange={(e) => setData('total_fee', e.target.value)}
                                        required
                                        autoComplete="total_fee"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.total_fee} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="approved_amount" value="Approved Amount" />
                                    <TextInput
                                        id="approved_amount"
                                        className="mt-1 block w-full"
                                        value={data.approved_amount || ''}
                                        onChange={(e) => setData('approved_amount', e.target.value)}
                                        required
                                        autoComplete="approved_amount"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.approved_amount} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="institute_ntn" value="Institute NTN" />
                                    <TextInput
                                        id="institute_ntn"
                                        className="mt-1 block w-full"
                                        value={data.institute_ntn || ''}
                                        onChange={(e) => setData('institute_ntn', e.target.value)}
                                        required
                                        autoComplete="institute_ntn"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.institute_ntn} />
                                </div>
                                <div className="xl:col-span-4 sm:col-span-12 col-span-12">
                                    <InputLabel htmlFor="education_level" value="Education Level" />
                                    <SelectComponent
                                        id="education_level"
                                        value={data.education_level}
                                        onChange={(e) => setData('education_level', e)}
                                        options={level}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.education_level} />
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
                                    <InputLabel htmlFor="approval_letter" value="Approval Letter" />
                                    <input
                                        type="radio"
                                        id="approval_letter_yes"
                                        name="approval_letter"
                                        value="true"
                                        checked={data.approval_letter === true}
                                        onChange={() => setData('approval_letter', true)}
                                    />
                                    <InputLabel htmlFor="approval_letter_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="approval_letter_no"
                                        name="approval_letter"
                                        value="false"
                                        checked={data.approval_letter === false}
                                        onChange={() => setData('approval_letter', false)}
                                    />
                                    <InputLabel htmlFor="approval_letter_no" value="No" />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
                                    <InputLabel htmlFor="application" value="Application" />
                                    <input
                                        type="radio"
                                        id="application_yes"
                                        name="application"
                                        value="true"
                                        checked={data.application === true}
                                        onChange={() => setData('application', true)}
                                    />
                                    <InputLabel htmlFor="application_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="application_no"
                                        name="application"
                                        value="false"
                                        checked={data.application === false}
                                        onChange={() => setData('application', false)}
                                    />
                                    <InputLabel htmlFor="application_no" value="No" />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
                                    <InputLabel htmlFor="fee_voucher" value="Fee Voucher" />
                                    <input
                                        type="radio"
                                        id="fee_voucher_yes"
                                        name="fee_voucher"
                                        value="true"
                                        checked={data.fee_voucher === true}
                                        onChange={() => setData('fee_voucher', true)}
                                    />
                                    <InputLabel htmlFor="fee_voucher_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="fee_voucher_no"
                                        name="fee_voucher"
                                        value="false"
                                        checked={data.fee_voucher === false}
                                        onChange={() => setData('fee_voucher', false)}
                                    />
                                    <InputLabel htmlFor="fee_voucher_no" value="No" />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
                                    <InputLabel htmlFor="bonafide_certificate" value="Bonafide Certificate" />
                                    <input
                                        type="radio"
                                        id="bonafide_certificate_yes"
                                        name="bonafide_certificate"
                                        value="true"
                                        checked={data.bonafide_certificate === true}
                                        onChange={() => setData('bonafide_certificate', true)}
                                    />
                                    <InputLabel htmlFor="bonafide_certificate_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="bonafide_certificate_no"
                                        name="bonafide_certificate"
                                        value="false"
                                        checked={data.bonafide_certificate === false}
                                        onChange={() => setData('bonafide_certificate', false)}
                                    />
                                    <InputLabel htmlFor="bonafide_certificate_no" value="No" />
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
                                    <InputLabel htmlFor="guardian_cnic_submitted" value="Guardian Cnic Submitted" />
                                    <input
                                        type="radio"
                                        id="guardian_cnic_submitted_yes"
                                        name="guardian_cnic_submitted"
                                        value="true"
                                        checked={data.guardian_cnic_submitted === true}
                                        onChange={() => setData('guardian_cnic_submitted', true)}
                                    />
                                    <InputLabel htmlFor="guardian_cnic_submitted_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="guardian_cnic_submitted_no"
                                        name="guardian_cnic_submitted"
                                        value="false"
                                        checked={data.guardian_cnic_submitted === false}
                                        onChange={() => setData('guardian_cnic_submitted', false)}
                                    />
                                    <InputLabel htmlFor="guardian_cnic_submitted_no" value="No" />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
                                    <InputLabel htmlFor="paid_fee_voucher" value="Paid Fee Voucher" />
                                    <input
                                        type="radio"
                                        id="paid_fee_voucher_yes"
                                        name="paid_fee_voucher"
                                        value="true"
                                        checked={data.paid_fee_voucher === true}
                                        onChange={() => setData('paid_fee_voucher', true)}
                                    />
                                    <InputLabel htmlFor="paid_fee_voucher_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="paid_fee_voucher_no"
                                        name="paid_fee_voucher"
                                        value="false"
                                        checked={data.paid_fee_voucher === false}
                                        onChange={() => setData('paid_fee_voucher', false)}
                                    />
                                    <InputLabel htmlFor="paid_fee_voucher_no" value="No" />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
                                    <InputLabel htmlFor="institute_ntn_submitted" value="Institute Ntn Submitted" />
                                    <input
                                        type="radio"
                                        id="institute_ntn_submitted_yes"
                                        name="institute_ntn_submitted"
                                        value="true"
                                        checked={data.institute_ntn_submitted === true}
                                        onChange={() => setData('institute_ntn_submitted', true)}
                                    />
                                    <InputLabel htmlFor="institute_ntn_submitted_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="institute_ntn_submitted_no"
                                        name="institute_ntn_submitted"
                                        value="false"
                                        checked={data.institute_ntn_submitted === false}
                                        onChange={() => setData('institute_ntn_submitted', false)}
                                    />
                                    <InputLabel htmlFor="institute_ntn_submitted_no" value="No" />
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

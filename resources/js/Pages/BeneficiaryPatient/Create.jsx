import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import SelectComponent from "@/Components/SelectComponent";
import { useEffect, useState } from "react";
export default function Index({ auth, MaritalStatus, patientGender, type, beneficiaries, beneficiaryData, donors }) {
    const { data, setData, post, errors } = useForm({
        beneficiary_name: "",
        guardian_name: "",
        beneficiary_cnic: "",
        guardian_cnic: "",
        beneficiary_contact_no: "",
        guardian_contact_no: "",
        occupation: "",
        date_of_birth: null,
        gender: "",
        marital_status: "",
        sign: "",
        household_income: 0,
        syed: false,
        orphan: false,
        family_members: 1,
        address: "",
        hospital_name: "",
        dr_name: "",
        diseases_injury: "",
        total_fee: 0,
        last_checkup_date: null,
        reference_name: "",
        reference_contact: "",
        reference_relation: "",
        approved: false,
        approver_sign: "",
        did: "",
        approval_date: null,
        application: false,
        beneficiary_cnic_submitted: false,
        prescription: false,
        uid: "",
        patient_type: "",
        type: "Patient Welfare",
    });

    useEffect(() => {
        if (beneficiaryData) {
            setData({
                beneficiary_name: beneficiaryData.beneficiary_name || "",
                guardian_name: beneficiaryData.guardian_name || "",
                beneficiary_cnic: beneficiaryData.beneficiary_cnic || "",
                guardian_cnic: beneficiaryData.guardian_cnic || "",
                beneficiary_contact_no: beneficiaryData.beneficiary_contact_no || "",
                guardian_contact_no: beneficiaryData.guardian_contact_no || "",
                occupation: beneficiaryData.occupation || "",
                date_of_birth: beneficiaryData.date_of_birth || null,
                gender: beneficiaryData.gender || "",
                marital_status: beneficiaryData.marital_status || "",
                sign: beneficiaryData.sign || "",
                household_income: beneficiaryData.household_income ?? 0,
                syed: !!beneficiaryData.syed,
                orphan: !!beneficiaryData.orphan,
                family_members: beneficiaryData.family_members ?? 1,
                address: beneficiaryData.address || "",
                hospital_name: beneficiaryData.hospital_name || "",
                dr_name: beneficiaryData.dr_name || "",
                diseases_injury: beneficiaryData.diseases_injury || "",
                total_fee: beneficiaryData.total_fee ?? 0,
                last_checkup_date: beneficiaryData.last_checkup_date || null,
                reference_name: beneficiaryData.reference_name || "",
                reference_contact: beneficiaryData.reference_contact || "",
                reference_relation: beneficiaryData.reference_relation || "",
                approved: !!beneficiaryData.approved,
                approver_sign: beneficiaryData.approver_sign || "",
                did: beneficiaryData.did || "",
                approval_date: beneficiaryData.approval_date || null,
                application: !!beneficiaryData.application,
                beneficiary_cnic_submitted: !!beneficiaryData.beneficiary_cnic_submitted,
                prescription: !!beneficiaryData.prescription,
                uid: beneficiaryData.uid ? Number(beneficiaryData.uid) : "",
                patient_type: beneficiaryData.patient_type || "",
                type: "Patient Welfare",
            });
        }
    }, [beneficiaryData]);


    const submit = (e) => {
        e.preventDefault();
        post(route('beneficiarys-patients.store'), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    const [step, setStep] = useState(1);
    const [isBeneficiarySelected, setIsBeneficiarySelected] = useState(false);

    const handleBeneficiaryChange = (e) => {
        setData((prev) => ({ ...prev, uid: e }));
        router.visit(route("beneficiarys-patients.create"), {
            method: "get",
            data: { uid: e },
            preserveState: true, // Prevents page from resetting
            preserveScroll: true, // Keeps scroll position intact
        });
        setIsBeneficiarySelected(!!e);
    };

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
                                    <h2 className="sm:text-lg text-[9px] sm:font-medium">PATIENT WELFARE PROJECT – BENEFICIARY REGISTRATION FORM</h2>
                                    <p className="mt-1 sm:text-sm text-[9px] pb-3 sm:pb-0">
                                        BENEFICIARY’S DETAILS
                                    </p>
                                </div>
                            </header>
                            <div className="bg-white rounded-md sm:p-6 p-3 grid grid-cols-12 gap-5 items-center">
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="uid" value="Beneficiary" />
                                    <SelectComponent
                                        id="uid"
                                        value={data.uid}
                                        onChange={handleBeneficiaryChange}
                                        options={beneficiaries}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.uid} />
                                </div>
                                {isBeneficiarySelected && (
                                    <>
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
                                        <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
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
                                        <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
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
                                    </>
                                )}
                                <div className="flex items-center col-span-12 gap-2 sm:gap-4">
                                    {isBeneficiarySelected && (

                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
                                            onClick={() => setStep(2)}
                                        >
                                            Next
                                        </button>
                                    )}
                                    <Link
                                        href={route('beneficiarys-patients.index')}
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
                                    <InputLabel htmlFor="hospital_name" value="Hospital Name" />
                                    <TextInput
                                        id="hospital_name"
                                        className="mt-1 block w-full"
                                        value={data.hospital_name || ''}
                                        onChange={(e) => setData('hospital_name', e.target.value)}
                                        required
                                        autoComplete="hospital_name"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.hospital_name} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="dr_name" value="Dr Name" />
                                    <TextInput
                                        id="dr_name"
                                        className="mt-1 block w-full"
                                        value={data.dr_name || ''}
                                        onChange={(e) => setData('dr_name', e.target.value)}
                                        required
                                        autoComplete="dr_name"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.dr_name} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="diseases_injury" value="Diseases/Injury" />
                                    <TextInput
                                        id="diseases_injury"
                                        className="mt-1 block w-full"
                                        value={data.diseases_injury || ''}
                                        onChange={(e) => setData('diseases_injury', e.target.value)}
                                        required
                                        autoComplete="diseases_injury"
                                        type="text"
                                    />
                                    <InputError className="mt-2" message={errors.diseases_injury} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="patient_type" value="Type" />
                                    <SelectComponent
                                        id="patient_type"
                                        value={data.patient_type}
                                        onChange={(e) => setData('patient_type', e)}
                                        options={type}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.patient_type} />
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="total_fee" value="Cause" />
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
                                    <InputLabel htmlFor="last_checkup_date" value="Last Checkup Date" />
                                    <TextInput
                                        id="last_checkup_date"
                                        className="mt-1 block w-full"
                                        value={data.last_checkup_date || ''}
                                        onChange={(e) => setData('last_checkup_date', e.target.value)}
                                        required
                                        autoComplete="last_checkup_date"
                                        type="date"
                                    />
                                    <InputError className="mt-2" message={errors.last_checkup_date} />
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
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
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
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
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
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
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
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-3">
                                    <InputLabel htmlFor="prescription" value="Prescription" />
                                    <input
                                        type="radio"
                                        id="prescription_yes"
                                        name="prescription"
                                        value="true"
                                        checked={data.prescription === true}
                                        onChange={() => setData('prescription', true)}
                                    />
                                    <InputLabel htmlFor="prescription_yes" value="Yes" />

                                    <input
                                        type="radio"
                                        id="prescription_no"
                                        name="prescription"
                                        value="false"
                                        checked={data.prescription === false}
                                        onChange={() => setData('prescription', false)}
                                    />
                                    <InputLabel htmlFor="prescription_no" value="No" />
                                </div>
                                <div className="flex items-center col-span-12 gap-2 sm:gap-4">
                                    <PrimaryButton>Add Beneficiary</PrimaryButton>
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

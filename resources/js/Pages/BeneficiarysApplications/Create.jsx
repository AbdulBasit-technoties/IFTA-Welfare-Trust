import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import SelectComponent from "@/Components/SelectComponent";
import { useEffect, useState } from "react";
export default function Index({ auth, beneficiaries, TypeOptions, beneficiaryData, donors, institutions, programs, MaritalStatus, patientGender, programSlug }) {
    const { data, setData, post, errors } = useForm({
        beneficiary_name: "",
        guardian_name: "",
        email: "",
        beneficiary_cnic: "",
        guardian_cnic: "",
        beneficiary_contact_no: "",
        guardian_contact_no: "",
        photo_attached: null,
        occupation: "",
        date_of_birth: "",
        sign: "",
        semester: "",
        household_income: 0,
        syed: false,
        orphan: false,
        family_members: 1,
        address: "",
        institute_id: "",
        total_fee: 0,
        approved_amount: 0,
        institute_ntn: "",
        reference_name: "",
        reference_contact: "",
        reference_relation: "",
        approved: false,
        approver_sign: "",
        did: "",
        approval_date: "",
        degree_title: "",
        approval_letter: false,
        application: false,
        fee_voucher: false,
        bonafide_certificate: false,
        beneficiary_cnic_submitted: false,
        guardian_cnic_submitted: false,
        paid_fee_voucher: false,
        institute_ntn_submitted: false,
        uid: "",
        pid: "",
        marital_status: "",
        gender: "",
        disability: "",
        class: "",
        description: "",
        last_checkup_date: "",
        diseases_injury: "",
        dr_name: "",
        hospital_name: "",
        spouse_education: "",
        spouse_age: 0,
        no_of_guest_invited: 0,
        place_of_marriage: "",
        date_of_marriage: "",
        prescription: false,
        last_utility_bill: false,
        marriage_invitation: false,
        education_type: '',
        fees_time: '',
    });
    useEffect(() => {
        if (beneficiaryData) {
            setData(prevData => ({
                ...prevData,
                beneficiary_name: beneficiaryData.beneficiary_name || "",
                guardian_name: beneficiaryData.guardian_name || "",
                email: beneficiaryData.email || "",
                beneficiary_cnic: beneficiaryData.beneficiary_cnic || "",
                guardian_cnic: beneficiaryData.guardian_cnic || "",
                beneficiary_contact_no: beneficiaryData.beneficiary_contact_no || "",
                guardian_contact_no: beneficiaryData.guardian_contact_no || "",
                degree_title: beneficiaryData.degree_title || "",
                photo_attached: beneficiaryData.photo_attached || null,
                occupation: beneficiaryData.occupation || "",
                date_of_birth: beneficiaryData.date_of_birth || "",
                course_field: beneficiaryData.course_field || "",
                sign: beneficiaryData.sign || "",
                semester: beneficiaryData.semester || "",
                household_income: beneficiaryData.household_income ?? 0,
                syed: beneficiaryData.syed === 1,
                orphan: beneficiaryData.orphan === 1,
                family_members: beneficiaryData.family_members ?? 1,
                address: beneficiaryData.address || "",
                institute_id: beneficiaryData.institute_id || "",
                total_fee: beneficiaryData.total_fee ?? 0,
                approved_amount: beneficiaryData.approved_amount ?? 0,
                institute_ntn: beneficiaryData.institute_ntn || "",
                reference_name: beneficiaryData.reference_name || "",
                reference_contact: beneficiaryData.reference_contact || "",
                reference_relation: beneficiaryData.reference_relation || "",
                approved: beneficiaryData.approved === 1,
                approver_sign: beneficiaryData.approver_sign || "",
                did: beneficiaryData.did || "",
                approval_date: beneficiaryData.approval_date || "",
                approval_letter: !!beneficiaryData.approval_letter,
                application: !!beneficiaryData.application,
                fee_voucher: !!beneficiaryData.fee_voucher,
                bonafide_certificate: !!beneficiaryData.bonafide_certificate,
                beneficiary_cnic_submitted: !!beneficiaryData.beneficiary_cnic_submitted,
                guardian_cnic_submitted: !!beneficiaryData.guardian_cnic_submitted,
                paid_fee_voucher: !!beneficiaryData.paid_fee_voucher,
                institute_ntn_submitted: !!beneficiaryData.institute_ntn_submitted,
                uid: beneficiaryData.uid ? Number(beneficiaryData.uid) : "",
                pid: prevData.pid || beneficiaryData.pid || "",
                marital_status: beneficiaryData.marital_status || "",
                gender: beneficiaryData.gender || "",
                disability: beneficiaryData.disability || "",
                description: beneficiaryData.description || "",
                class: beneficiaryData.class || "",
                last_checkup_date: beneficiaryData.last_checkup_date || "",
                diseases_injury: beneficiaryData.diseases_injury || "",
                dr_name: beneficiaryData.dr_name || "",
                hospital_name: beneficiaryData.hospital_name || "",
                spouse_education: beneficiaryData.spouse_education || "",
                spouse_age: beneficiaryData.spouse_age || 0,
                no_of_guest_invited: beneficiaryData.no_of_guest_invited || 0,
                place_of_marriage: beneficiaryData.place_of_marriage || "",
                date_of_marriage: beneficiaryData.date_of_marriage || "",
                prescription: !!beneficiaryData.prescription,
                last_utility_bill: !!beneficiaryData.last_utility_bill,
                marriage_invitation: !!beneficiaryData.marriage_invitation,
                education_type: beneficiaryData.education_type || "",
                fees_time: beneficiaryData.fees_time || "",
            }));
        }
    }, [beneficiaryData]);
    const submit = (e) => {
        e.preventDefault();
        post(route('beneficiarys-applications.store'), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    const [step, setStep] = useState(1);

    const [isProgramSelected, setIsProgramSelected] = useState(false);
    const [isBeneficiarySelected, setIsBeneficiarySelected] = useState(false);
    const [selectedPid, setSelectedPid] = useState("");
    const handleProgramChange = (selectedValue) => {
        setSelectedPid(selectedValue);
        setData((prevData) => ({
            ...prevData,
            pid: selectedValue,
            uid: "", 
            beneficiary_name: ""
        }));

        setIsProgramSelected(!!selectedValue);
        setIsBeneficiarySelected(false);

        router.get(route("beneficiarys-applications.create"),
            { pid: selectedValue },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => console.log("Program changed successfully!"),
                onError: (errors) => console.error("Error:", errors),
            }
        );
    };
    const handleBeneficiaryChange = (selectedUid) => {
        const pidToUse = data.pid || selectedPid;

        if (!pidToUse) {
            alert("Please select a program first.");
            return;
        }
        setData({
            beneficiary_name: "",
            guardian_name: "",
            email: "",
            beneficiary_cnic: "",
            guardian_cnic: "",
            beneficiary_contact_no: "",
            guardian_contact_no: "",
            photo_attached: null,
            occupation: "",
            date_of_birth: "",
            sign: "",
            semester: "",
            household_income: 0,
            syed: false,
            orphan: false,
            family_members: 1,
            address: "",
            institute_id: "",
            total_fee: 0,
            approved_amount: 0,
            institute_ntn: "",
            reference_name: "",
            reference_contact: "",
            reference_relation: "",
            approved: false,
            approver_sign: "",
            did: "",
            approval_date: "",
            degree_title: "",
            approval_letter: false,
            application: false,
            fee_voucher: false,
            bonafide_certificate: false,
            beneficiary_cnic_submitted: false,
            guardian_cnic_submitted: false,
            paid_fee_voucher: false,
            institute_ntn_submitted: false,
            uid: selectedUid,
            pid: pidToUse,
            marital_status: "",
            gender: "",
            disability: "",
            class: "",
            description: "",
            last_checkup_date: "",
            diseases_injury: "",
            dr_name: "",
            hospital_name: "",
            spouse_education: "",
            spouse_age: 0,
            no_of_guest_invited: 0,
            place_of_marriage: "",
            date_of_marriage: "",
            prescription: false,
            last_utility_bill: false,
            marriage_invitation: false,
            education_type: '',
            fees_time: '',
        });

        setIsBeneficiarySelected(true);
        router.get(route("beneficiarys-applications.create"),
            { pid: pidToUse, uid: selectedUid },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => console.log("Beneficiary selected successfully!"),
                onError: (errors) => console.error("Error:", errors),
            }
        );
    };
    const [showInstitute, setShowInstitute] = useState(false);

    const handleEducationTypeChange = (e) => {
        setData("education_type", e);

        router.get(route("beneficiarys-applications.create"), {
            education_type: e,
            pid: data.pid,
        }, {
            preserveState: true,
            preserveScroll: true,
        });

        setShowInstitute(true);
    };

    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

    const handleInstituteChange = (e) => {
        const selectedId = e;
        const selectedInstitute = institutions.find(inst => inst.value == selectedId);

        setData({
            ...data,
            institute_id: selectedId,
            institute_ntn: selectedInstitute?.contact_no || '',
            fees_time: selectedInstitute?.fees_time || ''
        });

        // Show additional info only if an institute is selected
        setShowAdditionalInfo(!!selectedInstitute);
    };

    const feesTimeOptions = {
        "month": "Month",
        "6_month": "6 Months",
        "yearly": "Yearly",
    };


    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Beneficiary" />

            <section className="py-24 px-10">
                <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
                    <div className="p-3 flex sm:flex-row flex-col sm:justify-between text-center sm:text-start items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                        <ul className="steps w-full">
                            <li className={`step ${step >= 1 ? "step-neutral" : ""}`}></li>
                            {programSlug !== 'rations' && (
                                <li className={`step ${step >= 2 ? "step-neutral" : ""}`}></li>
                            )}

                            <li className={`step ${step >= (programSlug !== 'rations' ? 3 : 2) ? "step-neutral" : ""}`}></li>
                            <li className={`step ${step >= (programSlug !== 'rations' ? 4 : 3) ? "step-neutral" : ""}`}></li>
                        </ul>
                    </div>
                    {step === 1 && (
                        <div id="FirstForm" className={step === 1 ? "" : "hidden"}>
                            <header className="text-center p-2 bg-primary  text-white">
                                <div className="text-center">
                                    <h2 className="sm:text-lg text-[9px] sm:font-medium">{`${programSlug === 'schools' ? 'SCHOOL FEES SUPPORT PROGRAM – BENEFICIARY REGISTRATION FORM' : programSlug === 'higher-educations' ? 'HIGHER EDUCATION SUPPORT PROGRAM – BENEFICIARY REGISTRATION FORM' : programSlug === 'marriages' ? 'Marriage Support Program – Beneficiary Registration Form' : programSlug === 'rations' ? 'MONTHLY RATION SUPPORT PROGRAM – BENEFICIARY REGISTRATION FORM' : programSlug === 'patients' ? 'PATIENT WELFARE PROJECT – BENEFICIARY REGISTRATION FORM' : ''}`}</h2>
                                    <p className="mt-1 sm:text-sm text-[9px] pb-3 sm:pb-0">
                                        BENEFICIARY’S DETAILS
                                    </p>
                                </div>
                            </header>
                            <div className="bg-white rounded-md sm:p-6 p-3 grid grid-cols-12 gap-5 items-center">
                                <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="pid" value="Programs" />
                                    <SelectComponent
                                        id="pid"
                                        value={data.pid}
                                        onChange={handleProgramChange}
                                        options={programs}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.pid} />
                                </div>

                                {isProgramSelected && (
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
                                )}
                                {isBeneficiarySelected && (
                                    <>
                                        <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
                                            <InputLabel htmlFor="beneficiary_name" value="Beneficiary Name" />
                                            <TextInput
                                                id="beneficiary_name"
                                                className="mt-1 block w-full"
                                                value={data.beneficiary_name || ''}
                                                onChange={(e) => setData({ ...data, beneficiary_name: e.target.value })}
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
                                        <div className="xl:col-span-4 sm:col-span-6 col-span-12">
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
                                        <div className="xl:col-span-4 sm:col-span-6 col-span-12">
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
                                        <div className="xl:col-span-4 sm:col-span-6 col-span-12">
                                            <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                                            <TextInput
                                                id="date_of_birth"
                                                className="mt-1 block w-full"
                                                value={data.date_of_birth || ''}
                                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                                required
                                                autoComplete="date_of_birth"
                                                type="date"
                                            />
                                            <InputError className="mt-2" message={errors.date_of_birth} />
                                        </div>
                                        <div className="xl:col-span-4 sm:col-span-6 col-span-12">
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
                                        <div className="xl:col-span-4 sm:col-span-6 col-span-12">
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
                                        <div className="xl:col-span-4 sm:col-span-6 col-span-12">
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
                                        <div className="xl:col-span-3 lg:col-span-6 sm:col-span-6 col-span-12">
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
                                        <div className="xl:col-span-3 lg:col-span-6 sm:col-span-6 col-span-12">
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
                                        <div className="xl:col-span-3 lg:justify-center lg:col-span-6 sm:col-span-6 col-span-12 flex items-center gap-3">
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

                                        <div className="xl:col-span-3 lg:justify-center lg:col-span-6 sm:col-span-6 col-span-12 flex items-center gap-3">
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
                                        <div className="xl:col-span-4 col-span-12">
                                            <InputLabel htmlFor="description" value="Description" />
                                            <TextArea
                                                id="description"
                                                value={data.description || ''}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError className="mt-2" message={errors.description} />
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <InputLabel htmlFor="disability" value="Disability" />
                                            <TextArea
                                                id="disability"
                                                value={data.disability || ''}
                                                onChange={(e) => setData('disability', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError className="mt-2" message={errors.disability} />
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
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
                                    {isBeneficiarySelected && data.beneficiary_name && data.guardian_name && data.beneficiary_cnic && data.guardian_cnic && data.email && data.beneficiary_contact_no && data.guardian_contact_no && data.occupation && data.date_of_birth && data.sign && data.household_income && data.family_members && data.marital_status && data.gender && data.description && data.disability && data.address && (

                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                            onClick={() => setStep(2)}
                                        >
                                            Next
                                        </button>
                                    )}
                                    <Link
                                        href={route('beneficiarys-applications.index')}
                                        className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    {step === 2 && programSlug !== "rations" && (
                        <div id="SecondForm" className={step === 2 ? "" : "hidden"}>
                            <header className="text-center p-2 bg-primary  text-white">
                                <div>
                                    <h2 className="sm:text-lg text-[9px] sm:font-medium">{`${programSlug === 'schools' ? 'SCHOOL FEES SUPPORT PROGRAM – BENEFICIARY REGISTRATION FORM' : programSlug === 'higher-educations' ? 'HIGHER EDUCATION SUPPORT PROGRAM – BENEFICIARY REGISTRATION FORM' : programSlug === 'marriages' ? 'Marriage Support Program – Beneficiary Registration Form' : programSlug === 'rations' ? 'MONTHLY RATION SUPPORT PROGRAM – BENEFICIARY REGISTRATION FORM' : programSlug === 'patients' ? 'PATIENT WELFARE PROJECT – BENEFICIARY REGISTRATION FORM' : ''}`}</h2>
                                    <p className="mt-1 sm:text-sm text-[9px] pb-3 sm:pb-0">
                                        {`${programSlug === 'schools' ? 'SCHOOL DETAILS' : programSlug === 'higher-educations' ? 'EDUCATIONAL DETAILS' : programSlug === 'marriages' ? 'MARRIAGE DETAILS' : programSlug === 'rations' ? 'RATION DETAILS' : programSlug === 'patients' ? 'PATIENT DETAILS' : ''}`}
                                    </p>
                                </div>
                            </header>
                            <div className="bg-white rounded-md sm:p-6 p-3 grid grid-cols-12 gap-5 items-center">
                                {(programSlug === 'marriages' &&
                                    <>
                                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12">
                                            <InputLabel htmlFor="spouse_education" value="Spouse Education" />
                                            <TextInput
                                                id="spouse_education"
                                                className="mt-1 block w-full"
                                                value={data.spouse_education || ''}
                                                onChange={(e) => setData('spouse_education', e.target.value)}
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
                                                autoComplete="no_of_guest_invited"
                                                type="number"
                                            />
                                            <InputError className="mt-2" message={errors.no_of_guest_invited} />
                                        </div>
                                        <div className="xl:col-span-6 sm:col-span-6 col-span-12">
                                            <InputLabel htmlFor="place_of_marriage" value="Place Of Marriage" />
                                            <TextInput
                                                id="place_of_marriage"
                                                className="mt-1 block w-full"
                                                value={data.place_of_marriage || ''}
                                                onChange={(e) => setData('place_of_marriage', e.target.value)}
                                                autoComplete="place_of_marriage"
                                                type="text"
                                            />
                                            <InputError className="mt-2" message={errors.place_of_marriage} />
                                        </div>
                                        <div className="lg:col-span-6 col-span-12">
                                            <InputLabel htmlFor="date_of_marriage" value="Date Of Marriage" />
                                            <TextInput
                                                id="date_of_marriage"
                                                className="mt-1 block w-full"
                                                value={data.date_of_marriage || ''}
                                                onChange={(e) => setData('date_of_marriage', e.target.value)}
                                                autoComplete="date_of_marriage"
                                                type="date"
                                            />
                                            <InputError className="mt-2" message={errors.date_of_marriage} />
                                        </div>
                                    </>)}
                                {((programSlug === 'schools' || programSlug === 'higher-educations') &&
                                    <>
                                        <div
                                            className="xl:col-span-3 lg:col-span-6 sm:col-span-6 col-span-12"
                                        >
                                            <InputLabel htmlFor="education_type" value="Education Type" />
                                            <SelectComponent
                                                id="education_type"
                                                value={data.education_type}
                                                onChange={handleEducationTypeChange}
                                                options={
                                                    programSlug === "schools"
                                                        ? [
                                                            { label: "School", value: "school" },
                                                            { label: "Course", value: "course" },
                                                        ]
                                                        : [
                                                            { label: "Course", value: "course" },
                                                            { label: "College", value: "college" },
                                                            { label: "University", value: "university" },
                                                            { label: "Postgraduate", value: "postgraduate" },
                                                        ]
                                                }
                                                className="mt-1 block w-full"
                                            />
                                            <InputError className="mt-2" message={errors.education_type} />
                                        </div>

                                        {showInstitute && (
                                            <div
                                                className="xl:col-span-3 lg:col-span-6 sm:col-span-6 col-span-12"
                                            >
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
                                        )}
                                    </>
                                )}
                                {((programSlug === 'schools' || programSlug === 'higher-educations') && showAdditionalInfo &&

                                    <div className={`${programSlug === 'higher-educations' ? 'xl:col-span-3 sm:col-span-6 col-span-12' : 'xl:col-span-3 sm:col-span-6 col-span-12'}`}>
                                        <InputLabel htmlFor="fees_time" value="Fees Time" />
                                        <TextInput
                                            id="fees_time"
                                            className="mt-1 block w-full bg-gray-100 cursor-not-allowed" // Disable look
                                            value={feesTimeOptions[data.fees_time] || ''}
                                            readOnly // Prevent user editing
                                            autoComplete="fees_time"
                                            type="text"
                                        />
                                        <InputError className="mt-2" message={errors.fees_time} />
                                    </div>
                                )}
                                {((programSlug === 'schools' || programSlug === 'higher-educations') && showAdditionalInfo &&

                                    <div className={`${programSlug === 'higher-educations' ? 'xl:col-span-3 sm:col-span-6 col-span-12' : 'xl:col-span-3 sm:col-span-6 col-span-12'}`}>
                                        <InputLabel htmlFor="institute_ntn" value="Institute NTN" />
                                        <TextInput
                                            id="institute_ntn"
                                            className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                            value={data.institute_ntn || ''}
                                            onChange={(e) => setData('institute_ntn', e.target.value)}
                                            disabled
                                            autoComplete="institute_ntn"
                                            type="text"
                                        />
                                        <InputError className="mt-2" message={errors.institute_ntn} />
                                    </div>
                                )}
                                {(programSlug === 'schools' && showAdditionalInfo &&
                                    <div className="xl:col-span-4 sm:col-span-6 col-span-12">
                                        <InputLabel htmlFor="class" value="Class" />
                                        <TextInput
                                            id="class"
                                            className="mt-1 block w-full"
                                            value={data.class || ''}
                                            onChange={(e) => setData('class', e.target.value)}
                                            autoComplete="class"
                                            type="text"
                                        />
                                        <InputError className="mt-2" message={errors.class} />
                                    </div>
                                )}
                                {(showAdditionalInfo && programSlug === 'higher-educations' &&
                                    <>
                                        <div className="xl:col-span-3 sm:col-span-6 col-span-12">
                                            <InputLabel htmlFor="semester" value="Semester" />
                                            <TextInput
                                                id="semester"
                                                className="mt-1 block w-full"
                                                value={data.semester || ''}
                                                onChange={(e) => setData('semester', e.target.value)}
                                                autoComplete="semester"
                                                type="number"
                                            />
                                            <InputError className="mt-2" message={errors.semester} />
                                        </div>
                                    </>
                                )}
                                {(programSlug === 'higher-educations' && showAdditionalInfo &&
                                    <div className="xl:col-span-3 sm:col-span-6 col-span-12">
                                        <InputLabel htmlFor="degree_title" value="Degree Title" />
                                        <TextInput
                                            id="degree_title"
                                            className="mt-1 block w-full"
                                            value={data.degree_title || ''}
                                            onChange={(e) => setData('degree_title', e.target.value)}
                                            autoComplete="degree_title"
                                            type="text"
                                        />
                                        <InputError className="mt-2" message={errors.degree_title} />
                                    </div>
                                )}
                                {showAdditionalInfo && (programSlug === 'schools' || programSlug === 'higher-educations') && (
                                    <div className={`${programSlug === 'higher-educations' ? 'xl:col-span-3 sm:col-span-6 col-span-12' : 'xl:col-span-4 sm:col-span-6 col-span-12'}`}>
                                        <InputLabel htmlFor="total_fee" value="Total Fee" />
                                        <TextInput
                                            id="total_fee"
                                            className="mt-1 block w-full"
                                            value={data.total_fee || ''}
                                            onChange={(e) => setData('total_fee', e.target.value)}
                                            autoComplete="total_fee"
                                            type="number"
                                        />
                                        <InputError className="mt-2" message={errors.total_fee} />
                                    </div>
                                )}
                                {((programSlug === 'schools' || programSlug === 'higher-educations') && showAdditionalInfo &&

                                    <div className={`${programSlug === 'higher-educations' ? 'xl:col-span-3 sm:col-span-6 col-span-12' : 'xl:col-span-4  col-span-12'}`}>
                                        <InputLabel htmlFor="approved_amount" value="Approved Amount" />
                                        <TextInput
                                            id="approved_amount"
                                            className="mt-1 block w-full"
                                            value={data.approved_amount || ''}
                                            onChange={(e) => setData('approved_amount', e.target.value)}
                                            autoComplete="approved_amount"
                                            type="number"
                                        />
                                        <InputError className="mt-2" message={errors.approved_amount} />
                                    </div>
                                )}
                                {(programSlug === 'patients' &&
                                    <>
                                        <div className="xl:col-span-4 sm:col-span-6 col-span-12">
                                            <InputLabel htmlFor="hospital_name" value="Hospital Name" />
                                            <TextInput
                                                id="hospital_name"
                                                className="mt-1 block w-full"
                                                value={data.hospital_name || ''}
                                                onChange={(e) => setData('hospital_name', e.target.value)}
                                                autoComplete="hospital_name"
                                                type="text"
                                            />
                                            <InputError className="mt-2" message={errors.hospital_name} />
                                        </div>
                                        <div className="xl:col-span-4 sm:col-span-6 col-span-12">
                                            <InputLabel htmlFor="dr_name" value="Dr Name" />
                                            <TextInput
                                                id="dr_name"
                                                className="mt-1 block w-full"
                                                value={data.dr_name || ''}
                                                onChange={(e) => setData('dr_name', e.target.value)}
                                                autoComplete="dr_name"
                                                type="text"
                                            />
                                            <InputError className="mt-2" message={errors.dr_name} />
                                        </div>
                                        <div className="xl:col-span-4 sm:col-span-6 col-span-12">
                                            <InputLabel htmlFor="diseases_injury" value="Diseases/Injury" />
                                            <TextInput
                                                id="diseases_injury"
                                                className="mt-1 block w-full"
                                                value={data.diseases_injury || ''}
                                                onChange={(e) => setData('diseases_injury', e.target.value)}
                                                autoComplete="diseases_injury"
                                                type="text"
                                            />
                                            <InputError className="mt-2" message={errors.diseases_injury} />
                                        </div>
                                        <div className="xl:col-span-6 sm:col-span-6 col-span-12">
                                            <InputLabel htmlFor="last_checkup_date" value="Last Checkup Date" />
                                            <TextInput
                                                id="last_checkup_date"
                                                className="mt-1 block w-full"
                                                value={data.last_checkup_date || ''}
                                                onChange={(e) => setData('last_checkup_date', e.target.value)}
                                                autoComplete="last_checkup_date"
                                                type="date"
                                            />
                                            <InputError className="mt-2" message={errors.last_checkup_date} />
                                        </div>
                                    </>
                                )}
                                {programSlug === 'patients' && (
                                    <div className="xl:col-span-6 col-span-12">
                                        <InputLabel htmlFor="total_fee" value="Cause" />
                                        <TextInput
                                            id="total_fee"
                                            className="mt-1 block w-full"
                                            value={data.total_fee || ''}
                                            onChange={(e) => setData('total_fee', e.target.value)}
                                            autoComplete="total_fee"
                                            type="number"
                                        />
                                        <InputError className="mt-2" message={errors.total_fee} />
                                    </div>
                                )}
                                <div className="flex items-center col-span-12 gap-2 sm:gap-4">
                                    {(programSlug === 'schools' && data.education_type && data.institute_id && data.class && data.total_fee && data.approved_amount) ||
                                        (programSlug === 'higher-educations' && data.education_type && data.institute_id && data.semester && data.degree_title && data.total_fee && data.approved_amount) ||
                                        (programSlug === 'marriages' && data.spouse_education && data.spouse_age && data.no_of_guest_invited && data.place_of_marriage && data.date_of_marriage) ||
                                        (programSlug === 'patients' && data.hospital_name && data.dr_name && data.diseases_injury && data.last_checkup_date && data.total_fee)
                                        ? (
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                                onClick={() => setStep(3)}
                                            >
                                                Next
                                            </button>
                                        )
                                        : null}

                                    {step > 1 && (
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                            onClick={() => setStep((prev) => prev - 1)}
                                        >
                                            Back
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {(step === (programSlug === 'rations' ? 2 : 3)) && (
                        <div
                            id="ThirdForm"
                            className={step === (programSlug === 'rations' ? 2 : 3) ? "" : "hidden"}
                        >
                            <header className="p-3 flex sm:flex-row flex-col sm:justify-between text-center sm:text-start items-center bg-primary text-white">
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
                                    {data.reference_name && data.reference_contact && data.reference_relation &&
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                            onClick={() => setStep(programSlug === 'rations' ? 3 : 4)}
                                        >
                                            Next
                                        </button>
                                    }

                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                        onClick={() => setStep(programSlug === 'rations' ? 1 : 2)}
                                    >
                                        Back
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}
                    {step === (programSlug === 'rations' ? 3 : 4) && (
                        <div id="FourthForm" className={step === (programSlug === 'rations' ? 3 : 4) ? "" : "hidden"}>
                            <header className="p-3 flex sm:flex-row flex-col sm:justify-between text-center sm:text-start items-center bg-primary text-white">
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
                                {((programSlug === 'schools' || programSlug === 'higher-educations' || programSlug === 'patients') &&
                                    <>
                                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                            <InputLabel htmlFor="application" value="Application" />
                                            <div className="flex items-center gap-3">

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
                                        </div>
                                    </>
                                )}
                                {((programSlug === 'schools' || programSlug === 'higher-educations') &&
                                    <>
                                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                            <InputLabel htmlFor="approval_letter" value="Approval Letter" />
                                            <div className="flex items-center gap-3">

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
                                        </div>

                                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                            <InputLabel htmlFor="fee_voucher" value="Fee Voucher" />
                                            <div className="flex items-center gap-3">

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
                                        </div>
                                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                            <InputLabel htmlFor="bonafide_certificate" value="Bonafide Certificate" />
                                            <div className="flex items-center gap-3">

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
                                        </div>

                                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                            <InputLabel htmlFor="guardian_cnic_submitted" value="Guardian Cnic Submitted" />
                                            <div className="flex items-center gap-3">

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
                                        </div>
                                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                            <InputLabel htmlFor="paid_fee_voucher" value="Paid Fee Voucher" />
                                            <div className="flex items-center gap-3">
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
                                        </div>
                                        <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                            <InputLabel htmlFor="institute_ntn_submitted" value="Institute Ntn Submitted" />
                                            <div className="flex items-center gap-3">

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
                                        </div>
                                    </>
                                )}
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                    <InputLabel htmlFor="approved" value="Approved" />
                                    <div className="flex items-center gap-3">

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
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                    <InputLabel htmlFor="beneficiary_cnic_submitted" value="Beneficiary Cnic Submitted" />
                                    <div className="flex items-center gap-3">

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
                                </div>
                                {(programSlug === 'patients' &&
                                    <div className="xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                        <InputLabel htmlFor="prescription" value="Prescription" />
                                        <div className="flex items-center gap-3">
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
                                    </div>
                                )}
                                {(programSlug === 'rations' &&
                                    <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                        <InputLabel htmlFor="last_utility_bill" value="Last Utility Bill" />
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                id="last_utility_bill_yes"
                                                name="last_utility_bill"
                                                value="true"
                                                checked={data.last_utility_bill === true}
                                                onChange={() => setData('last_utility_bill', true)}
                                            />
                                            <InputLabel htmlFor="last_utility_bill_yes" value="Yes" />

                                            <input
                                                type="radio"
                                                id="last_utility_bill_no"
                                                name="last_utility_bill"
                                                value="false"
                                                checked={data.last_utility_bill === false}
                                                onChange={() => setData('last_utility_bill', false)}
                                            />
                                            <InputLabel htmlFor="last_utility_bill_no" value="No" />
                                        </div>
                                    </div>
                                )}
                                {(programSlug === 'marriages' &&
                                    <div className="xl:col-span-4 lg:col-span-4 sm:col-span-6 col-span-12 flex xl:items-center xl:flex-row flex-col gap-3">
                                        <InputLabel htmlFor="marriage_invitation" value="Marriage Invitation" />
                                        <div className="flex items-center gap-3">
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
                                    </div>
                                )}
                                <div className="flex items-center col-span-12 gap-2 sm:gap-4">
                                    {data.approver_sign && data.did && data.approval_date &&
                                        <PrimaryButton>Add Beneficiary</PrimaryButton>
                                    }
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
                                        onClick={() => setStep(programSlug === 'rations' ? 2 : 3)}
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

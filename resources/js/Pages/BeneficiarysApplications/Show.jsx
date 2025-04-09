import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head} from "@inertiajs/react";
export default function Index({ auth, beneficiaries }) {
    const FeesTime = [
        { label: "Month", value: "month" },
        { label: "6 Months", value: "6_month" },
        { label: "Yearly", value: "yearly" },
    ];
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Application Detail" />
            <div className="px-10 py-20">
                <div className="grid grid-cols-12 gap-5">
                    <div className={`${beneficiaries?.program?.name === "Ration" ? "col-span-4" : "2xl:col-span-6 lg:col-span-6 col-span-12"} mt-3`}>
                        <div className="flex font-semibold items-center leading-tight text-primary text-xl justify-between mb-4 md:pe-4">
                            <h2>Beneficiary Detail</h2>
                        </div>
                        <div className="rounded-xl overflow-x-auto">
                            <table className="table table-xs w-full table-main table-auto">
                                <thead className="bg-white text-gray-800">
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Name</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.beneficiary_name}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Guardian Name</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.guardian_name}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Email</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.email}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Phone</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.beneficiary_contact_no}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">CNIC</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.beneficiary_cnic}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Guardian CNIC</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.guardian_cnic}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Address</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.address}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Guardian Contact No</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.guardian_contact_no}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Occupation</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.occupation}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Household Income</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.household_income}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Syed</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.syed === 1 ? 'Yes' : 'No'}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Date of Birth</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.date_of_birth}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Orphan</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.orphan === 1 ? 'Yes' : 'No'}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Family Members</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.family_members}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Sign</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.sign}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Marital Status</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.marital_status}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Gender</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.gender}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Description</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.description}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Disability</th>
                                        <td className="text-sm whitespace-nowrap font-light">{beneficiaries.disability}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className={`${beneficiaries?.program?.name === "Ration" ? "hidden" : "2xl:col-span-6 lg:col-span-6 col-span-12"} mt-3`}>
                        <div className="flex font-semibold items-center leading-tight text-primary text-xl justify-between mb-4 md:pe-4">
                            <h2>{beneficiaries?.program?.name === 'School' || beneficiaries?.program?.name === 'Higher Education' ? 'Education Information' : beneficiaries?.program?.name === 'Marriage' ? "Marriage Information" : beneficiaries?.program?.name === 'Patient' ? "Patient Information" : ""}</h2>
                        </div>
                        <div className="rounded-xl overflow-x-auto">
                            <table className="table table-xs w-full table-main table-auto">
                                <thead className="bg-white text-gray-800">
                                    {((beneficiaries?.program?.name === "School") || (beneficiaries?.program?.name === "Higher Education")) && (
                                        <>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Education Type</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.education_type}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Institute Name</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.institute.name}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Fees Time</th>
                                                <td className="font-light text-sm whitespace-nowrap">{FeesTime.find(item => item.value === beneficiaries.fees_time)?.label || "Unknown"}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Institute NTN</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.institute_ntn}</td>
                                            </tr>
                                        </>
                                    )}
                                    {beneficiaries?.program?.name === "School" &&
                                        <tr className="border-b-gray-300 border">
                                            <th className="py-3 px-4">Class</th>
                                            <td className="font-light text-sm whitespace-nowrap">{beneficiaries.class}</td>
                                        </tr>
                                    }
                                    {beneficiaries?.program?.name === "Higher Education" &&
                                        <>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Degree Title</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.degree_title}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Semester</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.semester}</td>
                                            </tr>
                                        </>
                                    }
                                    {((beneficiaries?.program?.name === "School") || (beneficiaries?.program?.name === "Higher Education")) && (
                                        <>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Total Fee</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.total_fee}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Approved Amount</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.approved_amount}</td>
                                            </tr>
                                        </>
                                    )}
                                    {beneficiaries?.program?.name === "Patient"
                                        &&
                                        <>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Hospital Name</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.hospital_name}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Doctor Name</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.dr_name}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Diseases/Injury</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.diseases_injury}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Last Checkup Date</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.last_checkup_date}</td>
                                            </tr>
                                        </>}
                                    {beneficiaries?.program?.name === "Marriage"
                                        &&
                                        <>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Spouse Education</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.spouse_education}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Spouse Age</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.spouse_age}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">No. of Guests Invited</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.no_of_guest_invited}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Place of Marriage</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.place_of_marriage}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Date of Marriage</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.date_of_marriage}</td>
                                            </tr>
                                        </>
                                    }
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className={`${beneficiaries?.program?.name === "Ration" ? "col-span-4" : "2xl:col-span-6 lg:col-span-6 col-span-12"} mt-3`}>
                        <div className="flex font-semibold items-center leading-tight text-primary text-xl justify-between mb-4 md:pe-4">
                            <h2>Reference Detail</h2>
                        </div>
                        <div className="rounded-xl overflow-x-auto">
                            <table className="table table-xs w-full table-main table-auto">
                                <thead className="bg-white text-gray-800">
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Reference Name</th>
                                        <td className="font-light text-sm whitespace-nowrap">{beneficiaries.reference_name}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Reference Contact</th>
                                        <td className="font-light text-sm whitespace-nowrap">{beneficiaries.reference_contact}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Reference Relation</th>
                                        <td className="font-light text-sm whitespace-nowrap">{beneficiaries.reference_relation}</td>
                                    </tr>

                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className={`${beneficiaries?.program?.name === "Ration" ? "col-span-4" : "2xl:col-span-6 lg:col-span-6 col-span-12"} mt-3`}>
                        <div className="flex font-semibold items-center leading-tight text-primary text-xl justify-between mb-4 md:pe-4">
                            <h2>Approval & Documents</h2>
                        </div>
                        <div className="rounded-xl overflow-x-auto">
                            <table className="table table-xs w-full table-main table-auto">
                                <thead className="bg-white text-gray-800">
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Approver Sign</th>
                                        <td className="font-light text-sm whitespace-nowrap">{beneficiaries.approver_sign}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Donor</th>
                                        <td className="font-light text-sm whitespace-nowrap">{beneficiaries.donor.name}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Approval Date</th>
                                        <td className="font-light text-sm whitespace-nowrap">{beneficiaries.approval_date}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Approved</th>
                                        <td className="font-light text-sm whitespace-nowrap">{beneficiaries.approved === 1 ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr className="border-b-gray-300 border">
                                        <th className="py-3 px-4">Beneficiary CNIC Submitted</th>
                                        <td className="font-light text-sm whitespace-nowrap">{beneficiaries.beneficiary_cnic_submitted === 1 ? "Yes" : "No"}</td>
                                    </tr>
                                    {((beneficiaries?.program?.name === "School") || (beneficiaries?.program?.name === "Higher Education")) && (
                                        <>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Application</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.application === 1 ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Approval Letter</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.approval_letter === 1 ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Fee Voucher</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.fee_voucher === 1 ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Bonafide Certificate</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.bonafide_certificate === 1 ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Guardian CNIC Submitted</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.guardian_cnic_submitted === 1 ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Paid Fee Voucher</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.paid_fee_voucher === 1 ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr className="border-b-gray-300 border">
                                                <th className="py-3 px-4">Institute NTN Submitted</th>
                                                <td className="font-light text-sm whitespace-nowrap">{beneficiaries.institute_ntn_submitted === 1 ? "Yes" : "No"}</td>
                                            </tr>
                                        </>
                                    )}
                                    {beneficiaries?.program?.name === "Marriage" &&
                                        <tr className="border-b-gray-300 border">
                                            <th className="py-3 px-4">Marriage Invitation</th>
                                            <td className="font-light text-sm whitespace-nowrap">{beneficiaries.marriage_invitation === 1 ? "Yes" : "No"}</td>
                                        </tr>
                                    }
                                    {beneficiaries?.program?.name === "Ration" &&
                                        <tr className="border-b-gray-300 border">
                                            <th className="py-3 px-4">Last Utility Bill</th>
                                            <td className="font-light text-sm whitespace-nowrap">{beneficiaries.last_utility_bill === 1 ? "Yes" : "No"}</td>
                                        </tr>
                                    }
                                    {beneficiaries?.program?.name === "Patient" &&
                                        <tr className="border-b-gray-300 border">
                                            <th className="py-3 px-4">Prescription</th>
                                            <td className="font-light text-sm whitespace-nowrap">{beneficiaries.prescription === 1 ? "Yes" : "No"}</td>
                                        </tr>
                                    }
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
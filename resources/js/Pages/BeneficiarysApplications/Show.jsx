import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Show({ auth, beneficiaries }) {
    
    const generatePDF = () => {
        const doc = new jsPDF("p", "mm", "a4");

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Performance", 14, 20);

        // Subtitle
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Review your latest performance details.", 14, 28);

        // Beneficiary Info Table
        const beneficiaryData = [
            ["Beneficiary Name", beneficiaries.beneficiary_name, "Beneficiary Email", beneficiaries.email],
            ["Beneficiary Phone", beneficiaries.beneficiary_contact_no, "Guardian Name", beneficiaries.guardian_name],
            ["Institute Type", beneficiaries.institute.type, "Institute Name", beneficiaries.institute.name]
        ];

        autoTable(doc, {
            startY: 35,
            head: [],
            body: beneficiaryData,
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 4, valign: "middle" },
            columnStyles: { 0: { fontStyle: "bold", cellWidth: 40 }, 2: { fontStyle: "bold", cellWidth: 40 } },
        });

        let startY = doc.lastAutoTable.finalY + 10;

        // Performance Details
        beneficiaries.performances.forEach((performance, index) => {
            const createdAt = new Date(performance.created_at);
            const formattedDate = createdAt.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }).replace(/,/g, "");

            const formattedMonth = createdAt.toLocaleDateString("en-US", { month: "long" });

            autoTable(doc, {
                startY,
                body: [
                    [
                        { content: "Performance", styles: { fontStyle: "bold", halign: "left" } },
                        performance.performance,
                        { content: "Month", styles: { fontStyle: "bold", halign: "left" } },
                        formattedMonth,
                        { content: "Date", styles: { fontStyle: "bold", halign: "left" } },
                        formattedDate
                    ],
                    [
                        { content: "Comment", styles: { fontStyle: "bold", halign: "left", valign: "top", cellPadding: 4 } },
                        { 
                            content: performance.comment.trim(),
                            colSpan: 5,
                            styles: { halign: "left", cellPadding: 4, lineHeight: 1.5, fontSize: 10 } 
                        }
                    ]
                ],
                theme: "grid",
                styles: { fontSize: 10, cellPadding: 4, valign: "middle" },
                columnStyles: {
                    0: { fontStyle: "bold", cellWidth: 35, valign: "top" }, // Performance column ki width badhayi
                    1: { cellWidth: 50, whiteSpace: 'nowrap' }, // Performance value zyada width le sakti hai
                    2: { fontStyle: "bold", cellWidth: 25 },
                    3: { cellWidth: 30, whiteSpace: 'nowrap' }, // Month ki width bhi fix ki
                    4: { fontStyle: "bold", cellWidth: 25 },
                    5: { cellWidth: 30, whiteSpace: 'nowrap' }, // Date ki width bhi fix ki
                },
                margin: { left: 14, right: 14 },
            });
            

            startY = doc.lastAutoTable.finalY + 10;
        });

        // Save the PDF
        doc.save("performance_report.pdf");
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Performance" />
            <div className="py-24" id="performance">
                <div className="flex font-semibold justify-center leading-tight mb-6 pt-8 text-gray-800 text-xl">
                    <div className="flex justify-center w-full">
                        <div className="xl:w-1/2 md:w-2/3 w-full bg-white shadow-lg rounded-lg">
                            <div className="px-8 py-6 border-b">
                                <h2 className="text-2xl font-bold">Performance</h2>
                                <p className="text-sm text-gray-600">Review your latest performance details.</p>
                            </div>
                            <div className="px-8 py-6 grid grid-cols-1 gap-6">
                                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-gray-600">Beneficiary Name</div>
                                        <div className="text-lg font-medium">{beneficiaries.beneficiary_name}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-gray-600">Beneficiary Email</div>
                                        <div className="text-lg font-medium">{beneficiaries.email}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-gray-600">Guardian Name</div>
                                        <div className="text-lg font-medium">{beneficiaries.guardian_name}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-gray-600">Beneficiary Phone</div>
                                        <div className="text-lg font-medium">{beneficiaries.beneficiary_contact_no}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-gray-600">Institute Type</div>
                                        <div className="text-lg font-medium">{beneficiaries.institute.type}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-gray-600">Institute Name</div>
                                        <div className="text-lg font-medium ">{beneficiaries.institute.name}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {beneficiaries.performances.map((performance, index) => {
                                        const createdAt = new Date(performance.created_at);
                                        const formattedDate = createdAt.toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "2-digit",
                                        }).replace(/,/g, "");

                                        const formattedMonth = createdAt.toLocaleDateString("en-US", { month: "long" });

                                        return (
                                            <div key={index} className="space-y-1 grid grid-cols-12 border-gray-300 p-3 border rounded-md">
                                                <div className="flex gap-2 items-center xl:col-span-4 col-span-12">
                                                    <div className="text-base font-bold text-gray-600">Performance</div>
                                                    <div className="text-sm font-medium">{performance.performance}</div>
                                                </div>
                                                <div className="flex gap-2 items-center xl:col-span-4 col-span-12">
                                                    <div className="text-base font-bold text-gray-600">Month</div>
                                                    <div className="text-sm font-medium">{formattedMonth}</div>
                                                </div>
                                                <div className="flex gap-2 items-center xl:col-span-4 col-span-12">
                                                    <div className="text-base font-bold text-gray-600">Date</div>
                                                    <div className="text-sm font-medium">{formattedDate}</div>
                                                </div>
                                                <div className="col-span-12">
                                                    <div className="text-base font-bold text-gray-600">Comment</div>
                                                    <div className="text-sm font-medium">{performance.comment}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex justify-end px-8 py-4 border-t">
                                <button
                                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                                    onClick={generatePDF}
                                >
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

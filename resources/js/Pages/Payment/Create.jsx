import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectComponent from "@/Components/SelectComponent";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
import { useEffect } from "react";
export default function Index({ auth, donors, beneficiaries, PaymentStatus, beneficiaryProgram, OptionPayments, beneficiaryRecord, bid, did, pid }) {

    const { data, setData, post, errors } = useForm({
        did: null,
        bid: null,
        pid: null,
        status: null,
        amount_paid: null,
        amount_requested: null,
        payment_slip: null,
        comment: null,
        payment_option: null,
        total_paid: null,
    });

    useEffect(() => {
        if (did && data.did !== did) {
            setData(prevData => ({
                ...prevData,
                did: Number(did),  // Ensure the value is always a number
            }));
        }
    }, [did, data.did]);

    useEffect(() => {
        if (bid && data.bid !== bid) {
            setData(prevData => ({
                ...prevData,
                bid: Number(bid),  // Ensure the value is always a number
            }));
        }
    }, [bid, data.bid]);

    useEffect(() => {
        if (pid && data.pid !== pid) {
            setData(prevData => ({
                ...prevData,
                pid: Number(pid),  // Ensure the value is always a number
            }));
        }
    }, [pid, data.pid]);


    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("did", data.did);
        formData.append("bid", data.bid);
        formData.append("pid", data.pid);
        formData.append("status", data.status);
        formData.append("amount_paid", data.amount_paid);
        formData.append("amount_requested", data.amount_requested);
        formData.append("comment", data.comment);
        formData.append("payment_option", data.payment_option);
        formData.append("total_paid", data.total_paid);

        if (data.payment_slip instanceof File) {
            formData.append("payment_slip", data.payment_slip);
        }

        router.post(route("payments.store"), formData, {
            forceFormData: true,
        });
    };

    const [programs, setPrograms] = useState([]);
    const [showProgram, setShowProgram] = useState(false);

    const handleBeneficiaryChange = (e) => {
        const selectedBid = e;
        setData(prevData => ({ ...prevData, bid: selectedBid }));

        if (selectedBid) {
            router.get(route("payments.create", { bid: selectedBid }), {}, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (response) => {
                    setPrograms(response.props.programs);
                    // Ensure program is shown when beneficiary is selected
                    setShowProgram(true);
                    console.log("Programs:", response.props.programs);  // Check if programs are being set
                },
            });
        } else {
            setShowProgram(false); // Hide program if no beneficiary is selected
        }
    };
    useEffect(() => {
        if (data.bid) {
            setShowProgram(true);  // Show program dropdown when a beneficiary is selected
        } else {
            setShowProgram(false);  // Hide program dropdown if no beneficiary is selected
        }
    }, [data.bid]);  // Watch for changes in 'bid'

    useEffect(() => {
        if (beneficiaryRecord) {
            setData((prevData) => ({
                ...prevData,
                amount_requested: beneficiaryRecord.total_fee || '',
                amount_paid: beneficiaryRecord.approved_amount || ''
            }));
        }
    }, [beneficiaryRecord]);
    console.log(data.did)
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Payment" />

            <section className="py-24 px-10">
                <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
                    <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
                        <div>
                            <h2 className="sm:text-lg text-xs font-medium">Add Payment</h2>
                            <p className="mt-1 sm:text-sm text-xs">
                                add your user here
                            </p>
                        </div>
                    </header>
                    <div className="bg-white rounded-md sm:p-6 p-2 grid grid-cols-12 gap-5 items-center">
                        <div className="sm:col-span-6 col-span-12">
                            <InputLabel htmlFor="payment_option" value="Payment Options" />
                            <SelectComponent
                                id="payment_option"
                                value={data.payment_option}
                                onChange={(e) => setData('payment_option', e)}
                                options={OptionPayments}
                                className="mt-1 block w-full"
                            />
                        </div>

                        {data.payment_option && (
                            <div className="sm:col-span-6 col-span-12">
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
                        )}

                        {data.did && data.payment_option === 'Create Payment' && (
                            <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                                <InputLabel htmlFor="bid" value="Beneficiary" />
                                <SelectComponent
                                    id="bid"
                                    value={data.bid}
                                    onChange={handleBeneficiaryChange}
                                    options={beneficiaries}
                                    className="mt-1 block w-full"
                                />
                                <InputError className="mt-2" message={errors.bid} />
                            </div>
                        )}

                        {showProgram && (
                            <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                                <InputLabel htmlFor="pid" value="Program" />
                                <SelectComponent
                                    id="pid"
                                    value={data.pid}
                                    onChange={(e) => {
                                        setData("pid", e);
                                        router.visit(route("payments.create"), {
                                            method: "get",
                                            data: {
                                                pid: e,
                                                bid: data.bid,
                                            },
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                    options={beneficiaryProgram}
                                    className="mt-1 block w-full"
                                />
                                <InputError className="mt-2" message={errors.pid} />
                            </div>
                        )}

                        {data.pid && (
                            <>


                                <div className="sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="amount_requested" value="Amount" />
                                    <TextInput
                                        id="amount_requested"
                                        className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                        value={data.amount_requested || ''}
                                        readOnly
                                        autoComplete="amount_requested"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.amount_requested} />
                                </div>

                                <div className="sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="amount_paid" value="Amount Paid" />
                                    <TextInput
                                        id="amount_paid"
                                        className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                        value={data.amount_paid || ''}
                                        readOnly
                                        autoComplete="amount_paid"
                                        type="number"
                                    />
                                    <InputError className="mt-2" message={errors.amount_paid} />
                                </div>

                                <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                                    <InputLabel htmlFor="status" value="Status" />
                                    <SelectComponent
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e)}
                                        options={PaymentStatus}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.status} />
                                </div>
                            </>
                        )}
                        {data.did && (
                            <div className="sm:col-span-6 col-span-12">
                                <InputLabel htmlFor="payment_slip" value="Payment Slip" />
                                <TextInput
                                    id="payment_slip"
                                    className="mt-1 block w-full"
                                    value={data.payment_slip || ''}
                                    onChange={(e) => setData('payment_slip', e.target.files.length ? e.target.files[0] : null)}
                                    isFocused
                                    autoComplete="payment_slip"
                                    type="file"
                                />
                                <InputError className="mt-2" message={errors.payment_slip} />
                            </div>
                        )}
                        {data.did && data.payment_option === 'Create Payment' && (
                            <div className="col-span-12">
                                <InputLabel htmlFor="comment" value="Comment" />
                                <TextArea
                                    id="comment"
                                    value={data.comment || ''}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError className="mt-2" message={errors.comment} />
                            </div>
                        )}
                        {data.payment_option?.trim().toLowerCase() === 'depositdonor' && data.did && (

                            <div className='sm:col-span-6 col-span-12'>
                                <InputLabel htmlFor="total_paid" value="Total Paid" />
                                <TextInput
                                    id="total_paid"
                                    className="mt-1 block w-full"
                                    value={data.total_paid || ''}
                                    onChange={(e) => setData('total_paid', e.target.value)}
                                    isFocused
                                    autoComplete="total_paid"
                                    type="number"
                                />
                                <InputError className="mt-2" message={errors.total_paid} />
                            </div>
                        )}
                        <div className="flex items-center gap-4 col-span-12">
                            <PrimaryButton>Add Payment</PrimaryButton>
                            <Link
                                href={route('payments.index')}
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

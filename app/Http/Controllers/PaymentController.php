<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\Beneficiary;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $payments = Payment::with(['donor', 'beneficiary', 'program'])
            ->filterByRole();
        if ($request->has('beneficiaries') && !empty($request->beneficiaries)) {
            $payments->whereIn('bid', $request->beneficiaries);
        }
        $PaymentStatus = [
            ["label" => "Waiting", "value" => "Waiting"],
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Rejected", "value" => "Rejected"],
            ["label" => "Partially Paid", "value" => "Partially Paid"],
            ["label" => "Paid", "value" => "Paid"],
        ];

        $beneficiaries = User::role('Beneficiary')->get()->map(fn($beneficiary) => [
            'label' => $beneficiary->name,
            'value' => (string) $beneficiary->id, // Ensure it's a string
        ])->toArray();

        return Inertia::render('Payment/Index', [
            'payments' => $payments->paginate(10),
            'paymentStatus' => $PaymentStatus,
            'beneficiaries' => $beneficiaries,
        ]);
    }

    public function PaymentRequest(Request $request)
    {
        $payments = Payment::with(['donor', 'beneficiary', 'program'])
            ->where('status', 'Request')->filterByRole();
        if ($request->has('beneficiaries') && !empty($request->beneficiaries)) {
            $payments->whereIn('bid', $request->beneficiaries);
        }
        $PaymentStatus = [
            ["label" => "Waiting", "value" => "Waiting"],
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Rejected", "value" => "Rejected"],
            ["label" => "Partially Paid", "value" => "Partially Paid"],
            ["label" => "Paid", "value" => "Paid"],
        ];

        $beneficiaries = User::role('Beneficiary')->get()->map(fn($beneficiary) => [
            'label' => $beneficiary->name,
            'value' => (string) $beneficiary->id, // Ensure it's a string
        ])->toArray();
        return Inertia::render('Payment/PaymentRequest', [
            'payments' => $payments->paginate(10),
            'paymentStatus' => $PaymentStatus,
            'beneficiaries' => $beneficiaries,
        ]);
    }


    public function create(Request $request)
    {
        $bid = $request->input('bid') ?? null;
        $pid = $request->input('pid') ?? null;
        $did = $request->input('did') ?? null;
        $beneficiaryRecord = null;

        if ($pid && $bid) {
            $beneficiaryRecord = Beneficiary::where('uid', $bid)
                ->where('pid', $pid)
                ->select('total_fee', 'approved_amount')
                ->first();

            if (!$beneficiaryRecord) {
                return redirect()->route('payments.index')->with([
                    'message' => 'No matching beneficiary record found for the selected program.'
                ]);
            }
        }

        $beneficiaryProgram = Beneficiary::where('uid', $request->bid)
            ->with('program')
            ->get()
            ->map(fn($beneficiary) => $beneficiary->program ? [
                'label' => $beneficiary->program->name,
                'value' => $beneficiary->program->id,
            ] : null)
            ->filter()
            ->unique('value')
            ->values()
            ->toArray();

        $donors = User::role('Donor')->get()->map(fn($donor) => [
            'label' => $donor->name,
            'value' => $donor->id,
        ])->toArray();

        $beneficiaries = User::role('Beneficiary')->get()->map(fn($beneficiary) => [
            'label' => $beneficiary->name,
            'value' => $beneficiary->id,
        ])->toArray();

        $PaymentStatus = [
            ["label" => "Waiting", "value" => "Waiting"],
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Rejected", "value" => "Rejected"],
            ["label" => "Partially Paid", "value" => "Partially Paid"],
            ["label" => "Paid", "value" => "Paid"],
        ];

        $OptionPayments = [
            ["label" => "Create Payment", "value" => "Create Payment"],
            ["label" => "Donor Deposit", "value" => "DepositDonor"],
        ];

        return Inertia::render('Payment/Create', [
            'donors' => $donors,
            'beneficiaries' => $beneficiaries,
            'PaymentStatus' => $PaymentStatus,
            'beneficiaryProgram' => $beneficiaryProgram,
            'OptionPayments' => $OptionPayments,
            'beneficiaryRecord' => $beneficiaryRecord,
            'bid' => $bid,
            'pid' => $pid,
            'did' => $did,
        ]);
    }

    public function store(StorePaymentRequest $request)
    {
        $data = $request->all();
        // File upload handling
        if ($request->hasFile('payment_slip')) {
            $file = $request->file('payment_slip');
            $filePath = $file->store('payments', 'public');
            $data['payment_slip'] = $filePath;
        }

        if ($data['payment_option'] === 'DepositDonor') {
            // Donor deposit logic
            $lastPayment = DB::table('donor_payments')
                ->where('did', $data['did'])
                ->orderBy('id', 'desc')
                ->first();

            $previousTotal = $lastPayment ? $lastPayment->total_paid : 0;
            $newTotalPaid = $previousTotal + $data['total_paid'];

            DB::table('donor_payments')->insert([
                'did' => $data['did'],
                'total_paid' => $newTotalPaid,
                'payment_slip' => $data['payment_slip'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } else {
            // Check donor's last total paid amount
            $lastPayment = DB::table('donor_payments')
                ->where('did', $data['did'])
                ->orderBy('id', 'desc')
                ->first();

            $donorBalance = $lastPayment ? $lastPayment->total_paid : 0;

            if ($donorBalance < $data['amount_paid']) {
                return redirect()->back()->with([
                    'error' => 'Insufficient funds! The donor does not have enough balance for this payment.'
                ]);
            }

            // Deduct balance only if status is 'Approved'
            if ($data['status'] === 'Approved') {
                $newBalance = $donorBalance - $data['amount_paid'];

                DB::table('donor_payments')
                    ->where('did', $data['did'])
                    ->update(['total_paid' => $newBalance]);
            }

            // Save payment
            $data['created_by'] = Auth::id();
            $data['date'] = Carbon::now()->format('Y-m-d');

            Payment::create($data);
        }

        return redirect()->route('payments.index')->with([
            'message' => 'Payment processed successfully!'
        ]);
    }
    public function DonorDeposite()
    {
        $donorDeposite = DB::table('donor_payments')
            ->join('users', 'donor_payments.did', '=', 'users.id')->select('donor_payments.*', 'users.name as donor_name')->paginate(10);
        return Inertia::render('Payment/DonorDeposite', compact('donorDeposite'));
    }

    public function edit(Payment $payment)
    {
        $beneficiaryProgram = Beneficiary::where('uid', $payment->bid)
            ->with('program')
            ->get()
            ->map(fn($beneficiary) => $beneficiary->program ? [
                'label' => $beneficiary->program->name,
                'value' => $beneficiary->program->id,
            ] : null)
            ->filter()
            ->unique('value')
            ->values()
            ->toArray();
        $donors = User::role('Donor')->get()->map(fn($donor) => [
            'label' => $donor->name,
            'value' => $donor->id,
        ])->toArray();
        $beneficiaries = User::role('Beneficiary')->get()->map(fn($beneficiary) => [
            'label' => $beneficiary->name,
            'value' => $beneficiary->id,
        ])->toArray();
        $PaymentStatus = [
            ["label" => "Waiting", "value" => "Waiting"],
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Rejected", "value" => "Rejected"],
            ["label" => "Partially Paid", "value" => "Partially Paid"],
            ["label" => "Paid", "value" => "Paid"],
        ];
        $OptionPayments = [
            ["label" => "Create Payment", "value" => "Create Payment"],
            ["label" => "Donor Deposit", "value" => "DepositDonor"],
        ];
        $beneficiaryRecord = Beneficiary::where('uid', $payment->bid)
            ->where('pid', $payment->pid)
            ->select('total_fee', 'approved_amount')
            ->first();
        return Inertia::render(
            'Payment/Edit',
            compact(
                'payment',
                'donors',
                'beneficiaries',
                'PaymentStatus',
                'beneficiaryProgram',
                'OptionPayments',
                'beneficiaryRecord'
            )
        );
    }
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        $data = $request->all();

        if ($data['status'] === 'Approved') {
            $lastPayment = DB::table('donor_payments')
                ->where('did', $data['did'])
                ->orderBy('id', 'desc')
                ->first();

            if ($lastPayment) {
                $previousTotal = $lastPayment->total_paid ?? 0;

                if ($previousTotal < $data['amount_paid']) {
                    return redirect()->back()->with([
                        'error' => 'Insufficient funds! The donor does not have enough balance for this payment.'
                    ]);
                }

                $newTotalPaid = $previousTotal - $data['amount_paid'];
                DB::table('donor_payments')
                    ->where('id', $lastPayment->id)
                    ->update(['total_paid' => $newTotalPaid]);
            } else {
                return redirect()->back()->with([
                    'error' => 'No previous payment found for this donor.'
                ]);
            }

            $payment->update($data);

            return redirect()->route('payments.index')->with([
                'message' => 'Payment updated successfully!'
            ]);
        }

        $data['approved_by'] = ($data['status'] === 'Paid') ? Auth::user()->id : null;

        if ($request->hasFile('payment_slip')) {
            $filePath = $request->file('payment_slip')->store('payments', 'public');
            $data['payment_slip'] = 'storage/' . $filePath;
        }

        $payment->update($data);

        return redirect()->route('payments.index')->with([
            'message' => 'Payment updated successfully!'
        ]);
    }

    public function show(Payment $payment)
    {
        return Inertia::render('Payment/Show', compact('payment'));
    }
    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->route('payments.index')->with([
            'message' => 'Payment deleted successfully!'
        ]);
    }
    public function PaymentUploadImage(Request $request)
    {
        $request->validate([
            'payment_slip' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'payment_id' => 'required|exists:payments,id'
        ]);
        $payment = Payment::findOrFail($request->payment_id);

        $path = $request->file('payment_slip')->store('payments', 'public');
        $payment->payment_slip = $path;
        $payment->save();

        return back()->with('success', 'Image uploaded successfully.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDonorRequest;
use App\Http\Requests\UpdateDonorRequest;
use App\Models\Beneficiary;
use App\Models\Donor;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DonorController extends Controller
{
    public function index()
    {
        $donors = Donor::paginate(10);
        return Inertia::render('Donor/Index', compact('donors'));
    }
    public function create()
    {
        return Inertia::render('Donor/Create');
    }
    public function store(StoreDonorRequest $request)
    {
        $data = $request->all();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $user->assignRole($request->role);

        $data['uid'] = $user->id;
        Donor::create($data);
        return redirect()->route('donors.index')->with([
            'message' => 'Donor created successfully!'
        ]);
    }
    public function edit(Donor $donor)
    {
        return Inertia::render('Donor/Edit', compact('donor'));
    }
    public function update(UpdateDonorRequest $request, Donor $donor)
    {
        $donor->update($request->all());
        return redirect()->route('donors.index')->with([
            'message' => 'Donor updated successfully!'
        ]);
    }
    public function destroy(Donor $donor)
    {
        $donor->delete();
        return redirect()->route('donors.index')->with([
            'message' => 'Donor deleted successfully!'
        ]);
    }
    public function Show(Donor $donor)
    {
        $donorData = $donor;
        // Total donated amount from the Donor model
        $AmountPaid = $donor->load('payments')->payments->sum('amount_paid');

        // Monthly Amount - Payments for the current month
        $MonthlyAmount = DB::table('donor_payments')->where('did', $donorData->uid)->whereMonth('created_at', now()->month)->sum('total_paid');

        // Yearly Amount - Payments for the current year
        $YearlyAmount = DB::table('donor_payments')
            ->where('did', $donorData->uid)
            ->whereYear('created_at', now()->year)  // Filtering current year
            ->sum('total_paid');
        $LastRecordAmount = DB::table('donor_payments')
            ->where('did', $donorData->uid)
            ->latest('created_at')  // Fetch the latest record based on 'created_at' column
            ->first();  // Get the first record (which will be the latest one)

        $LastAmountPaid = $LastRecordAmount ? $LastRecordAmount->total_paid : 0;

        $TotalDonateAmount =  $YearlyAmount = DB::table('donor_payments')->where('did', $donorData->uid)->sum('total_paid');
        $beneficiaries = Beneficiary::with('program')->where('did', $donorData->uid)->paginate(10);
        $payments = Payment::with(['program', 'beneficiary.beneficiaries'])->where('did', $donorData->uid)->paginate(10);
        $PaymentStatus = [
            ["label" => "Waiting", "value" => "Waiting"],
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Rejected", "value" => "Rejected"],
            ["label" => "Partially Paid", "value" => "Partially Paid"],
            ["label" => "Paid", "value" => "Paid"],
        ];
        return Inertia::render('Donor/Show', [
            'donorData' => $donorData,
            'beneficiaries' => $beneficiaries,
            'beneficiaries' => $beneficiaries,
            'payments' => $payments,
            'paymentStatus' => $PaymentStatus,
            'TotalDonateAmount' => $TotalDonateAmount,
            'MonthlyAmount' => $MonthlyAmount,
            'YearlyAmount' => $YearlyAmount,
            'LastAmountPaid' => $LastAmountPaid,
            'AmountPaid' => $AmountPaid,
        ]);
    }
}

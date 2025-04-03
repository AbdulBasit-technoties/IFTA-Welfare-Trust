<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Models\Donor;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonorController extends Controller
{
    public function Show($id)
    {
        $donorData = User::with('donor', 'payments')->find($id);
        $beneficiaries = Beneficiary::with('program')->where('did', $id)->paginate(10);
        $payments = Payment::with(['program', 'beneficiary.beneficiaries'])->where('did', $id)->paginate(10);
        $PaymentStatus = [
            ["label" => "Waiting", "value" => "Waiting"],
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Rejected", "value" => "Rejected"],
            ["label" => "Partially Paid", "value" => "Partially Paid"],
            ["label" => "Paid", "value" => "Paid"],
        ];
        // dd($payments);
        return Inertia::render('Donor/Show', [
            'donorData' => $donorData,
            'beneficiaries' => $beneficiaries,
            'payments' => $payments,
            'paymentStatus' => $PaymentStatus,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeneficiaryController extends Controller
{
    public function Show($id)
    {
        $beneficiaryData = User::with('beneficiaries','payments')->find($id);
        $beneficiaries = Beneficiary::with('program')->where('uid', $id)->paginate(10);
        $payments = Payment::with(['program', 'beneficiary.beneficiaries'])->where('bid', $id)->paginate(10);
        $paymentStatus = [
            ["label" => "Waiting", "value" => "Waiting"],
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Rejected", "value" => "Rejected"],
            ["label" => "Partially Paid", "value" => "Partially Paid"],
            ["label" => "Paid", "value" => "Paid"],
        ];
        return Inertia::render('Beneficiary/Show',
            compact('beneficiaryData', 'beneficiaries', 'payments', 'paymentStatus'));
    }
    public function uploadImage(Request $request)
    {
        $request->validate([
            'photo_attached' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'beneficiary_id' => 'required|exists:beneficiaries,id'
        ]);

        $beneficiary = Beneficiary::findOrFail($request->beneficiary_id);

        $path = $request->file('photo_attached')->store('Beneficiary', 'public');

        $beneficiary->photo_attached = $path;
        $beneficiary->save();

        return back()->with('success', 'Image uploaded successfully.');
    }
}

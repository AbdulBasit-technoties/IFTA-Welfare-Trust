<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDonorRequest;
use App\Models\Donor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DonorController extends Controller
{
    public function Index()
    {
        $donor = User::role('Donor')->with(['roles', 'donor'])->paginate(10);
        return Inertia::render('Donor/Index', compact('donor'));
    }
    public function Create()
    {
        $PaymentMethod = [
            ["label" => "Bank Transfer", "value" => "Bank Transfer"],
            ["label" => "Credit Card", "value" => "Credit Card"],
            ["label" => "Cheque", "value" => "Cheque"],
            ["label" => "Cash", "value" => "Cash"],
            ["label" => "Other", "value" => "Other"],
        ];
        $Donationfrequency = [
            ["label" => "One-time", "value" => "One-time"],
            ["label" => "Monthly", "value" => "Monthly"],
            ["label" => "Yearly", "value" => "Yearly"],
        ];
        return Inertia::render('Donor/Create', compact('PaymentMethod', 'Donationfrequency'));
    }
    public function store(StoreDonorRequest $request)
    {
        $user = User::create([
            'name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $donor = new Donor($request->validated());
        $donor->uid = $user->id; 
        $donor->save();

        $user->assignRole('Donor');
        return redirect()->route('donors.index')->with([
            'message' => 'Donor created successfully!'
        ]);
    }
    public function Edit($id)
    {
        $PaymentMethod = [
            ["label" => "Bank Transfer", "value" => "Bank Transfer"],
            ["label" => "Credit Card", "value" => "Credit Card"],
            ["label" => "Cheque", "value" => "Cheque"],
            ["label" => "Cash", "value" => "Cash"],
            ["label" => "Other", "value" => "Other"],
        ];
        $Donationfrequency = [
            ["label" => "One-time", "value" => "One-time"],
            ["label" => "Monthly", "value" => "Monthly"],
            ["label" => "Yearly", "value" => "Yearly"],
        ];
        $donor = Donor::findOrFail($id);
        return Inertia::render('Donor/Edit', compact('donor', 'PaymentMethod', 'Donationfrequency'));
    }

    public function Show($id)
    {
        $donor = Donor::findOrFail($id);
        return redirect()->back();
    }
    public function Update(Request $request, $id)
    {
        Donor::where('id', $id)->update($request->all());
        return redirect()->route('donors.index')->with([
            'message' => 'Donor updated successfully!'
        ]);
    }
    public function Destroy($id)
    {
        Donor::destroy($id);
        return redirect()->route('donors.index')->with([
            'message' => 'Donor deleted successfully!'
        ]);
    }
}

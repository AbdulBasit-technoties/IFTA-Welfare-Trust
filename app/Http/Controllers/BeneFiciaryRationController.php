<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeneficiaryRation;
use App\Http\Requests\UpdateBeneficiaryRation;
use App\Models\Beneficiary;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeneFiciaryRationController extends Controller
{
    public function index(){
        $beneficiaries = Beneficiary::where('type', 'Monthly Ration')->paginate(10);
        return Inertia::render('BeneficiaryRation/Index', compact('beneficiaries'));
    }
    public function create(Request $request)
    {
        $uid = (string) $request->input('uid');
        $beneficiaryData = Beneficiary::where('uid', $uid)
            ->where('type', 'Monthly Ration')
            ->first();

        $MaritalStatus = [
            ["label" => "Single", "value" => "Single"],
            ["label" => "Married", "value" => "Married"],
            ["label" => "Divorced", "value" => "Divorced"],
            ["label" => "Widowed", "value" => "Widowed"],
        ];
        $patientGender = [
            ["label" => "Male", "value" => "Male"],
            ["label" => "Female", "value" => "Female"],
            ["label" => "Other", "value" => "Other"],
        ];
        $beneficiaries = User::role('Beneficiary')->get()->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->name,
                'value' => $beneficiary->id,
            ];
        })->toArray();
        $donors = User::role('Donor')->get()->map(function ($donor) {
            return [
                'label' => $donor->name,
                'value' => $donor->id,
            ];
        })->toArray();
        return Inertia::render('BeneficiaryRation/Create', compact('MaritalStatus', 'patientGender', 'beneficiaries', 'beneficiaryData','donors'));
    }
    public function store(StoreBeneficiaryRation $request)
    {
        Beneficiary::create($request->all());
        return redirect()->route('beneficiarys-rations.index')->with([
            'message' => 'Beneficiary created successfully!'
        ]);
    }
    public function edit(Beneficiary $beneficiarys_ration)
    {
        $MaritalStatus = [
            ["label" => "Single", "value" => "Single"],
            ["label" => "Married", "value" => "Married"],
            ["label" => "Divorced", "value" => "Divorced"],
            ["label" => "Widowed", "value" => "Widowed"],
        ];
        $patientGender = [
            ["label" => "Male", "value" => "Male"],
            ["label" => "Female", "value" => "Female"],
            ["label" => "Other", "value" => "Other"],
        ];
        $beneficiaries = User::role('Beneficiary')->get()->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->name,
                'value' => $beneficiary->id,
            ];
        })->toArray();
        $donors = User::role('Donor')->get()->map(function ($donor) {
            return [
                'label' => $donor->name,
                'value' => $donor->id,
            ];
        })->toArray();
        return Inertia::render('BeneficiaryRation/Edit', compact('beneficiarys_ration', 'MaritalStatus', 'patientGender', 'beneficiaries','donors'));
    }
    public function Update(UpdateBeneficiaryRation $request,Beneficiary $beneficiarys_ration)
    {
        $beneficiarys_ration->update($request->all());
        return redirect()->route('beneficiarys-rations.index')->with([
           'message' => 'Beneficiary updated successfully!'
        ]);
    }
    public function Destroy(Beneficiary $beneficiarys_ration)
    {
        $beneficiarys_ration->delete();
        return redirect()->route('beneficiarys-rations.index')->with([
           'message' => 'Beneficiary deleted successfully!'
        ]);
    }
}

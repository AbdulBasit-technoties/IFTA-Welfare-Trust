<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeneficiarySchoolRequest;
use App\Http\Requests\UpdateBeneficiarySchoolRequest;
use App\Models\Beneficiary;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class BeneficiarySchoolController extends Controller
{
    public function Index()
    {
        $beneficiaries = Beneficiary::where('type', 'School Fees')->paginate(10);
        return Inertia::render('BeneficiarySchool/Index', compact('beneficiaries'));
    }

    public function Create(Request $request)
    {
        $uid = (string) $request->input('uid');
        $beneficiaryData = Beneficiary::where('uid', $uid)
            ->where('type', 'School Fees')
            ->first();

        $institutions = Institution::get()->map(function ($institution) {
            return [
                'label' => $institution->name,
                'value' => $institution->id,
                'contact_no' => $institution->contact_no,
            ];
        })->toArray();
        $level = [
            ["label" => "Junior", "value" => "Junior"],
            ["label" => "Primary", "value" => "Primary"],
            ["label" => "Secondary", "value" => "Secondary"],
            ["label" => "Intermediate", "value" => "Intermediate"],
            ["label" => "Graduate", "value" => "Graduate"],
            ["label" => "Postgraduate", "value" => "Postgraduate"],
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
        return Inertia::render('BeneficiarySchool/Create', compact('level', 'beneficiaries', 'beneficiaryData','donors','institutions'));
    }
    public function Edit(Beneficiary $beneficiarys_school)
    {
        $level = [
            ["label" => "Junior", "value" => "Junior"],
            ["label" => "Primary", "value" => "Primary"],
            ["label" => "Secondary", "value" => "Secondary"],
            ["label" => "Intermediate", "value" => "Intermediate"],
        ];
        $donors = User::role('Donor')->get()->map(function ($donor) {
            return [
                'label' => $donor->name,
                'value' => $donor->id,
            ];
        })->toArray();
        $institutions = Institution::get()->map(function ($institution) {
            return [
                'label' => $institution->name,
                'value' => $institution->id,
                'contact_no' => $institution->contact_no,
            ];
        })->toArray();
        return Inertia::render('BeneficiarySchool/Edit', compact('beneficiarys_school', 'level','donors','institutions'));
    }
    public function Store(StoreBeneficiarySchoolRequest $request)
    {
        Beneficiary::create($request->all());
        return redirect()->route('beneficiarys-schools.index')->with([
            'message' => 'Beneficiary created successfully!'
        ]);
    }
    public function Update(UpdateBeneficiarySchoolRequest $request, Beneficiary $beneficiarys_school)
    {
        $beneficiarys_school->update($request->all());

        return redirect()->route('beneficiarys-schools.index')->with([
            'message' => 'Beneficiary updated successfully!'
        ]);
    }
    public function Show(Beneficiary $beneficiarys_school)
    {
        return redirect()->back();
    }


    public function Destroy(Beneficiary $beneficiarys_school)
    {
        $beneficiarys_school->delete();
        return redirect()->route('beneficiarys-schools.index')->with([
            'message' => 'Beneficiary deleted successfully!'
        ]);
    }
}

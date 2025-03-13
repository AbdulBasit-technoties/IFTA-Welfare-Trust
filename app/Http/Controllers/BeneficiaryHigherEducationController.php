<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeneficiaryHigherEducation;
use App\Http\Requests\UpdateBeneficiaryHigherEducation;
use App\Models\Beneficiary;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeneficiaryHigherEducationController extends Controller
{
    public function Index()
    {
        $beneficiaries = Beneficiary::where('type', 'Higher Education')->paginate(10);
        return Inertia::render('BeneficiaryHigherEducation/Index', compact('beneficiaries'));
    }

    public function Create(Request $request)
    {
        $uid = (string) $request->input('uid');
        $beneficiaryData = Beneficiary::where('uid', $uid)
            ->where('type', 'Higher Education')
            ->first();

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
        $institutions = Institution::get()->map(function ($institution) {
            return [
                'label' => $institution->name,
                'value' => $institution->id,
                'contact_no' => $institution->contact_no,
            ];
        })->toArray();
        return Inertia::render('BeneficiaryHigherEducation/Create', compact('level', 'beneficiaries', 'beneficiaryData', 'donors','institutions'));
    }
    public function Edit(Beneficiary $beneficiarys_education)
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
        return Inertia::render('BeneficiaryHigherEducation/Edit', compact('beneficiarys_education', 'level', 'donors','institutions'));
    }
    public function Show(Beneficiary $beneficiarys_education)
    {
        return redirect()->back();
    }
    public function Store(Request $request, StoreBeneficiaryHigherEducation $StoreBeneficiaryHigherEducation)
    {
        Beneficiary::create($request->all());
        return redirect()->route('beneficiarys-educations.index')->with([
            'message' => 'Beneficiary created successfully!'
        ]);
    }
    public function Update(UpdateBeneficiaryHigherEducation $request, Beneficiary $beneficiarys_education)
    {
        $beneficiarys_education->update($request->all());
        return redirect()->route('beneficiarys-educations.index')->with([
            'message' => 'Beneficiary updated successfully!'
        ]);
    }
    public function Destroy(Beneficiary $beneficiarys_education)
    {
        $beneficiarys_education->delete();
        return redirect()->route('beneficiarys-educations.index')->with([
            'message' => 'Beneficiary deleted successfully!'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Http\Requests\StoreBeneficiaryPatientRequest;
use App\Http\Requests\UpdateBeneficiaryPatientRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeneficiaryPatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $beneficiaries = Beneficiary::where('type', 'Patient Welfare')->paginate(10);
        return Inertia::render('BeneficiaryPatient/Index', compact('beneficiaries'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $uid = (string) $request->input('uid');
        $beneficiaryData = Beneficiary::where('uid', $uid)
            ->where('type', 'Patient Welfare')
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
        $type = [
            ["label" => "OPD", "value" => "OPD"],
            ["label" => "IPD", "value" => "IPD"],
            ["label" => "Surgery", "value" => "Surgery"],
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
        return Inertia::render('BeneficiaryPatient/Create', compact('MaritalStatus', 'patientGender', 'type', 'beneficiaries', 'beneficiaryData','donors'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBeneficiaryPatientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBeneficiaryPatientRequest $request)
    {
        Beneficiary::create($request->all());
        return redirect()->route('beneficiarys-patients.index')->with([
            'message' => 'Beneficiary created successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BeneficiaryPatient  $beneficiaryPatient
     * @return \Illuminate\Http\Response
     */
    public function show(Beneficiary $beneficiarys_patient)
    {
        return redirect()->back();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BeneficiaryPatient  $beneficiaryPatient
     * @return \Illuminate\Http\Response
     */
    public function edit(Beneficiary $beneficiarys_patient)
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
        $type = [
            ["label" => "OPD", "value" => "OPD"],
            ["label" => "IPD", "value" => "IPD"],
            ["label" => "Surgery", "value" => "Surgery"],
            ["label" => "Other", "value" => "Other"],
        ];
        $donors = User::role('Donor')->get()->map(function ($donor) {
            return [
                'label' => $donor->name,
                'value' => $donor->id,
            ];
        })->toArray();
        return Inertia::render('BeneficiaryPatient/Edit', compact('beneficiarys_patient', 'MaritalStatus', 'patientGender', 'type','donors'));
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBeneficiaryPatientRequest  $request
     * @param  \App\Models\BeneficiaryPatient  $beneficiaryPatient
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBeneficiaryPatientRequest $request, Beneficiary $beneficiarys_patient)
    {
        $beneficiarys_patient->update($request->all());
        return redirect()->route('beneficiarys-patients.index')->with([
            'message' => 'Beneficiary updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BeneficiaryPatient  $beneficiaryPatient
     * @return \Illuminate\Http\Response
     */
    public function destroy(Beneficiary $beneficiarys_patient)
    {
        $beneficiarys_patient->delete();
        return redirect()->route('beneficiarys-patients.index')->with([
            'message' => 'Beneficiary deleted successfully!'
        ]);
    }
}

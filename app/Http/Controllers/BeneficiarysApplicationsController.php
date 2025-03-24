<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeneficiaryApplicationRequest;
use App\Http\Requests\StoreBeneficiaryRequest;
use App\Http\Requests\UpdateBeneficiaryApplicationRequest;
use App\Models\Beneficiary;
use App\Models\Institution;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeneficiarysApplicationsController extends Controller
{
    public function Index(Request $request)
    {
        $status = $request->input('status', 'All');
        $programIds = $request->input('program', []);

        $query = Beneficiary::with('program');

        if ($status !== 'All') {
            $query->where('status', $status);
        }

        if (!empty($programIds) && !in_array("All", $programIds)) {
            $query->whereIn('pid', $programIds);
        }

        $beneficiaries = $query->paginate(10);

        $programs = Program::get()->map(function ($program) {
            return [
                'label' => $program->name,
                'value' => (string) $program->id,
            ];
        })->toArray();

        $statuses = [
            ["label" => "All", "value" => "All"],
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Pending Approval", "value" => "Pending Approval"],
            ["label" => "Cancelled", "value" => "Cancelled"],
        ];

        return Inertia::render('BeneficiarysApplications/Index', compact('beneficiaries', 'statuses', 'status', 'programs', 'programIds'));
    }





    public function create(Request $request)
    {
        $uid = $request->input('uid');
        $pid = $request->input('pid');
        $education_type = $request->input('education_type');
        $programSlug = Program::where('id', $pid)->value('slug');
        if ($uid && $pid) {
            // $beneficiaryData = Beneficiary::where('uid', $uid)
            //     ->where('pid', $pid)
            //     ->first();
            return redirect()->back()->with([
                'error' => 'This beneficiary already exists for the given program.'
            ]);
        }
        if (empty($beneficiaryData)) {
            $beneficiaryData = Beneficiary::where('uid', $uid)->select([
                'beneficiary_name',
                'guardian_name',
                'beneficiary_cnic',
                'guardian_cnic',
                'address',
                'beneficiary_contact_no',
                'guardian_contact_no',
                'email',
                'photo_attached',
                'occupation',
                'household_income',
                'syed',
                'date_of_birth',
                'orphan',
                'family_members',
                'sign',
                'marital_status',
                'gender',
                'description',
                'disability',
                'uid'
            ])->first();
        }

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
        $institutions = Institution::where('type', $education_type)->get()->map(function ($institution) {
            return [
                'label' => $institution->name,
                'value' => $institution->id,
                'contact_no' => $institution->contact_no,
                'fees_time' => $institution->fees_time,
            ];
        })->toArray();
        $programs = Program::get()->map(function ($programs) {
            return [
                'label' => $programs->name,
                'value' => $programs->id,
            ];
        })->toArray();
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
        $TypeOptions = [
            ["label" => "School", "value" => "school"],
            ["label" => "College", "value" => "college"],
            ["label" => "University", "value" => "university"],
            ["label" => "Course", "value" => "course"],
            ["label" => "Postgraduate", "value" => "postgraduate"],
        ];
        return Inertia::render('BeneficiarysApplications/Create', compact('beneficiaries', 'TypeOptions', 'beneficiaryData', 'donors', 'institutions', 'programs', 'MaritalStatus', 'patientGender', 'programSlug'));
    }
    public function store(StoreBeneficiaryApplicationRequest $request)
    {
        $existingBeneficiary = Beneficiary::where('uid', $request->uid)
            ->where('pid', $request->pid)
            ->first();

        if ($existingBeneficiary) {
            return redirect()->back()->with([
                'error' => 'This beneficiary already exists for the given program.',
            ]);
        }
        $beneficiary = Beneficiary::where('uid', $request->uid)
            ->whereNull('pid')
            ->first();
        if ($request->hasFile('photo_attached')) {
            $logoPath = $request->file('photo_attached')->store('Beneficiary', 'public');
            $requestData = $request->all();
            $requestData['photo_attached'] = $logoPath;
        } else {
            $requestData = $request->all();
        }

        if ($beneficiary) {
            $beneficiary->update($requestData);
        } else {
            Beneficiary::create($requestData);
        }

        return redirect()->route('beneficiarys-applications.index')->with([
            'message' => 'Beneficiary created successfully!'
        ]);
    }
    public function edit($id)
    {
        $beneficiary = Beneficiary::with('institute')->find($id);

        $programSlug = Program::where('id', $beneficiary->pid)->value('slug');

        $donors = User::role('Donor')->get()->map(fn($donor) => [
            'label' => $donor->name,
            'value' => $donor->id,
        ])->toArray();

        $institutions = Institution::get()->map(fn($institution) => [
            'label' => $institution->name,
            'value' => $institution->id,
            'contact_no' => $institution->contact_no,
            'fees_time' => $institution->fees_time,
            'education_type' => $institution->education_type,
        ])->toArray();

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

        return Inertia::render('BeneficiarysApplications/Edit', compact(
            'beneficiary',
            'donors',
            'institutions',
            'programSlug',
            'MaritalStatus',
            'patientGender',
        ));
    }
    public function Show()
    {
        return redirect()->back();
    }
    public function update(UpdateBeneficiaryApplicationRequest $request, $id)
    {
        $beneficiary = Beneficiary::find($id);
        $beneficiary->update($request->all());
        return redirect()->route('beneficiarys-applications.index')->with([
            'message' => 'Beneficiary updated successfully!'
        ]);
    }
    public function destroy($id)
    {
        Beneficiary::destroy($id);
        return redirect()->route('beneficiarys-applications.index')->with([
            'message' => 'Beneficiary deleted successfully!'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeneficiaryRequest;
use App\Http\Requests\UpdateBeneficiaryRequest;
use App\Models\Beneficiary;
use App\Models\BeneficiaryPerformance;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BeneficiaryController extends Controller
{
    public function index()
    {
        $beneficiaries = Beneficiary::with('program')->paginate(10);
        return Inertia::render('Beneficiary/Index', compact('beneficiaries'));
    }
    public function create()
    {
        $beneficiaries = User::role('Beneficiary')->get()->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->name,
                'value' => $beneficiary->id,
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
        return Inertia::render('Beneficiary/Create', compact('beneficiaries', 'MaritalStatus', 'patientGender', 'MaritalStatus', 'patientGender'));
    }
    public function store(StoreBeneficiaryRequest $request)
    {
        $data = $request->all();

        $user = User::create([
            'name' => $data['beneficiary_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        if ($request->hasFile('photo_attached')) {
            $logoPath = $request->file('photo_attached')->store('Beneficiary', 'public');
            $data['photo_attached'] = $logoPath;
        }

        $data['uid'] = $user->id;

        $beneficiary = Beneficiary::create($data);

        $user->assignRole($request->role);

        if ($request->has('uid') && !empty($request->uid)) {
            $this->createFamilyRelation($user->id, $request->uid);
        }

        return redirect()->route('beneficiaries.index')->with(['message' => 'Beneficiary created successfully!']);
    }
    private function createFamilyRelation($userId, $relatedUserIds)
    {
        $relatedUserIds = (array) $relatedUserIds;

        foreach ($relatedUserIds as $relatedUserId) {
            if ($userId == $relatedUserId) {
                continue;
            }

            if (!DB::table('beneficiaryfamily')->where([
                ['user_id', $userId],
                ['related_user_id', $relatedUserId]
            ])->exists()) {
                DB::table('beneficiaryfamily')->insert([
                    'user_id' => $userId,
                    'related_user_id' => $relatedUserId
                ]);
            }
            if (!DB::table('beneficiaryfamily')->where([
                ['user_id', $relatedUserId],
                ['related_user_id', $userId]
            ])->exists()) {
                DB::table('beneficiaryfamily')->insert([
                    'user_id' => $relatedUserId,
                    'related_user_id' => $userId
                ]);
            }
            $familiesId = DB::table('beneficiaryfamily')->where('user_id', $relatedUserId)->get();

            foreach ($familiesId as $family) {
                if ($family->user_id != $userId && !DB::table('beneficiaryfamily')->where([
                    ['user_id', $family->user_id],
                    ['related_user_id', $userId]
                ])->exists()) {
                    DB::table('beneficiaryfamily')->insert([
                        'user_id' => $family->user_id,
                        'related_user_id' => $userId
                    ]);
                }

                if ($family->related_user_id != $userId && !DB::table('beneficiaryfamily')->where([
                    ['user_id', $userId],
                    ['related_user_id', $family->related_user_id]
                ])->exists()) {
                    DB::table('beneficiaryfamily')->insert([
                        'user_id' => $userId,
                        'related_user_id' => $family->related_user_id
                    ]);
                }
            }

            $relatedFamilies = DB::table('beneficiaryfamily')->where('related_user_id', $relatedUserId)->get();
            foreach ($relatedFamilies as $relatedFamily) {
                if ($relatedFamily->user_id != $userId && !DB::table('beneficiaryfamily')->where([
                    ['user_id', $relatedFamily->user_id],
                    ['related_user_id', $userId]
                ])->exists()) {
                    DB::table('beneficiaryfamily')->insert([
                        'user_id' => $relatedFamily->user_id,
                        'related_user_id' => $userId
                    ]);
                }
            }
        }
    }
    public function edit(Beneficiary $beneficiary)
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
        return Inertia::render('Beneficiary/Edit', compact('beneficiary', 'MaritalStatus', 'patientGender'));
    }
    public function update(UpdateBeneficiaryRequest $request, Beneficiary $beneficiary)
    {
        $data = $request->all();
        $beneficiary->update($data);
        return redirect()->route('beneficiaries.index')->with(['message' => 'Beneficiary updated successfully!']);
    }
    public function destroy(Beneficiary $beneficiary)
    {
        $beneficiary->delete();
        return redirect()->route('beneficiaries.index')->with(['message' => 'Beneficiary deleted successfully!']);
    }
    public function Show(Beneficiary $beneficiary)
    {
        $beneficiaryData = $beneficiary;
        $payments = Payment::with(['program', 'beneficiary.beneficiaries'])->where('bid', $beneficiary->uid)->paginate(10);
        $MonthAmount = Payment::where('bid', $beneficiary->uid)
            ->whereMonth('date', now()->month)
            ->sum('amount_paid');

        $YearlyAmount = Payment::where('bid', $beneficiary->uid)
            ->whereYear('date', now()->year)
            ->sum('amount_paid');

        $totalAmount = Payment::where('bid', $beneficiary->uid)
            ->sum('amount_paid');
        $performanceData = BeneficiaryPerformance::with('institute', 'user')->where('uid', $beneficiaryData->uid)->paginate(10);

        $beneficiaries = Beneficiary::with('program', 'donor', 'institute')->where('uid', $beneficiary->uid)->paginate(10);
        $paymentStatus = [
            ["label" => "Waiting", "value" => "Waiting"],
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Rejected", "value" => "Rejected"],
            ["label" => "Partially Paid", "value" => "Partially Paid"],
            ["label" => "Paid", "value" => "Paid"],
        ];
        $statuses = [
            ["label" => "Request", "value" => "Request"],
            ["label" => "Approved", "value" => "Approved"],
            ["label" => "Pending Approval", "value" => "Pending Approval"],
            ["label" => "Cancelled", "value" => "Cancelled"],
        ];
        $performance = [
            ["label" => "Excellent", "value" => "Excellent"],
            ["label" => "Good", "value" => "Good"],
            ["label" => "Average", "value" => "Average"],
            ["label" => "Below Average", "value" => "Below Average"],
            ["label" => "Poor", "value" => "Poor"],
        ];
        $beneficiaryInstitute = Beneficiary::where('uid', $beneficiary->uid)
            ->whereHas('program', function ($query) {
                $query->whereIn('slug', ['schools', 'higher-educations']);
            })
            ->with('institute')
            ->get();
        $institute = $beneficiaryInstitute->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->institute ? $beneficiary->institute->name : null,
                'value' => $beneficiary->id,
            ];
        })->toArray();
        return Inertia::render(
            'Beneficiary/Show',
            compact('beneficiaryData', 'payments', 'paymentStatus', 'statuses', 'performance', 'beneficiaries','institute', 'MonthAmount', 'totalAmount', 'YearlyAmount', 'performanceData')
        );
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

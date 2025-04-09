<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeneficiaryPerformanceRequest;
use App\Http\Requests\UpdateBeneficiaryPerformanceRequest;
use App\Models\Beneficiary;
use App\Models\BeneficiaryPerformance;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeneficiaryPerformanceController extends Controller
{
    public function index()
    {
        $performances = BeneficiaryPerformance::with('beneficiary', 'institute')->paginate(10);
        return Inertia::render('Performance/Index', compact('performances'));
    }
    public function create(Request $request)
    {
        $beneficiaries = User::role('Beneficiary')->get()->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->name,
                'value' => $beneficiary->id,
            ];
        })->toArray();
        $beneficiaryData = Beneficiary::where('uid', $request->uid)
            ->whereHas('program', function ($query) {
                $query->whereIn('slug', ['schools', 'higher-educations']);
            })
            ->with('institute')
            ->get();
        $performance = [
            ["label" => "Excellent", "value" => "Excellent"],
            ["label" => "Good", "value" => "Good"],
            ["label" => "Average", "value" => "Average"],
            ["label" => "Below Average", "value" => "Below Average"],
            ["label" => "Poor", "value" => "Poor"],
        ];
        $institute = $beneficiaryData->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->institute ? $beneficiary->institute->name : null,
                'value' => $beneficiary->id,
            ];
        })->toArray();
        return Inertia::render('Performance/Create', compact('institute', 'beneficiaries', 'performance'));
    }

    public function Store(StoreBeneficiaryPerformanceRequest $request)
    {
        $data = $request->all();
        if ($request->hasFile('performance_photo')) {
            $filePath = $request->file('performance_photo')->store('performance_photos', 'public');
            $data['performance_photo'] = '/storage/' . $filePath;
        }

        BeneficiaryPerformance::create($data);

        return redirect()->route('beneficiary-performances.index')->with([
            'message' => 'Performance saved successfully.'
        ]);
    }
    public function show(BeneficiaryPerformance $performance)
    {
        return Inertia::render('Performance/Show', compact('performance'));
    }
    public function edit($id)
    {
        $beneficiaries = User::role('Beneficiary')->get()->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->name,
                'value' => $beneficiary->id,
            ];
        })->toArray();
        $performance = [
            ["label" => "Excellent", "value" => "Excellent"],
            ["label" => "Good", "value" => "Good"],
            ["label" => "Average", "value" => "Average"],
            ["label" => "Below Average", "value" => "Below Average"],
            ["label" => "Poor", "value" => "Poor"],
        ];
        $beneficiaryperformance = BeneficiaryPerformance::find($id);
        $beneficiaryData = Beneficiary::where('uid', $beneficiaryperformance->uid)
            ->whereHas('program', function ($query) {
                $query->whereIn('slug', ['schools', 'higher-educations']);
            })
            ->with('institute')
            ->get();
        $institute = $beneficiaryData->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->institute ? $beneficiary->institute->name : null,
                'value' => $beneficiary->id,
            ];
        })->toArray();
        return Inertia::render('Performance/Edit', compact('institute', 'beneficiaries', 'performance', 'beneficiaryperformance'));
    }
    public function update(UpdateBeneficiaryPerformanceRequest $request, $id)
    {
        $performance = BeneficiaryPerformance::find($id);
        $data = $request->all();
        if ($request->hasFile('performance_photo')) {
            $filePath = $request->file('performance_photo')->store('performance_photos', 'public');
            $data['performance_photo'] = '/storage/' . $filePath;
        }
        $performance->update($data);
        return redirect()->route('beneficiary-performances.index')->with([
            'message' => 'Performance updated successfully.'
        ]);
    }
    public function destroy($id)
    {
        BeneficiaryPerformance::destroy($id);
        return redirect()->route('beneficiary-performances.index')->with([
            'message' => 'Performance deleted successfully.'
        ]);
    }
    public function UpdateImg(Request $request)
    {

        $request->validate([
            'performance_photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'performance_id' => 'required|exists:beneficiary_performances,id'
        ]);

        $performance = BeneficiaryPerformance::findOrFail($request->performance_id);

        if ($request->hasFile('performance_photo')) {
            $filePath = $request->file('performance_photo')->store('performance_photos', 'public');

            $performance->update([
                'performance_photo' => '/storage/' . $filePath,
            ]);
        }

        return back()->with('success', 'Image uploaded successfully.');
    }
}

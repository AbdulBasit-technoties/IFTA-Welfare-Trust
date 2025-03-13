<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeneficiaryMarriage;
use App\Http\Requests\UpdateBeneficiaryMarriage;
use App\Models\Beneficiary;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeneficiaryMarriageController extends Controller
{
    public function Index()
    {
        $beneficiaries = Beneficiary::where('type', 'Marriage Support')->paginate(10);
        return Inertia::render('BeneficiaryMarriage/Index', compact('beneficiaries'));
    }
    public function Create(Request $request)
    {
        $uid = (string) $request->input('uid');
        $beneficiaryData = Beneficiary::where('uid', $uid)
            ->where('type', 'Marriage Support')
            ->first();

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
        return Inertia::render('BeneficiaryMarriage/Create', compact('beneficiaries', 'beneficiaryData','donors'));
    }
    public function Store(StoreBeneficiaryMarriage $request){

        Beneficiary::create($request->all());
        return redirect()->route('beneficiarys-marriages.index')->with([
            'message' => 'Beneficiary created successfully!'
        ]);
    }
    public function Show(Beneficiary $beneficiarys_marriage)
    {
        return redirect()->back();
    }
    public function Edit(Beneficiary $beneficiarys_marriage)
    {
        $donors = User::role('Donor')->get()->map(function ($donor) {
            return [
                'label' => $donor->name,
                'value' => $donor->id,
            ];
        })->toArray();
        return Inertia::render('BeneficiaryMarriage/Edit', compact('beneficiarys_marriage','donors'));
    }
    public function Update(UpdateBeneficiaryMarriage $request, Beneficiary $beneficiarys_marriage)
    {
        $beneficiarys_marriage->update($request->all());
        return redirect()->route('beneficiarys-marriages.index')->with([
           'message' => 'Beneficiary updated successfully!'
        ]);
    }
    public function Destroy(Beneficiary $beneficiarys_marriage)
    {
        $beneficiarys_marriage->delete();
        return redirect()->route('beneficiarys-marriages.index')->with([
           'message' => 'Beneficiary deleted successfully!'
        ]);
    }
}

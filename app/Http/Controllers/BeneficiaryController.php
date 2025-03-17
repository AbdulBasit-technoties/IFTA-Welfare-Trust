<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Http\Requests\StoreBeneficiaryRequest;
use App\Http\Requests\UpdateBeneficiaryRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class BeneficiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $beneficiary = User::role('Beneficiary')->with('roles')->paginate(10);
        return Inertia::render('Beneficiary/Index', compact('beneficiary'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $beneficiaries = User::role('Beneficiary')->get()->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->name,
                'value' => $beneficiary->id,
            ];
        })->toArray();
        return Inertia::render('Beneficiary/Create', compact('beneficiaries'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBeneficiaryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBeneficiaryRequest $request)
    {
        $originalUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($request->filled('beneficiary_uid')) {
            $existingBeneficiaryId = $request->beneficiary_uid;
            $newBeneficiaryId = $originalUser->id;

            // ✅ Pehle New Beneficiary ko Existing Beneficiary se link karo
            $this->createFamilyRelation($newBeneficiaryId, $existingBeneficiaryId);
            $this->createFamilyRelation($existingBeneficiaryId, $newBeneficiaryId);

            // ✅ Ab Existing Beneficiary ke saare relatives nikal lo
            $relatedBeneficiaries = DB::table('beneficiaryfamily')
                ->where('user_id', $existingBeneficiaryId)
                ->orWhere('related_user_id', $existingBeneficiaryId)
                ->get();

            foreach ($relatedBeneficiaries as $relation) {
                $relatives = [
                    $relation->user_id,
                    $relation->related_user_id
                ];

                foreach ($relatives as $related) {
                    if ($related != $newBeneficiaryId && $related != $existingBeneficiaryId) {
                        // ✅ Naye Beneficiary ko har related beneficiary se jodo
                        $this->createFamilyRelation($newBeneficiaryId, $related);
                        $this->createFamilyRelation($related, $newBeneficiaryId);
                    }
                }
            }
        }

        $originalUser->assignRole('Beneficiary');

        return redirect()->route('beneficiarys.index')->with([
            'message' => 'Beneficiary created successfully!'
        ]);
    }

    /**
     * ✅ Family Relation Insert Function (Duplicate avoid karega)
     */
    private function createFamilyRelation($userId, $relatedUserId)
    {
        if (!DB::table('beneficiaryfamily')->where([
            ['user_id', $userId],
            ['related_user_id', $relatedUserId]
        ])->exists()) {
            DB::table('beneficiaryfamily')->insert([
                'user_id' => $userId,
                'related_user_id' => $relatedUserId
            ]);
        }
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Beneficiary  $beneficiary
     * @return \Illuminate\Http\Response
     */
    public function show(Beneficiary $beneficiary)
    {
        return redirect()->back();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Beneficiary  $beneficiary
     * @return \Illuminate\Http\Response
     */
    public function edit(User $beneficiary)
    {
        return Inertia::render('Beneficiary/Edit', compact('beneficiary'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBeneficiaryRequest  $request
     * @param  \App\Models\Beneficiary  $beneficiary
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBeneficiaryRequest $request, User $beneficiary)
    {
        $beneficiary->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        return redirect()->route('beneficiarys.index')->with([
            'message' => 'Beneficiary updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Beneficiary  $beneficiary
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $beneficiary)
    {
        $beneficiary->delete();
        return redirect()->route('beneficiarys.index')->with([
            'message' => 'Beneficiary deleted successfully!'
        ]);
    }
}

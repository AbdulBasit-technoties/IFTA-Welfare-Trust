<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Http\Requests\StoreBeneficiaryRequest;
use App\Http\Requests\UpdateBeneficiaryRequest;
use App\Models\User;
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
        return Inertia::render('Beneficiary/Index',compact('beneficiary'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Beneficiary/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBeneficiaryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBeneficiaryRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('Beneficiary');
        return redirect()->route('beneficiarys.index')->with([
           'message' => 'Beneficiary created successfully!'
        ]);
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

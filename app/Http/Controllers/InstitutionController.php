<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use App\Http\Requests\StoreInstitutionRequest;
use App\Http\Requests\UpdateInstitutionRequest;
use Inertia\Inertia;

class InstitutionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $institution = Institution::paginate(10);
        return Inertia::render('Institution/Index', compact('institution'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $FeesTime = [
            ["label" => "Month", "value" => "month"],
            ["label" => "6 Months", "value" => "6_month"],
            ["label" => "Yearly", "value" => "yearly"],
        ];
        $TypeOptions = [
            ["label" => "School", "value" => "school"],
            ["label" => "College", "value" => "college"],
            ["label" => "University", "value" => "university"],
            ["label" => "Course", "value" => "course"],
            ["label" => "Postgraduate", "value" => "postgraduate"],
        ];
        return Inertia::render('Institution/Create',compact('FeesTime','TypeOptions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreInstitutionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreInstitutionRequest $request)
    {
        Institution::create($request->all());
        return redirect()->route('institutions.index')->with([
            'message' => 'Institution created successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function show(Institution $institution)
    {
        return redirect()->back();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function edit(Institution $institution)
    {
        $FeesTime = [
            ["label" => "Month", "value" => "month"],
            ["label" => "6 Months", "value" => "6_month"],
            ["label" => "Yearly", "value" => "yearly"],
        ];
        $TypeOptions = [
            ["label" => "School", "value" => "school"],
            ["label" => "College", "value" => "college"],
            ["label" => "University", "value" => "university"],
            ["label" => "Course", "value" => "course"],
            ["label" => "Postgraduate", "value" => "postgraduate"],
        ];
        return Inertia::render('Institution/Edit', compact('institution','FeesTime','TypeOptions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateInstitutionRequest  $request
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInstitutionRequest $request, Institution $institution)
    {
        $institution->update($request->all());
        return redirect()->route('institutions.index')->with([
            'message' => 'Institution updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function destroy(Institution $institution)
    {
        $institution->delete();
        return redirect()->route('institutions.index')->with([
            'message' => 'Institution deleted successfully!'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index(){
        $programs = Program::paginate(10);
        return Inertia::render('Program/Index',compact('programs'));
    }
    public function create(){
        return Inertia::render('Program/Create');
    }
    public function store(StoreProgramRequest $request){
        Program::create($request->all());
        return redirect()->route('programs.index')->with('success','Program created successfully');
    }
    public function edit(Program $program){
        return Inertia::render('Program/Edit',compact('program'));
    }
    public function update(UpdateProgramRequest $request, Program $program){
        $program->update($request->all());
        return redirect()->route('programs.index')->with('success','Program updated successfully');
    }
    public function show(Program $program){
        return redirect()->back();
    }
    public function destroy(Program $program){
        $program->delete();
        return redirect()->route('programs.index')->with('success','Program deleted successfully');
    }
}

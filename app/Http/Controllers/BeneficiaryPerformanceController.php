<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeneficiaryPerformanceRequest;
use App\Models\BeneficiaryPerformance;
use Illuminate\Http\Request;

class BeneficiaryPerformanceController extends Controller
{
    public function Store(StoreBeneficiaryPerformanceRequest $request)
    {
        BeneficiaryPerformance::create($request->all());
        return back()->with([
            'message' => 'Performance saved successfully.'
        ]);
    }
}

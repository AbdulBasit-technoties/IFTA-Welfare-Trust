<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBeneficiaryPerformanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('beneficiary-performances.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'uid' => 'required|exists:users,id',
            'institute_id' => 'required|exists:institutions,id',
            'performance' => 'required|in:Excellent,Good,Average,Below Average,Poor',
            'comment' => 'nullable|string|max:500',
            'performance_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}

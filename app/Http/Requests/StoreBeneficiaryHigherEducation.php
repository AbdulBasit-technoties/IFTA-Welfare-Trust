<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBeneficiaryHigherEducation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('beneficiarys-educations.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'beneficiary_name' => 'required|string|max:255',
            'guardian_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'beneficiary_cnic' => [
                'required',
                'string',
                'size:13',
                Rule::unique('beneficiaries', 'beneficiary_cnic')
                    ->where(function ($query) {
                        return $query->where('type', $this->type); 
                    })
                    ->ignore($this->route('beneficiarys_education')),
            ],
            'guardian_cnic' => [
                'nullable',
                'string',
                'size:13',
                Rule::unique('beneficiaries', 'guardian_cnic')
                    ->where(function ($query) {
                        return $query->where('type', $this->type); 
                    })
                    ->ignore($this->route('beneficiarys_education')),
            ],
            'beneficiary_contact_no' => 'required|string|max:11',
            'guardian_contact_no' => 'nullable|string|max:11',
            'photo_attached' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'occupation' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'sign' => 'nullable|string|max:255',
            'household_income' => 'nullable|numeric|min:0',
            'syed' => 'required|boolean',
            'orphan' => 'required|boolean',
            'family_members' => 'nullable|integer|min:1',
            'address' => 'required|string|max:500',
            'institute_id' => 'required|exists:institutions,id',
            'graduation_year' => 'nullable|numeric|min:0',
            'degree_title' => 'required|string|max:255',
            'course_field' => 'required|string|max:255',
            'semester' => 'nullable|numeric|min:0',
            'total_semesters' => 'nullable|numeric|min:0',
            'last_result' => 'nullable|string|max:255',
            'total_fee' => 'required|numeric|min:0',
            'approved_amount' => 'nullable|numeric|min:0',
            'institute_ntn' => 'nullable|string|max:255',
            'education_level' => 'nullable|in:Junior,Primary,Secondary,Intermediate,Graduate,Postgraduate',
            'reference_name' => 'nullable|string|max:255',
            'reference_contact' => 'nullable|string|max:11',
            'reference_relation' => 'nullable|string|max:255',
            'approved' => 'nullable|boolean',
            'approver_sign' => 'sometimes|required_if:approved,true|string|max:255',
            'did' => 'required|exists:users,id',
            'approval_date' => 'nullable|date',
            'approval_letter' => 'boolean',
            'application' => 'boolean',
            'fee_voucher' => 'boolean',
            'bonafide_certificate' => 'boolean',
            'beneficiary_cnic_submitted' => 'boolean',
            'guardian_cnic_submitted' => 'boolean',
            'paid_fee_voucher' => 'boolean',
            'institute_ntn_submitted' => 'boolean',
            'uid' => 'required|exists:users,id',
        ];
    }
}

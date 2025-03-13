<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBeneficiaryRation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('beneficiarys-rations.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $beneficiaryId = optional($this->route('beneficiarys_ration'))->id;
        return [
            'beneficiary_name' => 'required|string|max:255',
            'guardian_name' => 'nullable|string|max:255',
            'beneficiary_cnic' => [
                'required',
                'string',
                'size:13',
                Rule::unique('beneficiaries', 'beneficiary_cnic')
                    ->where(fn($query) => $query->where('type', $this->type))
                    ->ignore($beneficiaryId), // Ensure only ID is passed
            ],
            'guardian_cnic' => [
                'nullable',
                'string',
                'size:13',
                Rule::unique('beneficiaries', 'guardian_cnic')
                    ->where(fn($query) => $query->where('type', $this->type))
                    ->ignore($beneficiaryId),
            ],
            'beneficiary_contact_no' => 'required|string|max:15',
            'guardian_contact_no' => 'nullable|string|max:15',
            'occupation' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:Male,Female,Other',
            'marital_status' => 'nullable|in:Single,Married,Divorced,Widowed',
            'sign' => 'nullable|string|max:255',
            'household_income' => 'nullable|numeric|min:0',
            'syed' => 'required|boolean',
            'orphan' => 'required|boolean',
            'family_members' => 'nullable|integer|min:1',
            'address' => 'nullable|string|max:500',
            'disability' => 'nullable|string|max:500',
            'description' => 'nullable|string|max:500',

            // Reference Information
            'reference_name' => 'nullable|string|max:255',
            'reference_contact' => 'nullable|string|max:15',
            'reference_relation' => 'nullable|string|max:255',

            // Approval Information
            'approver_sign' => 'nullable|string|max:255',
            'did' => 'required|exists:users,id',
            'approval_date' => 'nullable|date',
            'approved' => 'boolean',

            // Document Submission
            'last_utility_bill' => 'boolean',
            'beneficiary_cnic_submitted' => 'boolean',
        ];
    }
}

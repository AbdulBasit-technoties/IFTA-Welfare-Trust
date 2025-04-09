<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBeneficiaryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('beneficiaries.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'beneficiary_name' => ['required', 'string', 'max:255'],
            'guardian_name' => ['nullable', 'string'],
            'beneficiary_cnic' => ['nullable', 'numeric'],
            'guardian_cnic' => ['nullable', 'numeric'],
            'address' => ['nullable', 'string'],
            'beneficiary_contact_no' => 'required|digits:11',
            'guardian_contact_no' => 'nullable|digits:11',
            'email' => ['required', 'email', 'unique:beneficiaries,email,NULL,id,uid,' . $this->uid . ',pid,' . $this->pid],
            'occupation' => ['nullable', 'string'],
            'household_income' => ['nullable', 'numeric'],
            'syed' => ['nullable', 'boolean'],
            'date_of_birth' => ['nullable', 'date'],
            'orphan' => ['nullable', 'boolean'],
            'family_members' => ['nullable', 'integer'],
            'sign' => ['nullable', 'string'],
            'marital_status' => ['nullable', 'string'],
            'gender' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'disability' => ['nullable', 'string'],
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBeneficiaryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('beneficiaries.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'role' => ['required'],
            'uid' => ['nullable', 'exists:users,id'],
            'beneficiary_name' => ['required', 'string', 'max:255'],
            'guardian_name' => ['nullable', 'string'],
            'beneficiary_cnic' => ['nullable', 'numeric'],
            'guardian_cnic' => ['nullable', 'numeric'],
            'address' => ['nullable', 'string'],
            'beneficiary_contact_no' => 'required|digits:11',
            'guardian_contact_no' => 'nullable|digits:11',
            'email' => ['required', 'email', 'unique:users,email'],
            'photo_attached' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'occupation' => ['nullable', 'string'],
            'household_income' => ['nullable', 'numeric'],
            'syed' => ['nullable', 'boolean'],
            'date_of_birth' => ['nullable', 'date'],
            'orphan' => ['nullable', 'boolean'],
            'family_members' => ['nullable', 'integer'],
            'sign' => ['nullable', 'string'],
            'marital_status' => ['nullable', 'string'],
            'gender' => ['nullable', 'string'],
            'password' => ['required', 'min:6'],
            'description' => ['nullable', 'string'],
            'disability' => ['nullable', 'string'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}

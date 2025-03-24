<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('users.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $this->user->id,
            'guardian_name' => 'nullable|string|max:255',
            'guardian_contact_no' => 'nullable|string|max:20',
            'guardian_cnic' => 'nullable|string|max:20',
            'beneficiary_cnic' => 'nullable|string|max:20',
            'marital_status' => 'nullable|string|max:50',
            'gender' => 'nullable|string|max:10',
            'occupation' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'sign' => 'nullable|string|max:255',
            'household_income' => 'nullable|numeric',
            'syed' => 'boolean',
            'orphan' => 'boolean',
            'family_members' => 'nullable|integer',
            'phone' => 'nullable|string|max:20',
            'description' => 'nullable|string',
            'disability' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'role' => 'required',
        ];
    }
}

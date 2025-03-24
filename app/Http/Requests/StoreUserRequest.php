<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('users.create');
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:6'],
            'guardian_name' => ['nullable', 'string'],
            'guardian_contact_no' => ['nullable', 'string'],
            'guardian_cnic' => ['nullable', 'numeric'],
            'beneficiary_cnic' => ['nullable', 'numeric'],
            'marital_status' => ['nullable', 'string'],
            'gender' => ['nullable', 'string'],
            'occupation' => ['nullable', 'string'],
            'date_of_birth' => ['nullable', 'date'],
            'sign' => ['nullable', 'string'],
            'household_income' => ['nullable', 'numeric'],
            'syed' => ['nullable', 'boolean'],
            'orphan' => ['nullable', 'boolean'],
            'family_members' => ['nullable', 'integer'],
            'photo_attached' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'phone' => ['nullable', 'string', 'max:20'],
            'description' => ['nullable', 'string'],
            'disability' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
        ];
    }
}

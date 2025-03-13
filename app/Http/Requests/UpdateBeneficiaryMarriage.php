<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBeneficiaryMarriage extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('beneficiarys-marriages.update');
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
            'beneficiary_cnic' => [
                'required',
                'string',
                'size:13',
                Rule::unique('beneficiaries', 'beneficiary_cnic')
                    ->where(function ($query) {
                        return $query->where('type', $this->type);
                    })
                    ->ignore($this->route('beneficiary')),
            ],
            'guardian_cnic' => [
                'nullable',
                'string',
                'size:13',
                Rule::unique('beneficiaries', 'guardian_cnic')
                    ->where(function ($query) {
                        return $query->where('type', $this->type);
                    })
                    ->ignore($this->route('beneficiary')),
            ],
            'beneficiary_contact_no' => 'required|string|max:11',
            'guardian_contact_no' => 'nullable|string|max:11',
            'occupation' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'sign' => 'nullable|string|max:255',
            'household_income' => 'nullable|numeric|min:0',
            'syed' => 'required|boolean',
            'orphan' => 'required|boolean',
            'family_members' => 'nullable|integer|min:1',
            'address' => 'required|string|max:500',
            'spouse_age' => 'required|integer|min:0',
            'place_of_marriage' => 'nullable|string|max:255',
            'no_of_guest_invited' => 'required|numeric|min:0',
            'date_of_marriage' => 'required|date',
            'reference_name' => 'nullable|string|max:255',
            'reference_contact' => 'nullable|string|max:11',
            'reference_relation' => 'nullable|string|max:255',
            'approved' => 'nullable|boolean',
            'approver_sign' => 'sometimes|required_if:approved,true|string|max:255',
            'did' => 'required|exists:users,id',
            'approval_date' => 'nullable|date',
            'approval_letter' => 'boolean',
            'marriage_invitation' => 'boolean',
            'beneficiary_cnic_submitted' => 'boolean',
        ];
    }
}

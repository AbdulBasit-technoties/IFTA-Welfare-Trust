<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBeneficiaryApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('beneficiarys-applications.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if ($this->routeIs('beneficiarys-applications.update') && $this->has('status') && count($this->all()) === 1) {
            return [
                'status' => 'required|string|in:Pending,Approved,Pending Approval,Cancelled',
            ];
        }
        return [
            'beneficiary_name' => 'required|string|max:255',
            'guardian_name' => 'nullable|string|max:255',

            'beneficiary_cnic' => [
                'required',
                'string',
                'size:13',
                Rule::unique('beneficiaries', 'beneficiary_cnic')
                    ->where(function ($query) {
                        return $query->where('pid', $this->pid);
                    })
                    ->ignore($this->route('beneficiarys_application')),
            ],
            'guardian_cnic' => [
                'nullable',
                'string',
                'size:13',
                Rule::unique('beneficiaries', 'guardian_cnic')
                    ->where(function ($query) {
                        return $query->where('pid', $this->pid);
                    })
                    ->ignore($this->route('beneficiarys_application')),
            ],
            'beneficiary_contact_no' => 'required|digits:11',
            'guardian_contact_no' => 'nullable|digits:11',
            // 'photo_attached' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'occupation' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'sign' => 'nullable|string',
            'semester' => 'nullable|integer|min:1',
            'household_income' => 'required|numeric|min:0',
            'syed' => 'required|boolean',
            'orphan' => 'required|boolean',
            'family_members' => 'required|integer|min:1',
            'address' => 'required|string|max:500',
            'institute_id' => 'nullable|integer|exists:institutions,id',
            'total_semesters' => 'nullable|integer|min:1',
            'education_type'       => 'nullable', 'in:school,college,university,course,postgraduate',
            'fees_time'  => 'nullable', 'in:1_month,6_month,yearly',
            'approved_amount' => 'nullable|numeric|min:0',
            'institute_ntn' => 'nullable|string|max:20',
            'reference_name' => 'nullable|string|max:255',
            'reference_contact' => 'nullable|digits:11',
            'reference_relation' => 'nullable|string|max:255',
            'approved' => 'nullable|boolean',
            'approver_sign' => 'nullable|string',
            'did' => 'required|integer|exists:users,id',
            'approval_date' => 'nullable|date',
            'degree_title' => 'nullable|string|max:255',
            'approval_letter' => 'nullable|boolean',
            'application' => 'nullable|boolean',
            'fee_voucher' => 'nullable|boolean',
            'bonafide_certificate' => 'nullable|boolean',
            'beneficiary_cnic_submitted' => 'nullable|boolean',
            'guardian_cnic_submitted' => 'nullable|boolean',
            'paid_fee_voucher' => 'nullable|boolean',
            'institute_ntn_submitted' => 'nullable|boolean',
            'uid' => 'required|integer|exists:users,id',
            'pid' => 'required|integer|exists:programs,id',
            'marital_status' => 'nullable|string|in:Single,Married,Widowed,Divorced',
            'gender' => 'nullable|string|in:Male,Female,Other',
            'disability' => 'nullable|string|max:255',
            'class' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'last_checkup_date' => 'nullable|date',
            'diseases_injury' => 'nullable|string|max:255',
            'dr_name' => 'nullable|string|max:255',
            'hospital_name' => 'nullable|string|max:255',
            'spouse_education' => 'nullable|string|max:255',
            'spouse_age' => [
                'nullable',
                'integer',
                function ($attribute, $value, $fail) {
                    if ($this->filled('spouse_education') && ($value === null || $value < 18)) {
                        $fail('The spouse age must be at least 18');
                    }
                },
            ],
            'no_of_guest_invited' => 'nullable|integer|min:0',
            'place_of_marriage' => 'nullable|string|max:255',
            'date_of_marriage' => 'nullable|date',
            'prescription' => 'nullable|boolean',
            'last_utility_bill' => 'nullable|boolean',
            'marriage_invitation' => 'nullable|boolean',
        ];
    }
}

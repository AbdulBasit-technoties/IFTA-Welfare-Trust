<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beneficiary extends Model
{
    use HasFactory;
    protected $fillable = [
        'beneficiary_name',
        'guardian_name',
        'beneficiary_cnic',
        'guardian_cnic',
        'address',
        'beneficiary_contact_no',
        'guardian_contact_no',
        'email',
        'photo_attached',
        'occupation',
        'household_income',
        'syed',
        'date_of_birth',
        'orphan',
        'family_members',
        'sign',
        'marital_status',
        'gender',
        'description',
        'disability',

        // Education Fields
        'education_level',
        'patient_type',
        'class',
        'last_result',
        'total_fee',
        'approved_amount',
        'institute_ntn',
        'graduation_year',
        'degree_title',
        'course_field',
        'semester',
        'total_semesters',

        // Medical Fields
        'hospital_name',
        'dr_name',
        'diseases_injury',
        'last_checkup_date',

        // Spouse Fields
        'spouse_name',
        'spouse_cnic',
        'spouse_education',
        'spouse_age',
        'no_of_guest_invited',
        'place_of_marriage',
        'date_of_marriage',

        // Reference Fields
        'reference_name',
        'reference_contact',
        'reference_relation',

        // Approval Fields
        'approved',
        'approver_sign',
        'did',
        'approval_date',

        // Documents Submitted
        'approval_letter',
        'application',
        'fee_voucher',
        'bonafide_certificate',
        'beneficiary_cnic_submitted',
        'guardian_cnic_submitted',
        'paid_fee_voucher',
        'institute_ntn_submitted',
        'prescription',
        'last_utility_bill',
        'marriage_invitation',

        // Additional Info
        'uid',
        'type',
        'institute_id'
    ];
    public function beneficiary()
    {
        return $this->belongsTo(User::class, 'uid');
    }

    public function donor()
    {
        return $this->belongsTo(User::class, 'did');
    }
    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
}

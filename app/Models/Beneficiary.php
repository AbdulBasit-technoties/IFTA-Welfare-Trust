<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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
        'class',
        'fees_time',
        'total_fee',
        'approved_amount',
        'institute_ntn',
        'degree_title',
        'semester',
        'education_type',

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
        'uid',
        'pid',
        'institute_id',
        'status'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'uid');
    }

    public function donor()
    {
        return $this->belongsTo(User::class, 'did');
    }
    public function institute()
    {
        return $this->belongsTo(Institution::class, 'institute_id');
    }
    public function program()
    {
        return $this->belongsTo(Program::class, 'pid');
    }
    public function performances()
    {
        return $this->hasMany(BeneficiaryPerformance::class, 'uid', 'uid');
    }
    public function scopeFiltered($query, $request)
    {
        $user = Auth::user();

        // **Role-based filtering**
        if ($user->hasRole('Donor')) {
            $query->where('did', $user->id);
        } elseif ($user->hasRole('Education Officer')) {
            $query->whereHas('program', function ($q) {
                $q->whereIn('slug', ['schools', 'higher-educations']);
            });
        } elseif ($user->hasRole('Beneficiary')) {
            $query->where('uid', $user->id);
        }
        // Baqi users ke liye koi restriction nahi (sab record milay ga)

        // **Apply additional filters from request**
        if ($request->filled('status') && $request->input('status') !== 'All') {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('program') && !in_array("All", $request->input('program'))) {
            $query->whereIn('pid', $request->input('program'));
        }

        return $query;
    }
    public function payments()
    {
        return $this->hasMany(Payment::class, 'bid', 'uid');
    }
    
}

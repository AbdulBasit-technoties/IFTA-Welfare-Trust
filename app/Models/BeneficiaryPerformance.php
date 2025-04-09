<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeneficiaryPerformance extends Model
{
    use HasFactory;

    protected $fillable = [
        'uid',
        'institute_id',
        'performance',
        'performance_photo',
        'comment'
    ];

    // Relationship with Institution Model
    public function institution()
    {
        return $this->belongsTo(Institution::class, 'institute_id');
    }
    // BeneficiaryPerformance.php
    public function user()
    {
        return $this->belongsTo(User::class, 'uid');
    }

    public function institute()
    {
        return $this->belongsTo(Institution::class, 'institute_id');
    }
    public function beneficiary()
    {
        return $this->belongsTo(Beneficiary::class, 'uid', 'uid');
    }
}

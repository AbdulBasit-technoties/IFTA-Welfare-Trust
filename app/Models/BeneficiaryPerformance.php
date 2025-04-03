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
        'comment'
    ];

    // Relationship with User Model
    public function user()
    {
        return $this->belongsTo(User::class, 'uid');
    }

    // Relationship with Institution Model
    public function institution()
    {
        return $this->belongsTo(Institution::class, 'institute_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'address',
        'email',
        'contact_no',
        'url',
        'type',
        'fees_time'
    ];
    public function beneficiaries()
    {
        return $this->hasMany(Beneficiary::class, 'institute_id');
    }
}

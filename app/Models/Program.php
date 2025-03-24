<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;
    protected $fillable = ['name','slug'];
    public function beneficiaries()
    {
        return $this->hasMany(Beneficiary::class, 'pid');
    }
}

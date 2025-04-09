<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'uid',
        'address',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'uid');
    }
    public function payments()
    {
        return $this->hasMany(Payment::class, 'did', 'uid');
    }
}

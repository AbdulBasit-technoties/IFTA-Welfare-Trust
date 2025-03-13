<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'donation_amount',
        'payment_method',
        'donation_frequency',
        'identification_document',
        'uid',
        'address',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'uid');
    }
}

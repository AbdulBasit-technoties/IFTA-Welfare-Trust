<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'did',
        'bid',
        'pid',
        'amount_requested',
        'amount_paid',
        'status',
        'payment_slip',
        'approved_by',
        'created_by',
        'date',
        'comment',
    ];

    // Donor Relation
    public function donor()
    {
        return $this->belongsTo(User::class, 'did');
    }

    // Beneficiary Relation
    public function beneficiary()
    {
        return $this->belongsTo(User::class, 'bid');
    }

    // Program Relation
    public function program()
    {
        return $this->belongsTo(Program::class, 'pid');
    }

    // Approved By (Admin)
    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Created By (Admin)
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function scopeFilterByRole(Builder $query)
    {
        $user = auth()->user();
        $status = request('status');

        $userRole = optional($user->roles->pluck('name'))->first();

        if ($userRole === 'Donor') {
            $query->where('did', $user->id);
        }

        if ($status) {
            $query->where('status', $status);
        }

        return $query;
    }
}

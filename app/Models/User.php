<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Eloquent\Builder;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function donor()
    {
        return $this->hasOne(Donor::class, 'uid');
    }
    public function beneficiaries()
    {
        return $this->hasMany(Beneficiary::class, 'uid');
    }

    public function donatedBeneficiaries()
    {
        return $this->hasMany(Beneficiary::class, 'did');
    }
    public function accountant()
    {
        return $this->hasOne(Accountant::class, 'uid');
    }

    public function hr()
    {
        return $this->hasOne(Hr::class, 'uid');
    }

    public function beneficiary()
    {
        return $this->hasOne(Beneficiary::class, 'uid');
    }
    public function educationOfficer()
    {
        return $this->hasOne(EducationOfficer::class, 'uid');
    }
    public function performances()
    {
        return $this->hasMany(BeneficiaryPerformance::class, 'uid');
    }

    public function donations()
    {
        return $this->hasMany(Payment::class, 'did');
    }

    public function receivedPayments()
    {
        return $this->hasMany(Payment::class, 'bid');
    }

    public function approvedPayments()
    {
        return $this->hasMany(Payment::class, 'approved_by');
    }

    public function createdPayments()
    {
        return $this->hasMany(Payment::class, 'created_by');
    }
    public function scopeFilterByRole(Builder $query, $role = null)
    {
        if ($role) {
            $query->whereHas('roles', function ($q) use ($role) {
                $q->where('name', $role);
            });
        }
        return $query;
    }
    public function payments()
    {
        return $this->hasMany(Payment::class, 'did', 'id');
    }
}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;

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
    public function getBeneficiaries()
    {
        if ($this->hasRole('Beneficiary')) {
            return Beneficiary::where('uid', $this->id);
        } elseif ($this->hasRole('Donor')) {
            return Beneficiary::where('did', $this->id);
        } else {
            return Beneficiary::query();
        }
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
}

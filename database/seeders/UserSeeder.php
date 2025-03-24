<?php

namespace Database\Seeders;

use App\Models\Donor;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $models = config('models.models');

        foreach ($models as $model) {
            Permission::firstOrCreate(['name' => "$model.index"]);
            Permission::firstOrCreate(['name' => "$model.create"]);
            Permission::firstOrCreate(['name' => "$model.store"]);
            Permission::firstOrCreate(['name' => "$model.show"]);
            Permission::firstOrCreate(['name' => "$model.edit"]);
            Permission::firstOrCreate(['name' => "$model.update"]);
            Permission::firstOrCreate(['name' => "$model.destroy"]);
        }

        $AdminRole = Role::firstOrCreate(['name' => 'Admin']);
        $permissions = Permission::all();
        $AdminRole->syncPermissions($permissions);
        $donorRole = $this->createRoleWithPermissions('Donor', []);
        $beneficiaryRole = $this->createRoleWithPermissions('Beneficiary', []);
        $accountantRole = $this->createRoleWithPermissions('Accountant', []);
        $hrRole = $this->createRoleWithPermissions('HR', []);
        $educationOfficerRole = $this->createRoleWithPermissions('Education Officer', []);

        $Admin = User::firstOrCreate([
            'email' => 'admin@technoties.com',
        ], [
            'name' => 'Admin',
            'password' => Hash::make('password'),
        ]);
        $Admin->assignRole($AdminRole);

        $donorUser = User::firstOrCreate([
            'email' => 'donor@technoties.com',
        ], [
            'name' => 'Donor',
            'password' => Hash::make('password'),
        ]);

        $donorUser->assignRole($donorRole);

        Donor::firstOrCreate([
            'email' => $donorUser->email,
        ], [
            'name' => $donorUser->name,
            'uid' => $donorUser->id,
        ]);

        $beneficiaryUser = User::firstOrCreate([
            'email' => 'beneficiary@technoties.com',
        ], [
            'name' => 'Beneficiary',
            'password' => Hash::make('password'),
        ]);
        $beneficiaryUser->assignRole($beneficiaryRole);

        $accountantUser = User::firstOrCreate([
            'email' => 'accountant@technoties.com',
        ], [
            'name' => 'Accountant',
            'password' => Hash::make('password'),
        ]);
        $accountantUser->assignRole($accountantRole);

        $hrUser = User::firstOrCreate([
            'email' => 'hr@technoties.com',
        ], [
            'name' => 'HR',
            'password' => Hash::make('password'),
        ]);
        $hrUser->assignRole($hrRole);

        // Education Officer User
        $educationOfficerUser = User::firstOrCreate([
            'email' => 'educationofficer@technoties.com',
        ], [
            'name' => 'Education Officer',
            'password' => Hash::make('password'),
        ]);
        $educationOfficerUser->assignRole($educationOfficerRole);
    }

    /**
     * Helper function to create roles and assign permissions accordingly.
     */
    protected function createRoleWithPermissions($roleName, array $permissions)
    {
        $role = Role::firstOrCreate(['name' => $roleName]);
        $role->syncPermissions($permissions);
        return $role;
    }
}

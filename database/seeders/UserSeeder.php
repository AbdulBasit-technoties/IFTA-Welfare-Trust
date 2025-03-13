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

        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);
        $permissions = Permission::all();
        $superAdminRole->syncPermissions($permissions);

        $adminRole = $this->createRoleWithPermissions('Admin', []);
        $donorRole = $this->createRoleWithPermissions('Donor', []);
        $beneficiaryRole = $this->createRoleWithPermissions('Beneficiary', []);
        $accountantRole = $this->createRoleWithPermissions('Accountant', []);

        $superAdmin = User::firstOrCreate([
            'email' => 'superadmin@technoties.com',
        ], [
            'name' => 'Super Admin',
            'password' => Hash::make('password'),
        ]);
        $superAdmin->assignRole($superAdminRole);

        $adminUser = User::firstOrCreate([
            'email' => 'admin@technoties.com',
        ], [
            'name' => 'Admin',
            'password' => Hash::make('password'),
        ]);
        $adminUser->assignRole($adminRole);

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
            'full_name' => $donorUser->name,
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

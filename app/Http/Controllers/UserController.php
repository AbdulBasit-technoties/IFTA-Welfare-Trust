<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Accountant;
use App\Models\Beneficiary;
use App\Models\Donor;
use App\Models\EducationOfficer;
use App\Models\Hr;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->input('role'); // Role filter ko request se le rahe hain
        $users = User::with(['roles', 'donor', 'accountant', 'hr', 'beneficiary', 'educationOfficer'])
            ->filterByRole($role) // Ab model ke scope method ka use ho raha hai
            ->paginate(10);

        return Inertia::render('Users/Index', compact('users', 'role'));
    }



    public function create()
    {
        $roles = Role::get()->map(function ($role) {
            return [
                'label' => $role->name,
                'value' => $role->name,
            ];
        })->toArray();
        $beneficiaries = User::role('Beneficiary')->get()->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->name,
                'value' => $beneficiary->id,
            ];
        })->toArray();
        $MaritalStatus = [
            ["label" => "Single", "value" => "Single"],
            ["label" => "Married", "value" => "Married"],
            ["label" => "Divorced", "value" => "Divorced"],
            ["label" => "Widowed", "value" => "Widowed"],
        ];
        $patientGender = [
            ["label" => "Male", "value" => "Male"],
            ["label" => "Female", "value" => "Female"],
            ["label" => "Other", "value" => "Other"],
        ];
        return Inertia::render('Users/Create', compact('roles', 'MaritalStatus', 'patientGender', 'beneficiaries'));
    }
    public function store(StoreUserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $roleModels = [
            'Donor' => Donor::class,
            'Accountant' => Accountant::class,
            'HR' => Hr::class,
            'Beneficiary' => Beneficiary::class,
            'Education Officer' => EducationOfficer::class // ✅ New Role Added
        ];

        if (array_key_exists($request->role, $roleModels)) {
            $model = $roleModels[$request->role];
            $data = [
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'uid' => $user->id
            ];

            if ($request->role === 'Beneficiary') {
                if ($request->hasFile('photo_attached')) {
                    $logoPath = $request->file('photo_attached')->store('Beneficiary', 'public');
                    $data['photo_attached'] = $logoPath;
                }

                $data = array_merge($data, [
                    'beneficiary_name' => $request->name,
                    'beneficiary_cnic' => $request->beneficiary_cnic,
                    'guardian_name' => $request->guardian_name,
                    'guardian_cnic' => $request->guardian_cnic,
                    'beneficiary_contact_no' => $request->phone,
                    'guardian_contact_no' => $request->guardian_contact_no,
                    'occupation' => $request->occupation,
                    'household_income' => $request->household_income,
                    'date_of_birth' => $request->date_of_birth,
                    'sign' => $request->sign,
                    'family_members' => $request->family_members,
                    'syed' => $request->syed,
                    'orphan' => $request->orphan,
                    'marital_status' => $request->marital_status,
                    'gender' => $request->gender,
                    'description' => $request->description,
                    'disability' => $request->disability,
                ]);
            }

            $model::create($data);
        }

        $user->assignRole($request->role);

        return redirect()->route('users.index')->with([
            'message' => 'User created successfully!'
        ]);
    }


    private function createFamilyRelation($userId, $relatedUserId)
    {
        if (!DB::table('beneficiaryfamily')->where([
            ['user_id', $userId],
            ['related_user_id', $relatedUserId]
        ])->exists()) {
            DB::table('beneficiaryfamily')->insert([
                'user_id' => $userId,
                'related_user_id' => $relatedUserId
            ]);
        }
    }
    public function edit(User $user)
    {

        $user = User::with(['roles', 'donor', 'accountant', 'hr', 'beneficiary', 'educationOfficer'])->find($user->id);
        $roles = Role::get()->map(function ($role) {
            return [
                'label' => $role->name,
                'value' => $role->name,
            ];
        })->toArray();

        $beneficiaries = User::role('Beneficiary')->get()->map(function ($beneficiary) {
            return [
                'label' => $beneficiary->name,
                'value' => $beneficiary->id,
            ];
        })->toArray();

        $MaritalStatus = [
            ["label" => "Single", "value" => "Single"],
            ["label" => "Married", "value" => "Married"],
            ["label" => "Divorced", "value" => "Divorced"],
            ["label" => "Widowed", "value" => "Widowed"],
        ];

        $patientGender = [
            ["label" => "Male", "value" => "Male"],
            ["label" => "Female", "value" => "Female"],
            ["label" => "Other", "value" => "Other"],
        ];

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'MaritalStatus' => $MaritalStatus,
            'patientGender' => $patientGender,
            'beneficiaries' => $beneficiaries,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        // 1. User Data Update
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // 2. Role Handling
        $roleModels = [
            'Donor' => Donor::class,
            'Accountant' => Accountant::class,
            'HR' => Hr::class,
            'Beneficiary' => Beneficiary::class,
            'Education Officer' => EducationOfficer::class // ✅ Education Officer Added
        ];

        if (array_key_exists($request->role, $roleModels)) {
            $model = $roleModels[$request->role];

            // Common fields for all roles
            $data = [
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'uid' => $user->id, // Linking user ID to related table
            ];

            // Special fields for Beneficiary
            if ($request->role === 'Beneficiary') {
                if ($request->hasFile('photo_attached')) {
                    $imagePath = $request->file('photo_attached')->store('Beneficiary', 'public');
                    $data['photo_attached'] = $imagePath;
                }

                $data = array_merge($data, [
                    'beneficiary_name' => $request->name,
                    'beneficiary_cnic' => $request->beneficiary_cnic,
                    'guardian_name' => $request->guardian_name,
                    'guardian_cnic' => $request->guardian_cnic,
                    'beneficiary_contact_no' => $request->phone,
                    'guardian_contact_no' => $request->guardian_contact_no,
                    'occupation' => $request->occupation,
                    'household_income' => $request->household_income,
                    'date_of_birth' => $request->date_of_birth,
                    'sign' => $request->sign,
                    'family_members' => $request->family_members,
                    'syed' => $request->syed,
                    'orphan' => $request->orphan,
                    'marital_status' => $request->marital_status,
                    'gender' => $request->gender,
                    'description' => $request->description,
                    'disability' => $request->disability,
                ]);
            }

            // 3. Update or Create Record for the Role Table
            $model::updateOrCreate(['uid' => $user->id], $data);
        }

        return redirect()->route('users.index')->with([
            'message' => 'User updated successfully!'
        ]);
    }
    public function Show(User $user) {
        $users = User::with(['roles', 'donor', 'accountant', 'hr', 'beneficiary', 'educationOfficer'])->get();
        return Inertia::render('Users/Show', compact('users'));
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with(['message' => 'User deleted successfully!']);
    }
}

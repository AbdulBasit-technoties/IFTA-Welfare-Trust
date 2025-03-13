<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function update(Request $request, $id)
    {
        $permissions = $request->all();
        $role = Role::find($id)->syncPermissions($permissions);
        return session()->flash('message', 'Permissions updated successfully');
    }

    public function show($id)
    {
        $role = Role::findOrFail($id);
        $permissions = $role->permissions->pluck('name')->toArray();
        $permissionsList = Permission::pluck('name')->toArray();
        $models = config('models.models');
        return Inertia::render('Roles/Show', compact('role', 'permissions', 'permissionsList', 'models'));
    }
    public function index(Request $request)
    {
        $role = Role::paginate(10);
        return Inertia::render('Roles/Index', compact('role'));
    }

    public function create(Request $request)
    {

        return Inertia::render('Roles/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        if (Role::where('name', $request->name)->exists()) {
            session()->flash('message', 'Role already exists');
            return redirect()->back();
        }
        Role::create([
            'name' => $request->name,
        ]);
        return redirect()->route('roles.index')->with([
            'message' => 'Role created successfully!'
        ]);
    }

    public function Edit($id)
    {
        $role = Role::findOrFail($id);
        return Inertia::render('Roles/Edit', compact('role'));
    }


    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return redirect()->route('roles.index')->with([
            'message' => 'Role deleted successfully!'
        ]);
    }
}

<?php

use App\Http\Controllers\BeneficiaryController;
use App\Http\Controllers\BeneficiaryHigherEducationController;
use App\Http\Controllers\BeneficiaryMarriageController;
use App\Http\Controllers\BeneficiaryPatientController;
use App\Http\Controllers\BeneficiaryRationController;
use App\Http\Controllers\BeneficiarySchoolController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('roles', RoleController::class);
    Route::resource('beneficiarys-schools', BeneficiarySchoolController::class);
    Route::resource('beneficiarys-patients', BeneficiaryPatientController::class);
    Route::resource('beneficiarys-rations', BeneficiaryRationController::class);
    Route::resource('beneficiarys-marriages', BeneficiaryMarriageController::class);
    Route::resource('beneficiarys-educations', BeneficiaryHigherEducationController::class);
    Route::resource('beneficiarys', BeneficiaryController::class);
    Route::resource('donors', DonorController::class);
    Route::resource('institutions', InstitutionController::class);
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\BeneficiaryController;
use App\Http\Controllers\BeneficiaryPerformanceController;
use App\Http\Controllers\BeneficiarysApplicationsController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\Program;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Schema;
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
    Route::resource('programs', ProgramController::class);
    Route::resource('users', UserController::class);
    Route::resource('institutions', InstitutionController::class);
    Route::resource('beneficiary-performances', BeneficiaryPerformanceController::class);
    Route::resource('beneficiarys-applications', BeneficiarysApplicationsController::class);
    Route::resource('payments', PaymentController::class);
    Route::resource('donors', DonorController::class);
    Route::resource('beneficiaries', BeneficiaryController::class);
    Route::post('beneficiaryimageupload', [BeneficiaryController::class, 'uploadImage'])->name('beneficiaryimageupload');
    Route::post('paymentimageupload', [PaymentController::class, 'PaymentUploadImage'])->name('paymentimageupload');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

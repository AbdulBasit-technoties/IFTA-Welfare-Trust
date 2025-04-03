<?php

namespace App\Http\Middleware;

use App\Models\Beneficiary;
use App\Models\Payment;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $userRole = $user ? optional($user->roles)->pluck('name')->first() : null;

        $pendingPaymentsCount = Payment::where('status', 'Request');
        $approvedPaymentsCount = Payment::where('status', 'Approved');

        if ($userRole === 'Donor') {
            $pendingPaymentsCount->where('did', $user->id);
            $approvedPaymentsCount->where('did', $user->id);
        }
        $pendingBeneficiaryCount = Beneficiary::where('status', 'Request');
        $approvedBeneficiaryCount = Beneficiary::where('status', 'Approved');

        if ($userRole === 'Donor') {
            $pendingBeneficiaryCount->where('did', $user->id);
            $approvedBeneficiaryCount->where('did', $user->id);
        }
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? $user->load('roles') : null,
                'permissions' => $user ? $user->getPermissionsViaRoles()->pluck('name') : [],
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'error' => fn() => $request->session()->get('error')
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'pendingPaymentsCount' => $pendingPaymentsCount->count(),
            'approvedPaymentsCount' => $approvedPaymentsCount->count(),
            'pendingBeneficiaryCount' => $pendingBeneficiaryCount->count(),
            'approvedBeneficiaryCount' => $approvedBeneficiaryCount->count(),
        ]);
    }
}

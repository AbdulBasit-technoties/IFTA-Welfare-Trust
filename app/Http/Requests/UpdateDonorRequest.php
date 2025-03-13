<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDonorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('donors.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:donors,email',
            'phone' => 'required|string|min:10',
            'donation_amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:Bank Transfer,Credit Card,Cheque,Other',
            'donation_frequency' => 'required|in:One-time,Monthly,Yearly',
            'address' => 'nullable|string',
        ];
    }
}

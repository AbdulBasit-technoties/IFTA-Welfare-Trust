<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('payments.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // dd($this->all());
        if ($this->payment_option === "DepositDonor") {
            return [
                'did' => ['required', 'exists:users,id'],
                'payment_slip' => ['required', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
                'total_paid' => ['required', 'numeric', 'min:0'],
            ];
        } else {
            return [
                'did' => ['required', 'exists:users,id'],
                'payment_slip' => ['required', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
                'bid' => ['required', 'exists:users,id'],
                'pid' => ['required', 'exists:programs,id'],
                'status' => ['nullable', 'in:Waiting,Request,Approved,Rejected,Partially Paid,Paid'],
                'amount_paid' => ['nullable', 'numeric', 'min:0'],
                'amount_requested' => ['required', 'numeric', 'min:1'],
                'payment_slip' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
                'comment' => ['nullable', 'string'],
            ];
        }
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('payments.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if ($this->routeIs('payments.update') && $this->has('status') && $this->has('comment') && $this->has('did') && $this->has('amount_paid') && count($this->all()) === 4) {
            return [
                'status' => 'required|string|in:Waiting,Request,Approved,Rejected,Partially Paid,Paid',
                'comment' => ['nullable', 'string'],
                'did' => 'required|integer',
                'amount_paid' => 'required|numeric',  // Added validation for amount_paid
            ];
        }
        return [
            'did'              => ['required', 'exists:users,id'],
            'bid'              => ['required', 'exists:users,id'],
            'pid'              => ['required', 'exists:programs,id'],
            'status' => ['nullable', 'in:Waiting,Request,Approved,Rejected,Partially Paid,Paid'],
            'amount_paid'      => ['nullable', 'numeric', 'min:0'],
            'amount_requested' => ['required', 'numeric', 'min:0'],
            // 'payment_slip'     => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
            'comment' => ['nullable', 'string'],
        ];
    }
}

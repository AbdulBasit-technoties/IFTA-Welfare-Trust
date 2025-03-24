<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateInstitutionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('institutions.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */

    public function rules()
    {
        return [
            'name'       => ['required', 'string', 'max:255'],
            'address'    => ['required', 'string', 'max:500'],
            'email'      => ['nullable', 'email', 'max:255', Rule::unique('institutions', 'email')->ignore($this->institution)],
            'contact_no' => ['nullable', 'string', 'max:20'],
            'url'        => ['nullable', 'url', 'max:255'],
            'type'       => ['required', Rule::in(['school', 'college', 'university', 'course', 'postgraduate'])],
            'fees_time'  => ['required', Rule::in(['1_month', '6_month', 'yearly'])],
        ];
    }
}

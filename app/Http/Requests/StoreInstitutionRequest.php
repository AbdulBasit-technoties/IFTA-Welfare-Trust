<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInstitutionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('institutions.create');
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
            'email'      => ['nullable', 'email', 'max:255', 'unique:institutions,email'],
            'contact_no' => ['nullable', 'string', 'max:20'],
            'url'        => ['nullable', 'url', 'max:255'],
        ];
    }
}

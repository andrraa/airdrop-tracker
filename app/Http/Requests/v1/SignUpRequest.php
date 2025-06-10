<?php

namespace App\Http\Requests\v1;

use App\Http\Requests\BaseFormRequest;

class SignUpRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255'
            ],
            'email' => [
                'required',
                'email',
                'max:100',
                'unique:tbl_users,email'
            ],
            'password' => [
                'required',
                'string',
                'min:8'
            ]
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'name' => ucwords(strtolower($this->name))
        ]);
    }
}

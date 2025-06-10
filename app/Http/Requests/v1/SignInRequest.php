<?php

namespace App\Http\Requests\v1;

use App\Http\Requests\BaseFormRequest;

class SignInRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'email',
                'max:100'
            ],
            'password' => [
                'required',
                'string',
                'max:255'
            ]
        ];
    }
}

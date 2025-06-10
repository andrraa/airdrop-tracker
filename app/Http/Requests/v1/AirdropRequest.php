<?php

namespace App\Http\Requests\v1;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;

class AirdropRequest extends BaseFormRequest
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
                'max:100',
                Rule::unique('tbl_airdrops', 'airdrop_name')
                    ->ignore($this->route('airdrop')->airdrop_id ?? null, 'airdrop_id')
            ],
            'link' => [
                'required',
                'string',
                'max:255'
            ],
            'faucetLink' => [
                'nullable',
                'string',
                'max:255'
            ],
            'referral' => [
                'nullable',
                'string',
                'max:255'
            ],
            'type' => [
                'required',
                'string',
                'max:100'
            ],
            'loginType' => [
                'required',
                'string',
                'max:100'
            ],
            'wallet' => [
                'nullable',
                'string',
                'max:255'
            ],
            'status' => [
                'required',
                'integer',
                'in:0,1'
            ],
            'parentId' => [
                'required',
                'integer'
            ],
            'description' => [
                'nullable',
                'string',
                'max:255'
            ]
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'type' => ucwords(strtolower($this->type)),
            'loginType' => ucwords(strtolower($this->loginType)),
            'parentId' => $this->parentId ?? 0
        ]);
    }

    public function toDatabaseArray(): array
    {
        return [
            'airdrop_name' => $this->input('name'),
            'airdrop_link' => $this->input('link'),
            'airdrop_faucet_link' => $this->input('faucetLink') ?? null,
            'airdrop_referral_link' => $this->input('referralLink') ?? null,
            'airdrop_type' => $this->input('type'),
            'airdrop_login_type' => $this->input('loginType'),
            'airdrop_wallet' => $this->input('wallet') ?? null,
            'airdrop_status' => $this->input('status'),
            'airdrop_parent_id' => $this->input('parentId') ?? 0,
            'airdrop_description' => $this->input('description') ?? null
        ];
    }
}

<?php

namespace App\Http\Resources\v1;

use App\Models\v1\Airdrop;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AirdropResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->airdrop_id ?? 0,
            'name' => $this->airdrop_name,
            'link' => $this->airdrop_link,
            'faucetLink' => $this->airdrop_faucet_link ?? null,
            'referralLink' => $this->airdrop_referral_link ?? null,
            'type' => $this->airdrop_type,
            'loginType' => $this->airdrop_login_type,
            'wallet' => $this->airdrop_wallet ?? null,
            'status' => $this->airdrop_status,
            'description' => $this->airdrop_description ?? null,
            'children' => AirdropResource::collection($this->whenLoaded('children'))
        ];
    }
}

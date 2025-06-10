<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->user_id,
            'name' => $this->full_name,
            'email' => $this->email,
            'status' => $this->status,
            'lastLogin' => $this->last_login_at,
        ];
    }
}

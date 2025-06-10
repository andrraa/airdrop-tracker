<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TokenResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'accessToken' => $this->resource,
            'type' => 'bearer',
            'expiredAt' => config('jwt.ttl')
        ];
    }
}

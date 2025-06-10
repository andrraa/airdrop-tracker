<?php

namespace App\Http\Middleware;

use App\Responses\BaseResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class KeyMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = config('tracker.api_key');

        return $request->header('X-API-KEY') !== $apiKey
            ? BaseResponse::failed(
                code: 401,
                message: 'Unauthorized request.'
            )
            : $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use App\Responses\BaseResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class TokenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!JWTAuth::getToken()) {
            return BaseResponse::failed(
                code: 401,
                message: 'Unauthorized request.'
            );
        }

        try {
            JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException | JWTException) {
            return BaseResponse::failed(
                code: 401,
                message: 'Unauthorized request.'
            );
        }

        return $next($request);
    }
}

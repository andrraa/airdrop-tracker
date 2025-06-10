<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\SignInRequest;
use App\Http\Requests\v1\SignUpRequest;
use App\Http\Resources\v1\TokenResource;
use App\Http\Resources\v1\UserResource;
use App\Models\v1\User;
use App\Responses\BaseResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function signIn(SignInRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return BaseResponse::failed(
                code: 401,
                message: 'Invalid email or password.'
            );
        }

        $token = JWTAuth::fromUser($user);

        return BaseResponse::success(
            code: 200,
            message: 'Login successfull.',
            data: [
                'user' => new UserResource($user),
                'token' => new TokenResource($token)
            ]
        );
    }

    public function signUp(SignUpRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'full_name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'])
        ]);

        return $user
            ? BaseResponse::success(
                code: 201,
                message: 'User register successfull.',
                data: new UserResource($user)
            )
            : BaseResponse::failed(
                code: 400,
                message: 'User register failed.'
            );
    }

    public function refresh(): JsonResponse
    {
        try {
            $oldToken = JWTAuth::getToken();
            $newToken = JWTAuth::refresh($oldToken);

            return BaseResponse::success(
                code: 200,
                message: 'Token refresh successfull.',
                data: new TokenResource($newToken)
            );
        } catch (JWTException $e) {
            return BaseResponse::failed(
                code: 401,
                message: 'Refresh token expired.'
            );
        }
    }
}

<?php

use App\Http\Controllers\v1\AirdropController;
use App\Http\Controllers\v1\AuthController;
use App\Http\Middleware\KeyMiddleware;
use App\Http\Middleware\TokenMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(KeyMiddleware::class)->group(function () {
    Route::prefix('auth')->group(function () {
        Route::controller(AuthController::class)->group(function () {
            Route::post('sign-up', 'signUp');
            Route::post('sign-in', 'signIn');
            Route::post('refresh', 'refresh');
        });
    });

    Route::middleware(TokenMiddleware::class)->group(function () {
        Route::apiResource('airdrop', AirdropController::class)->except('show');
    });
});
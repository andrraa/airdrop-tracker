<?php

namespace App\Responses;

use Illuminate\Http\JsonResponse;

class BaseResponse
{
    public static function success(
        $code,
        $message,
        $data = null,
        $pagination = null,
    ): JsonResponse {
        return self::response(
            true,
            $code,
            $message,
            $data,
            $pagination
        );
    }

    public static function failed(
        $code,
        $message,
    ): JsonResponse {
        return self::response(
            false,
            $code,
            $message,
        );
    }

    private static function response(
        $success,
        $code,
        $message,
        $data = null,
        $pagination = null,
    ): JsonResponse {
        $response = [
            'success' => $success,
            'message' => $message,
        ];

        $data ? $response['data'] = $data : null;
        $pagination ? $response['pagination'] = $pagination : null;

        return response()->json($response, $code);
    }
}

<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\AirdropRequest;
use App\Http\Resources\v1\AirdropResource;
use App\Models\v1\Airdrop;
use App\Responses\BaseResponse;
use Exception;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;

class AirdropController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function index(): JsonResponse
    {
        $airdrops = Airdrop::with('children')
            ->where('airdrop_user_id', $this->user->user_id)
            ->get();

        return BaseResponse::success(
            code: 200,
            message: 'Airdrop fetch successfull',
            data: AirdropResource::collection($airdrops)
        );
    }

    public function store(AirdropRequest $request): JsonResponse
    {
        $validated = $request->toDatabaseArray();

        $validated['airdrop_user_id'] = $this->user->user_id;

        try {
            $result = Airdrop::create($validated);

            return BaseResponse::success(
                code: 201,
                message: 'Airdrop created successfully.',
                data: new AirdropResource($result)
            );
        } catch (Exception $e) {
            return BaseResponse::failed(
                code: 500,
                message: $e->getMessage(),
            );
        }
    }

    public function update(AirdropRequest $request, Airdrop $airdrop): JsonResponse
    {
        $validated = $request->toDatabaseArray();

        if ($airdrop->airdrop_user_id !== $this->user->user_id) {
            return BaseResponse::failed(
                code: 403,
                message: 'You don\'t have permission to do this action.'
            );
        }

        try {
            $airdrop->update($validated);

            return BaseResponse::success(
                code: 200,
                message: 'Airdrop updated successfully.',
                data: new AirdropResource($airdrop)
            );
        } catch (Exception $e) {
            return BaseResponse::failed(
                code: 500,
                message: $e->getMessage()
            );
        }
    }

    public function destroy(Airdrop $airdrop): JsonResponse
    {
        abort_unless(request()->expectsJson(), 403);

        $airdrop->update([
            'airdrop_status' => Airdrop::STATUS_COMPLETED
        ]);

        return BaseResponse::success(code: 204, message: '');
    }
}

<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Airdrop extends Model
{
    public const STATUS_ON_PROGRESS = 1;
    public const STATUS_COMPLETED = 0;

    protected $table = 'tbl_airdrops';
    protected $primaryKey = 'airdrop_id';
    protected $fillable = [
        'airdrop_user_id',
        'airdrop_name',
        'airdrop_link',
        'airdrop_faucet_link',
        'airdrop_referral_link',
        'airdrop_type',
        'airdrop_login_type',
        'airdrop_wallet',
        'airdrop_status',
        'airdrop_last_interaction',
        'airdrop_parent_id',
        'airdrop_description'
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Airdrop::class, 'airdrop_parent_id', 'airdrop_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Airdrop::class, 'airdrop_parent_id', 'airdrop_id');
    }
}

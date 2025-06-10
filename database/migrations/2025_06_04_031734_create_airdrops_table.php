<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tbl_airdrops', function (Blueprint $table) {
            $table->id('airdrop_id');
            $table->unsignedBigInteger('airdrop_parent_id')->default(0);
            $table->unsignedBigInteger('airdrop_user_id');
            $table->string('airdrop_name', 100)->unique();
            $table->string('airdrop_link', 255);
            $table->string('airdrop_faucet_link', 255)->nullable();
            $table->string('airdrop_referral_link', 255)->nullable();
            $table->string('airdrop_type', 100);
            $table->string('airdrop_login_type', 100);
            $table->string('airdrop_wallet', 255)->nullable();
            $table->string('airdrop_description', 255)->nullable();
            $table->boolean('airdrop_status')->default(1); // 1 = On Going, 0 = Ended/Completed
            $table->timestamp('airdrop_last_interaction')->nullable();
            $table->timestamps();

            $table->foreign('airdrop_user_id')->references('user_id')->on('tbl_users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_airdrops');
    }
};

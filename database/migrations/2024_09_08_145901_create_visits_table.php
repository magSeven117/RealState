<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('house_id');
            $table->foreign('house_id')->references('id')->on('houses')->onDelete('cascade');
            $table->string('name');
            $table->string('lastname');
            $table->string('email');
            $table->string('phone');
            $table->datetime('date_visit');
            $table->datetime('visited_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};

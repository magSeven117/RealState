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
        Schema::create('houses', function (Blueprint $table) {
            $table->id();

            $table->string('address');
            $table->string('images');
            $table->decimal('price');
            $table->string('description');
            $table->decimal('size');
            $table->integer('bathroom');
            $table->integer('quarters');
            $table->integer('floor');
            $table->boolean('published')->default(false);

            $table->string('date_construction');

            $table->unsignedBigInteger('type_house_id');
            $table->foreign('type_house_id')->references('id')->on('type_houses')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('houses');
    }
};

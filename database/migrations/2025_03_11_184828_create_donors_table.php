<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('donors', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->decimal('donation_amount', 10, 2)->nullable();
            $table->enum('payment_method', ['Bank Transfer', 'Credit Card', 'Cheque','Cash', 'Other'])->nullable();
            $table->enum('donation_frequency', ['One-time', 'Monthly', 'Yearly'])->nullable();
            $table->string('identification_document')->nullable();
            $table->foreignId('uid')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('donors');
    }
};

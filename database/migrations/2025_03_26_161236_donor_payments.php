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
        Schema::create('donor_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('did')->constrained('users')->onDelete('cascade');
            $table->decimal('total_paid', 10, 2)->default(0);
            $table->string('payment_slip')->nullable();
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
        Schema::dropIfExists('donor_payments');
    }
};

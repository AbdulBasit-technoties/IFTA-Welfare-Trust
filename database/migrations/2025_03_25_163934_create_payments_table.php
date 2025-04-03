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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('did')->constrained('users')->onDelete('cascade');
            $table->foreignId('bid')->constrained('users')->onDelete('cascade')->nullable();
            $table->foreignId('pid')->constrained('programs')->onDelete('cascade')->nullable();
            $table->decimal('amount_requested', 10, 2);
            $table->decimal('amount_paid', 10, 2)->default(0);
            $table->decimal('pending_amount', 10, 2)->storedAs('amount_requested - amount_paid');
            $table->enum('status', ['Waiting', 'Request', 'Approved', 'Partially Paid', 'Rejected','Paid'])->default('waiting');
            $table->string('payment_slip')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->date('date');
            $table->longText('comment')->nullable();
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
        Schema::dropIfExists('payments');
    }
};

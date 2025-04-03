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
        Schema::create('beneficiary_performances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('uid')->constrained('users')->onDelete('cascade');
            $table->foreignId('institute_id')->constrained('institutions')->onDelete('cascade');
            $table->enum('performance', ['Excellent', 'Good', 'Average', 'Below Average', 'Poor'])->default('Average');
            $table->string('performance_photo')->nullable();
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
        Schema::dropIfExists('beneficiary_performances');
    }
};

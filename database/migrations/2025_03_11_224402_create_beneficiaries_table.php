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
        Schema::create('beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->string('beneficiary_name');
            $table->string('guardian_name')->nullable();
            $table->string('beneficiary_cnic', 15);
            $table->string('guardian_cnic', 15)->nullable();
            $table->unique(['beneficiary_cnic', 'type'], 'beneficiary_cnic_unique');
            $table->unique(['guardian_cnic', 'type'], 'guardian_cnic_unique');
            $table->text('address');
            $table->string('beneficiary_contact_no');
            $table->string('guardian_contact_no')->nullable();
            $table->string('email')->nullable();
            $table->string('photo_attached')->nullable();
            $table->string('occupation')->nullable();
            $table->decimal('household_income', 10, 2)->nullable();
            $table->boolean('syed')->default(false);
            $table->date('date_of_birth')->nullable();
            $table->boolean('orphan')->default(false);
            $table->integer('family_members')->default(1);
            $table->string('sign')->nullable();
            $table->enum('marital_status', ['Single', 'Married', 'Divorced', 'Widowed'])->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable();
            $table->text('description')->nullable();
            $table->text('disability')->nullable();

            $table->enum('education_level', ['Junior', 'Primary', 'Secondary', 'Intermediate', 'Graduate', 'Postgraduate'])->nullable();
            $table->enum('patient_type', ['OPD', 'IPD', 'Surgery', 'Other'])->nullable();
            $table->string('institute_name')->nullable();
            $table->string('class')->nullable();
            $table->string('last_result')->nullable();
            $table->decimal('total_fee', 10, 2)->nullable();
            $table->decimal('approved_amount', 10, 2)->nullable();
            $table->string('institute_ntn')->nullable();
            $table->string('hospital_name')->nullable();
            $table->string('dr_name')->nullable();
            $table->text('diseases_injury')->nullable();
            $table->date('last_checkup_date')->nullable();
            $table->year('graduation_year')->nullable();
            $table->string('degree_title')->nullable();
            $table->string('course_field')->nullable();
            $table->integer('semester')->nullable();
            $table->integer('total_semesters')->nullable();

            $table->string('spouse_education')->nullable();
            $table->integer('spouse_age')->nullable();
            $table->integer('no_of_guest_invited')->nullable();
            $table->string('place_of_marriage')->nullable();
            $table->date('date_of_marriage')->nullable();

            $table->string('reference_name')->nullable();
            $table->string('reference_contact')->nullable();
            $table->string('reference_relation')->nullable();

            $table->boolean('approved')->default(false);
            $table->string('approver_sign')->nullable();
            $table->foreignId('did')->nullable()->constrained('users')->nullOnDelete();
            $table->date('approval_date')->nullable();

            // Documents Submitted
            $table->boolean('approval_letter')->default(false);
            $table->boolean('application')->default(false);
            $table->boolean('fee_voucher')->default(false);
            $table->boolean('bonafide_certificate')->default(false);
            $table->boolean('beneficiary_cnic_submitted')->default(false);
            $table->boolean('guardian_cnic_submitted')->default(false);
            $table->boolean('paid_fee_voucher')->default(false);
            $table->boolean('institute_ntn_submitted')->default(false);
            $table->boolean('prescription')->default(false);
            $table->boolean('last_utility_bill')->default(false);
            $table->boolean('marriage_invitation')->default(false);

            // Additional Info
            $table->string('uid')->nullable();
            $table->enum('type', ['School Fees', 'Patient Welfare', 'Monthly Ration', 'Marriage Support', 'Higher Education'])->nullable();
            $table->foreignId('institute_id')->nullable()->constrained('institutions')->nullOnDelete();
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
        Schema::dropIfExists('beneficiaries');
    }
};

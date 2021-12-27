<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('first_name_arabic')->nullable();
            $table->string('last_name')->nullable();
            $table->string('last_name_arabic')->nullable();
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->string('company_name')->nullable();
            $table->string('company_name_arabic')->nullable();

            $table->string('street')->nullable();
            $table->string('street_arabic')->nullable();
            $table->string('city')->nullable();
            $table->string('city_arabic')->nullable();
            $table->string('state')->nullable();
            $table->string('state_arabic')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('country')->nullable();
            $table->string('country_arabic')->nullable();
            $table->string('district')->nullable();
            $table->string('district_arabic')->nullable();
            $table->string('building_no')->nullable();
            $table->string('building_no_arabic')->nullable();

            $table->date('dob')->nullable();
            $table->text('notes')->nullable();
            $table->text('notes_arabic')->nullable();
            $table->string('vat_number')->nullable();
            $table->string('other_buyer_id')->nullable();
            $table->string('additional_no')->nullable();

            $table->foreignId('created_by')->nullable()->constrained('users');

            $table->softDeletes();
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
        Schema::dropIfExists('customers');
    }
}

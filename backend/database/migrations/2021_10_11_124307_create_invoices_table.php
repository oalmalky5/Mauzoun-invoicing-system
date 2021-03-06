<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();

            $table->string('sr_no')->nullable();
            $table->date('date')->nullable();
            $table->date('due_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->integer('business_days')->nullable();
            $table->boolean('has_approved')->default(0)->nullable();

            $table->string('billing_first_name')->nullable();
            $table->string('billing_first_name_arabic')->nullable();
            $table->string('billing_last_name')->nullable();
            $table->string('billing_last_name_arabic')->nullable();
            $table->string('billing_email')->nullable();
            $table->string('billing_phone')->nullable();
            $table->string('billing_website')->nullable();
            $table->string('billing_company_name')->nullable();
            $table->string('billing_company_name_arabic')->nullable();

            $table->string('billing_street')->nullable();
            $table->string('billing_street_arabic')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_city_arabic')->nullable();
            $table->string('billing_state')->nullable();
            $table->string('billing_state_arabic')->nullable();
            $table->string('billing_zip_code')->nullable();
            $table->string('billing_country')->nullable();
            $table->string('billing_country_arabic')->nullable();
            $table->string('billing_district')->nullable();
            $table->string('billing_district_arabic')->nullable();
            $table->string('billing_building_no')->nullable();
            $table->string('billing_building_no_arabic')->nullable();
            $table->text('billing_notes')->nullable();
            $table->text('billing_notes_arabic')->nullable();
            $table->string('billing_vat_number')->nullable();
            $table->string('billing_vat_number_arabic')->nullable();
            $table->string('billing_cr_number')->nullable();
            $table->string('billing_cr_number_arabic')->nullable();
            $table->string('billing_other_buyer_id')->nullable();
            $table->string('billing_additional_no')->nullable();

            $table->string('total_amount')->nullable();
            $table->string('tax_amount')->nullable();
            $table->string('vat')->nullable();
            $table->string('sub_total')->nullable();
            $table->decimal('total')->nullable();
            $table->text('notes')->nullable();
            $table->string('currency')->nullable();
            $table->foreignId('customer_id')->nullable()->constrained();
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
        Schema::dropIfExists('invoices');
    }
}

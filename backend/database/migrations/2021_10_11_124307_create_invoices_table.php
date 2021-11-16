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

            $table->string('invoice_no')->nullable();
            $table->date('invoice_date')->nullable();
            $table->date('due_date')->nullable();

            $table->string('billing_city')->nullable();
            $table->string('billing_state')->nullable();
            $table->string('billing_zip_code')->nullable();
            $table->string('billing_address')->nullable();
            $table->foreignId('billing_country_id')->nullable()->constrained('countries');

            $table->string('shipping_city')->nullable();
            $table->string('shipping_state')->nullable();
            $table->string('shipping_zip_code')->nullable();
            $table->string('shipping_address')->nullable();
            $table->foreignId('shipping_country_id')->nullable()->constrained('countries');

            $table->string('quantity_type')->nullable(); //qty, hours, qty/hours
            $table->string('discount_type')->nullable(); //Before tax, after tax
            $table->decimal('total_amount')->nullable();
            $table->string('discount_unit')->nullable()->comment('Percentage, Amount');
            $table->decimal('discount_value')->nullable(); // Value can be percentage or amount
            $table->decimal('discount_amount')->nullable(); // Amount will be amount only
            $table->decimal('tax_unit')->nullable()->comment('Percentage, Amount - Optional');
            $table->decimal('tax_amount')->nullable()->comment('On total bill - Optional');;
            $table->decimal('adjustment_amount')->nullable();
            $table->decimal('net_amount')->nullable();
            $table->text('admin_notes')->nullable();
            $table->text('client_notes')->nullable();
            $table->text('terms_and_conditions')->nullable();
            $table->json('taxes')->nullable();
            $table->json('payment_methods')->nullable();
            $table->boolean('is_recurring')->nullable();
            $table->integer('recurring_interval_value')->nullable();
            $table->string('recurring_interval_unit')->nullable();
            $table->boolean('is_infinity_cycle')->nullable();
            $table->integer('recurring_cycle')->nullable();

            $table->foreignId('currency_id')->nullable()->constrained();
            $table->foreignId('customer_id')->nullable()->constrained();
            $table->foreignId('sale_agent_id')->nullable()->constrained('users');

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

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceCustomFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_custom_fields', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('name_arabic')->nullable();
            $table->string('value');
            $table->integer('sorting_order');

            $table->foreignId('invoice_id')->constrained();

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
        Schema::dropIfExists('invoice_custom_fields');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_details', function (Blueprint $table) {
            $table->id();

            $table->string('description')->nullable();
            $table->text('long_description')->nullable();
            $table->decimal('qty')->nullable();
            $table->decimal('rate')->nullable();
            $table->string('unit')->nullable();

            $table->decimal('total_amount')->nullable();
            $table->json('taxes')->nullable();
            $table->decimal('net_amount')->nullable();

            $table->foreignId('item_id')->constrained();
            $table->foreignId('unit_id')->constrained();
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
        Schema::dropIfExists('invoice_details');
    }
}

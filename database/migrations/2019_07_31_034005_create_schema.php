<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchema extends Migration
{
    public function up()
    {
        Schema::create('status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('order_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('product', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('order', function (Blueprint $table) {
            $table->increments('id');
            $table->string('client_name')->nullable();
            $table->string('number_table')->nullable();
            $table->unsignedInteger('fk_id_order_status');

            $table->foreign('fk_id_order_status')
                ->references('id')
                ->on('order_status');
            $table->timestamps();

        });

        Schema::create('variant', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->decimal('price', 13, 2);
            $table->unsignedInteger('fk_id_product');

            $table->foreign('fk_id_product')
                ->references('id')
                ->on('product');
        });

        Schema::create('order_has_variant', function (Blueprint $table) {
            $table->increments('id');
            $table->decimal('price', 13, 2);
            $table->integer('quantity');
            $table->text('description')->nullable();

            $table->unsignedInteger('fk_id_variant');
            $table->unsignedInteger('fk_id_order');
            $table->unsignedInteger('fk_id_status');

            $table->foreign('fk_id_status')
                ->references('id')
                ->on('status');
            $table->timestamps();

            $table->foreign('fk_id_variant')
                ->references('id')
                ->on('variant');

            $table->foreign('fk_id_order')
                ->references('id')
                ->on('order');
        });
    }


    public function down()
    {
        Schema::dropIfExists('order_has_variant');
        Schema::dropIfExists('variant');
        Schema::dropIfExists('order');
        Schema::dropIfExists('product');
        Schema::dropIfExists('status');
        Schema::dropIfExists('order_status');
    }
}

<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('status')->insert([
            ['name' => 'Pendiente'],
            ['name' => 'Preparado'],
            ['name' => 'Cancelado'],
        ]);

        DB::table('order_status')->insert([
            ['name' => 'Creada'],
            ['name' => 'Pagada'],
            ['name' => 'Cancelada'],
            ['name' => 'Servida'],
        ]);

        $productId = DB::table('product')->insert(
            ['name' => 'Tacos']
        );

        DB::table('variant')->insert([
            ['name' => 'Al pastor', 'price' => 15, 'fk_id_product' => $productId],
            ['name' => 'Chorizo', 'price' => 15, 'fk_id_product' => $productId],
            ['name' => 'Bisteck', 'price' => 15, 'fk_id_product' => $productId],
            ['name' => 'Otro', 'price' => 20, 'fk_id_product' => $productId],
        ]);

        $productId = DB::table('product')->insertGetId(
            ['name' => 'Quesadillas']
        );

        DB::table('variant')->insert([
            ['name' => 'Al pastor', 'price' => 20, 'fk_id_product' => $productId],
            ['name' => 'Chorizo', 'price' => 20, 'fk_id_product' => $productId],
            ['name' => 'Bisteck', 'price' => 20, 'fk_id_product' => $productId],
            ['name' => 'Mole', 'price' => 20, 'fk_id_product' => $productId],
            ['name' => 'Tinga', 'price' => 20, 'fk_id_product' => $productId],
            ['name' => 'Queso', 'price' => 20, 'fk_id_product' => $productId],
            ['name' => 'Otro', 'price' => 20, 'fk_id_product' => $productId],
        ]);

        $productId = DB::table('product')->insertGetId(
            ['name' => 'Tostadas']
        );

        DB::table('variant')->insert([
            ['name' => 'Mole', 'price' => 20, 'fk_id_product' => $productId],
            ['name' => 'Tinga', 'price' => 20, 'fk_id_product' => $productId],
            ['name' => 'Otro', 'price' => 20, 'fk_id_product' => $productId],
        ]);

        $productId = DB::table('product')->insertGetId(
            ['name' => 'Enchiladas']
        );

        DB::table('variant')->insert([
            ['name' => 'Sencillas', 'price' => 30, 'fk_id_product' => $productId],
            ['name' => 'Dobles', 'price' => 35, 'fk_id_product' => $productId],
            ['name' => 'Media orden', 'price' => 15, 'fk_id_product' => $productId],
        ]);

        $productId = DB::table('product')->insertGetId(
            ['name' => 'Chilaquiles']
        );

        DB::table('variant')->insert([
            ['name' => 'Sencillos', 'price' => 30, 'fk_id_product' => $productId],
            ['name' => 'Dobles', 'price' => 35, 'fk_id_product' => $productId],
        ]);


        $productId = DB::table('product')->insertGetId(
            ['name' => 'Bebidas']
        );

        DB::table('variant')->insert([
            ['name' => 'Refresco', 'price' => 15, 'fk_id_product' => $productId],
            ['name' => 'Agua', 'price' => 10, 'fk_id_product' => $productId],
            ['name' => 'Otro', 'price' => 10, 'fk_id_product' => $productId],
        ]);


    }
}

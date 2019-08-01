<?php
/**
 * Created by PhpStorm.
 * User: presa
 * Date: 30/07/2019
 * Time: 11:18 PM
 */

namespace App\Http\Controllers;


use App\Http\Models\Product;

class ProductHelpers
{
    public static function getProducts()
    {
        $products = Product::with('variants')->get();
        return $products;
    }
}

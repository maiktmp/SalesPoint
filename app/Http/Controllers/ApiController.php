<?php
/**
 * Created by PhpStorm.
 * User: presa
 * Date: 31/07/2019
 * Time: 08:35 PM
 */

namespace App\Http\Controllers;


use App\Http\Models\Order;

class ApiController extends Controller
{

    public function test()
    {
        return dd(OrderHelpers::getPending());
    }
}

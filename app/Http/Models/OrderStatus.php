<?php
/**
 * Created by PhpStorm.
 * User: presa
 * Date: 31/07/2019
 * Time: 08:32 PM
 */

namespace App\Http\Models;


use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    public const IN_PROGRESS = 1;
    public const PAY = 2;
    public const CANCELED = 3;

    protected $table = "order_status";
}

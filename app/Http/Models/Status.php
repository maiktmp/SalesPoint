<?php
/**
 * Created by PhpStorm.
 * User: presa
 * Date: 31/07/2019
 * Time: 08:31 PM
 */

namespace App\Http\Models;


use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    public const PENDING = 1;
    public const PREPARED = 2;
    public const CANCELED = 3;
    public const PAY = 4;

    protected $table = "status";
}

<?php
/**
 * Created by PhpStorm.
 * User: presa
 * Date: 30/07/2019
 * Time: 10:46 PM
 */

namespace App\Http\Models;


use Illuminate\Database\Eloquent\Model;

/**
 * App\Http\Models\OrderHasVariant
 *
 * @property int $id
 * @property float $price
 * @property int $fk_id_variant
 * @property int $fk_id_order
 * @property int $fk_id_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant whereFkIdOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant whereFkIdStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant whereFkIdVariant($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $quantity
 * @property string|null $description
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\OrderHasVariant whereQuantity($value)
 */
class OrderHasVariant extends Model
{
    protected $table = 'order_has_variant';

    public function variant()
    {
        return $this->belongsTo(
            Variant::class,
            'fk_id_variant',
            'id'
        );
    }
}

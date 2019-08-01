<?php
/**
 * Created by PhpStorm.
 * User: presa
 * Date: 30/07/2019
 * Time: 10:45 PM
 */

namespace App\Http\Models;


use Illuminate\Database\Eloquent\Model;

/**
 * App\Http\Models\Variant
 *
 * @property int $id
 * @property string $name
 * @property float $price
 * @property int $fk_id_product
 * @property-read \App\Http\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Variant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Variant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Variant query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Variant whereFkIdProduct($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Variant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Variant whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Variant wherePrice($value)
 * @mixin \Eloquent
 */
class Variant extends Model
{
    protected $table = "variant";

    public function product()
    {
        return $this->belongsTo(
            Product::class,
            'fk_id_product',
            'id'
        );
    }

    public function hasOrderVariant()
    {
        return $this->hasMany(
            OrderHasVariant::class,
            'fk_id_variant',
            'id'
        );
    }

}

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
 * App\Http\Models\Product
 *
 * @property int $id
 * @property string $name
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Http\Models\Variant[] $variants
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Product query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Product whereName($value)
 * @mixin \Eloquent
 */
class Product extends Model
{
    protected $table = "product";

    public function variants()
    {
        return $this->hasMany(
            Variant::class,
            'fk_id_product',
            'id'
        );
    }
}

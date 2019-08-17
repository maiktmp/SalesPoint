<?php

namespace App\Http\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Http\Models\Order
 *
 * @property int $id
 * @property string|null $client_name
 * @property string|null $number_table
 * @property int $fk_id_order_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Http\Models\Variant[] $variants
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Order query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Order whereClientName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Order whereFkIdOrderStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Order whereNumberTable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Http\Models\Order whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Order extends Model
{
    protected $table = "order";

    protected $appends = ['total'];

    public function variants()
    {
        return $this->belongsToMany(
            Variant::class,
            'order_has_variant',
            'fk_id_order',
            'fk_id_variant'
        )->withPivot(['id', 'price', 'fk_id_status', 'quantity', 'description']);
    }


    public function getTotalAttribute()
    {
        $variants = $this->variants;
        $total = 0;
        foreach ($variants as $variant) {
            $total += $variant->pivot->quantity * $variant->pivot->price * 1;
        }
        return $total;
    }

    public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('H:i:s');
    }
}

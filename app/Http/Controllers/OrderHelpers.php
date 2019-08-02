<?php
/**
 * Created by PhpStorm.
 * User: presa
 * Date: 30/07/2019
 * Time: 11:25 PM
 */

namespace App\Http\Controllers;


use App\Http\Models\Order;
use App\Http\Models\OrderHasVariant;
use App\Http\Models\OrderStatus;
use App\Http\Models\Product;
use App\Http\Models\Status;
use App\Http\Models\Variant;
use DB;
use Exception;
use function foo\func;

class OrderHelpers
{
    public static function createOrder($orderData, $variants)
    {
        try {
            \DB::beginTransaction();
            $order = new Order();
            $order->client_name = $orderData->client_name;
            $order->fk_id_order_status = 1;

            $order->save();
            $variantsArray = [];
            foreach ($variants as $variantData) {
                $variant = Variant::find($variantData->id);
                $variantsArray[$variant->id] = [
                    "price" => $variant->price,
                    "quantity" => $variantData->quantity,
                    "fk_id_status" => 1,
                    "description" => $variantData->description ?? null,
                ];
            }
            $order->variants()->sync($variantsArray);
            $order->save();
            \DB::commit();
            $order->load(['variants.product']);
            return $order;
        } catch (Exception $e) {
            \DB::rollBack();
            return $e->getMessage();
        }
    }

    public static function getPending()
    {
        $products =
            Product::with([
                'variants' => function ($q) {
                    $q->whereHas('hasOrderVariant', function ($q) {
                        $q->where('fk_id_status', Status::PENDING);
                    });
                },
                'variants.hasOrderVariant' => function ($q) {
                    $q->whereFkIdStatus(Status::PENDING)
                        ->selectRaw(DB::raw('fk_id_variant, sum(quantity) as quantity'))
                        ->groupBy('fk_id_variant');
                },
            ])
                ->whereHas('variants', function ($q) {
                    $q->whereHas('hasOrderVariant', function ($q) {
                        $q->where('fk_id_status', Status::PENDING);
                    });
                })
                ->get();
        return $products;
//        $orderVariant =
//            OrderHasVariant::whereFkIdStatus(Status::PENDING)
//                ->with('variant.product')
//                ->selectRaw(DB::raw('fk_id_variant, sum(quantity) as quantity'))
//                ->groupBy('fk_id_variant')
//                ->get();
//        return $orderVariant;
    }

    public static function updateStatusOrderVariant($orderVariantId, $status)
    {
        $orderVariant = OrderHasVariant::find($orderVariantId);
        $orderVariant->fk_id_status = $status;
        $orderVariant->save();
        return $orderVariant;
    }

    public static function updateOrderStatus($orderId, $orderStatus)
    {
        $order = Order::find($orderId);
        $order->fk_id_order_status = $orderStatus;
        $variants = [];
        foreach ($order->variants as $variant) {
            $variants[$variant->id] = [
                'fk_id_status' => $orderStatus
            ];
        }
        $order->variants()->sync($variants);
        $order->save();

        return $order;
    }

    public static function getOrdersPendings()
    {
        $orders = Order::whereFkIdOrderStatus(OrderStatus::IN_PROGRESS)
            ->with(['variants.product'])
            ->orderBy('created_at', 'ASC')
            ->orderBy('fk_id_order_status', 'ASC')
            ->get();
        return $orders;
    }

    public static function getFullOrders()
    {
        $orders = Order::whereFkIdOrderStatus(OrderStatus::IN_PROGRESS)
            ->with(['variants.product'])
            ->orderBy('created_at', 'ASC')
            ->orderBy('fk_id_order_status', 'ASC')
            ->get();
        return $orders;
    }

}

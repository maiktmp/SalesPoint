<?php

namespace App\Http\Controllers;

use App\Http\Models\Order;
use App\Http\Models\Product;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

/**
 * @author Rohit Dhiman | @aimflaiims
 */
class WebSocketController implements MessageComponentInterface
{
    protected $clients;
    private $subscriptions;
    private $users;
    private $userResources;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $this->subscriptions = [];
        $this->users = [];
        $this->userResources = [];
    }

    /**
     * [onOpen description]
     * @method onOpen
     * @param  ConnectionInterface $conn [description]
     * @return [JSON]                    [description]
     * @example connection               var conn = new WebSocket('ws://localhost:8090');
     */
    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        $this->users[$conn->resourceId] = $conn;
    }

    /**
     * [onMessage description]
     * @method onMessage
     * @param  ConnectionInterface $conn [description]
     * @param  [JSON.stringify]              $msg  [description]
     * @return [JSON]                    [description]
     * @example subscribe                conn.send(JSON.stringify({command: "subscribe", channel: "global"}));
     * @example groupchat                conn.send(JSON.stringify({command: "groupchat", message: "hello glob", channel: "global"}));
     * @example message                  conn.send(JSON.stringify({command: "message", to: "1", from: "9", message: "it needs xss protection"}));
     * @example register                 conn.send(JSON.stringify({command: "register", userId: 9}));
     */
    public function onMessage(ConnectionInterface $conn, $msg)
    {
        echo $msg;
        $data = json_decode($msg);

        /**
         *              Instructions
         *  1. Get AllProducts and Variants
         *  2. Create Order
         *  3. Get Resume products pending
         *  4. Update order variant Status
         *  5. Update variant
         *  6. get All Pending Orders
         *  7. get All Orders
         */
        $instruction = $data->instruction;
        switch ($instruction) {
            case 1:
                $conn->send(json_encode(['instruction' => 1, 'data' => json_encode(ProductHelpers::getProducts())]));
                break;
            case 2:

                $order = OrderHelpers::createOrder($data->name, $data->orderHasVariants);
                foreach ($this->users as $user) {
                    $user->send(json_encode(['instruction' => 2, 'success' => true, 'data' => json_encode($order)]));
                }

                $orders = OrderHelpers::getOrdersPendings();
                foreach ($this->users as $user) {
                    $user->send(json_encode(['instruction' => 6, 'data' => $orders]));
                }

                $pending = OrderHelpers::getPending();
                foreach ($this->users as $user) {
                    $user->send(json_encode(['instruction' => 3, 'data' => $pending]));
                }
                break;
            case 3:
                $pending = OrderHelpers::getPending();
                foreach ($this->users as $user) {
                    $user->send(json_encode(['instruction' => 3, 'data' => $pending]));
                }
                break;
            case 4:
                echo $data->orderVariantId;
                OrderHelpers::updateStatusOrderVariant($data->orderVariantId, $data->status);
                $pending = OrderHelpers::getPending();
                foreach ($this->users as $user) {
                    $user->send($pending);
                }

                $orders = OrderHelpers::getOrdersPendings();
                foreach ($this->users as $user) {
                    $user->send(json_encode(['instruction' => 6, 'data' => $orders]));
                }

                $pending = OrderHelpers::getPending();
                foreach ($this->users as $user) {
                    $user->send(json_encode(['instruction' => 3, 'data' => $pending]));
                }

                break;
            case 5:
                OrderHelpers::updateOrderStatus($data->orderId, $data->orderStatus);
                $pending = OrderHelpers::getPending();

                foreach ($this->users as $user) {
                    $user->send($pending);
                }

                break;
            case 6:
                $orders = OrderHelpers::getOrdersPendings();
                foreach ($this->users as $user) {
                    $user->send(json_encode(['instruction' => 6, 'data' => $orders]));
                }
                break;
            case 7:
                $orders =  OrderHelpers::getOrdersPendingsResume();
                foreach ($this->users as $user) {
                    $user->send(json_encode(['instruction' => 7, 'data' => $orders]));
                }
                break;
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
        unset($this->users[$conn->resourceId]);
        unset($this->subscriptions[$conn->resourceId]);
        foreach ($this->userResources as &$userId) {
            foreach ($userId as $key => $resourceId) {
                if ($resourceId == $conn->resourceId) {
                    unset($userId[$key]);
                }
            }
        }
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

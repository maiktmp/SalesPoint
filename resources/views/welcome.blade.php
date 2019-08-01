<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<script>
    var conn = new WebSocket('ws://192.168.1.111:8090');
    // var conn = new WebSocket('ws://http://192.168.1.111/salespoint/public:8090');
    conn.onopen = function (e) {
        console.log("Connection established!");
        // conn.send(JSON.stringify({instruction: 1}));
        // ********************************************
        //          OPTION 2
        // ********************************************
        // conn.send(JSON.stringify({
        //     instruction: 2,
        //     order: {'client_name': 'Miguel Colin'},
        //     variants: [
        //         {id: 1, quantity: 2},
        //         {id: 4, quantity: 2, description: "Sin cebolla"}
        //     ]
        // }));
        // ********************************************
        //          OPTION 3
        // ********************************************
        // conn.send(JSON.stringify({
        //     instruction: 3
        // }));
        // ********************************************
        //          OPTION 4
        // ********************************************
        // conn.send(JSON.stringify({
        //     instruction: 4,
        //     orderVariantId: 2,
        //     status: 2,
        // }));
        // ********************************************
        //          OPTION 5
        // ********************************************
        // conn.send(JSON.stringify({
        //     instruction: 5,
        //     orderId: 6,
        //     orderStatus: 2,
        // }));
        // ********************************************
        //          OPTION 5
        // ********************************************
        conn.send(JSON.stringify({
            instruction: 6
        }));

    };

    conn.onmessage = function (e) {
        console.log(e.data);
    };
</script>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
<body>

</body>
</html>

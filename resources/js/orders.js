import React from 'react';
import ReactDOM from 'react-dom';
import Pending from "./Pending";


$(document).ready(e => {
    const rootNode = document.getElementById('react-dom');
    ReactDOM.unmountComponentAtNode(rootNode);
    ReactDOM.render(
        <Pending/>,
        rootNode
    );

    function reloj() {
        var fecha = new Date();
        var hr = fecha.getHours();
        var min = fecha.getMinutes();
        var seg = fecha.getSeconds();
        var r = document.getElementById("reloj");
        r.innerHTML = hr + ":" + min + ":" + seg;
        setTimeout(reloj, 1000);
    };
    reloj();
});

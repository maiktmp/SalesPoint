import React from 'react';
import TextFormatter from './services/TextFormatter';

class Resume extends React.Component {
    /**
     *       Instructions
     *  1. Get AllProducts and Variants
     *  2. Create Order
     *  3. Get Resume products pending
     *  4. Update order variant Status
     *  5. Update variant
     *  6. get All Orders
     */


    constructor(props) {
        super(props);
        this.processCallServer = this.processCallServer.bind(this);
        this.renderPendings = this.renderPendings.bind(this);
        this.renderOrders = this.renderOrders.bind(this);
        this.onChangeClientName = this.onChangeClientName.bind(this);
        this.filterOrders = this.filterOrders.bind(this);

        const conn = new WebSocket('ws://192.168.1.111:8090');
        this.variantStatus = [
            'text-danger',
            'text-success',
            'text-success',
            'text-muted',
        ];

        conn.onopen = () => {
            conn.send(JSON.stringify({instruction: 7}));
        };
        conn.onmessage = this.processCallServer;
        this.state = {
            productsPending: [],
            orders: [],
            ordersFiltered: [],
            clientName: ""
        }
    }

    componentDidMount() {

    }

    render() {
        return <div className="row m-0">
            <div className="col-12">
                <input
                    onChange={this.onChangeClientName}
                    placeholder="Nombre del cliente"
                    type="text"
                    className="form-control"/>
            </div>
            <div className={"col-12"}>
                {this.renderOrders()}
            </div>
        </div>
    }

    processCallServer(serverResponse) {
        const data = JSON.parse(serverResponse.data);
        const instruction = data.instruction;
        switch (instruction) {
            case 3:
                const productsPending = data.data;
                this.setState({productsPending: productsPending});
                // console.log(productsPending);
                break;
            case 7:
                const orders = data.data;
                console.log(orders);
                this.setState({orders: orders});
                this.filterOrders();
                break;
        }
    }

    onChangeClientName(e) {
        let value = e.target.value;
        value = value.toUpperCase();
        this.setState({clientName: value});
        this.filterOrders();
    }

    filterOrders() {
        let value = this.state.clientName;
        this.setState({ordersFiltered: []});
        if (value.length > 0) {
            let ordersFiltered = this.state.orders.filter(order => order.client_name.toUpperCase().includes(value));
            console.log(ordersFiltered);
            this.setState({ordersFiltered: ordersFiltered});
        } else {
            this.setState({ordersFiltered: []});
        }
    }

    renderPendings() {
        const products = this.state.productsPending;
        if (products.length === 0) {
            return <h2>Sin productos pendientes por entregar</h2>
        }
        let columns = products.length;
        let rows = 0;
        products.forEach(product => {
            if (product.variants.length > rows) {
                rows = product.variants.length;
            }
        });

        let trs = [];
        for (let i = 0; i < rows; i++) {
            let tds = [];
            for (let j = 0; j < columns; j++) {
                let td;
                if (products[j].variants[i] !== undefined) {
                    let variant = products[j].variants[i];
                    td = (<td>{variant.name} {variant.has_order_variant[0].quantity}</td>);
                } else {
                    td = (<td/>);
                }
                tds.push(td);
            }
            let tr = (<tr>{tds.map(td => td)}</tr>);
            trs.push(tr);
        }
        return (
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className={'table'}>
                            <thead>
                            <tr>
                                <td colSpan={products.length}>Productos pendientes por entregar</td>
                            </tr>
                            <tr>
                                {products.map(product => <td><b>{product.name}</b></td>)}
                            </tr>
                            </thead>
                            <tbody>
                            {trs}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    renderOrders() {

        if (this.state.ordersFiltered.length > 0) {
            return this.state.ordersFiltered.map(order => {
                return <div className="card my-2">
                    <div className="card-body p-1">
                        <div className="row">
                            <div className="col-8">#{order.id} {order.client_name}</div>
                            <div className="col-4">Total: {TextFormatter.asMoney(order.total)}</div>
                        </div>
                        <div className="row p-1">
                            {this.renderOrderProducts(order.variants)}
                        </div>
                    </div>
                </div>
            })
        }
        return this.state.orders.map(order => {
            return <div className="card my-2">
                <div className="card-body p-1">
                    <div className="row">
                        <div className="col-8">#{order.id} {order.client_name}</div>
                        <div className="col-4">Total: {TextFormatter.asMoney(order.total)}</div>
                    </div>
                    <div className="row p-1">
                        {this.renderOrderProducts(order.variants)}
                    </div>
                </div>
            </div>
        })
    }

    renderOrderProducts(variants) {
        return <table className={'table'}>
            <thead>
            </thead>
            <tbody>
            {variants.map(variant => {
                return <tr className={this.variantStatus[variant.pivot.fk_id_status - 1]}>
                    <td>{variant.product.name}</td>
                    <td>
                        {variant.name} <br/>
                        {variant.pivot.description}
                    </td>
                    <td>{variant.pivot.quantity}</td>
                    <td>{TextFormatter.asMoney(variant.pivot.quantity * variant.pivot.price)}</td>
                    <td>{
                        variant.pivot.fk_id_status === 1 ?
                            <React.Fragment>
                                <i
                                    onClick={e => this.onChangeStatus(e, variant.pivot.id, 2)}
                                    className="fas fa-check-square text-success fa-2x"/>
                                &nbsp;&nbsp;&nbsp;
                                <i
                                    onClick={e => this.onChangeStatus(e, variant.pivot.id, 3)}
                                    className="fas fa-trash-alt text-danger fa-2x"/>
                                &nbsp;&nbsp;&nbsp;
                            </React.Fragment>
                            : ""


                    }
                        {
                            variant.pivot.fk_id_status === 2 ?
                                <i
                                    onClick={e => this.onChangeStatus(e, variant.pivot.id, 4)}
                                    className="fas fas fa-dollar-sign text-success fa-2x"/> : ""
                        }
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    }

    onChangeStatus(e, orderHasVariantId, status) {
        if (e.target.classList.contains('fa-check-square')) {
            e.target.classList.remove("fa-check-square");
            e.target.classList.add("fa-spin");
            e.target.classList.add("fa-spinner");
        }
        const conn = new WebSocket('ws://192.168.1.111:8090');
        /**
         1    Pendiente
         2    Preparado
         3    Cancelado
         4    Pagado
         */
        conn.onopen = () => {
            conn.send(JSON.stringify({
                instruction: 4,
                orderVariantId: orderHasVariantId,
                status: status,
            }));
        }
    }
}

export default Resume;

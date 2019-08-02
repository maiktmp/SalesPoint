import React from 'react';
import TextFormatter from './services/TextFormatter';

class Pending extends React.Component {
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

        const conn = new WebSocket('ws://192.168.1.111:8090');
        this.variantStatus = [
            'text-danger',
            'text-success',
            'text-success',
        ];

        conn.onopen = () => {
            conn.send(JSON.stringify({instruction: 3}));
            conn.send(JSON.stringify({instruction: 6}));
        };
        conn.onmessage = this.processCallServer;
        this.state = {
            productsPending: [],
            orders: []
        }
    }

    componentDidMount() {

    }

    render() {
        return <div className="row mt-1">
            <div className={"col-6"}>
                {this.renderPendings()}
            </div>
            <div className={"col-6"}>
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
            case 6:
                const orders = data.data;
                console.log(orders);
                this.setState({orders: orders});
                break;
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
        let cols = [];
        let spans = [];
        variants.forEach((variant, index) => {
            let span = (<React.Fragment>
                <span
                    className={this.variantStatus[variant.pivot.fk_id_status - 1]}>
                    {variant.pivot.quantity}
                </span> &nbsp;
                <span
                    className={this.variantStatus[variant.pivot.fk_id_status - 1]}>
                    {variant.product.name}
                </span>
                <span
                    className={this.variantStatus[variant.pivot.fk_id_status - 1]}>
                    {variant.name}
                </span>
                <br/>
                <span
                    className={this.variantStatus[variant.pivot.fk_id_status - 1]}>
                    {variant.pivot.description}
                </span>
            </React.Fragment>);
            spans.push(span);
            if (index % 10 === 0 && index > 0) {
                let col = (<div className="col text-left">{spans}</div>);
                spans = [];
                cols.push(col);
            }
        });
        if (spans.length > 0) {
            let col = (<div className="col text-left">{spans}</div>);
            spans = [];
            cols.push(col);
        }
        return cols;
    }

}

export default Pending;

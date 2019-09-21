import React from 'react';
import TextFormatter from './services/TextFormatter';
import io from 'socket.io-client';


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

        const conn = new WebSocket('ws://192.168.1.119:8090');
        this.variantStatus = [
            '',
            'text-success line-through',
            'text-success line-through',
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
        return <div className="row mt-1 mx-0">
            {/*<div className={"col-6"}>*/}
            {/*{this.renderPendings()}*/}
            {/*</div>*/}
            {this.renderOrders()}
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
            return <h2 className={'color-white'}>Sin productos pendientes por entregar</h2>
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
            return <div key={order.id} className="col-6">
                <div className="card my-2 card-dark">
                    <div className="card-body p-1">
                        <div className="row m-0">
                            <div className="col-12">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <td className="color-green" style={{fontSize: '1.5em'}}>
                                            #{order.id}
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            {order.client_name}
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            {order.created_at}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="row p-1 m-0">
                            <div className="col-12">
                                <table className="table">
                                    <tbody>
                                    {this.renderOrderProducts(order.variants)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })
    }

    renderOrderProducts(variants) {
        const renderComments = (variant) => {
            return <tr
                className={this.variantStatus[variant.pivot.fk_id_status - 1]}
                style={{fontSize: '1.4em', color: variant.product.color}}>
                <td className={'p-0'} colSpan={3}><b>{variant.pivot.description}</b></td>
            </tr>
        };
        let rows = [];
        variants.forEach((variant) => {
            let row = (
                <React.Fragment key={variant.pivot.id}>
                    <tr>
                        <td
                            className={this.variantStatus[variant.pivot.fk_id_status - 1]}
                            style={{
                                color: variant.product.color,
                                textAlign: "text-left",
                                fontSize: '1.4em',
                                width: "15%"
                            }}>
                            <b>{variant.pivot.quantity}</b>
                        </td>
                        <td
                            className={this.variantStatus[variant.pivot.fk_id_status - 1]}
                            style={{color: variant.product.color, textAlign: "t.lessext-left", fontSize: '1.4em'}}>
                            {variant.product.name.toUpperCase()}
                        </td>
                        <td
                            className={this.variantStatus[variant.pivot.fk_id_status - 1]}
                            style={{color: variant.product.color, textAlign: "text-left", fontSize: '1.4em'}}>
                            {variant.name}
                        </td>
                    </tr>
                    {variant.pivot.description && renderComments(variant)}
                </React.Fragment>
            );
            rows.push(row);
        });
        return rows;
    }
}

export default Pending;

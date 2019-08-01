import React from 'react';

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

        const conn = new WebSocket('ws://192.168.1.111:8090');
        conn.onopen = () => {
            conn.send(JSON.stringify({
                instruction: 3
            }));
        };
        conn.onmessage = this.processCallServer;
        this.state = {
            productsPending: []
        }
    }

    componentDidMount() {

    }

    render() {
        return <div className="row">
            <div className={"col-6"}>
                {this.renderPendings()}
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
                console.log(productsPending);
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
        )
    }
}

export default Pending;

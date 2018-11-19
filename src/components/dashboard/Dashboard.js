
import React, { Component } from 'react';
import { Responsive, ViewTitle,Title } from 'react-admin/lib';
import DashUsers from './dashUser';
import DashUKeypairs from './dashKeypair';
import DashTransaction from './dashTransaction';


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class Dashboard extends Component {
    state = {};

    componentDidMount() {
        this.setState({nbNewOrders:5})
    } 
    render() {
        const {
            nbNewOrders,
        } = this.state;
        return (
            <Responsive
                xsmall={
                    <div>
                        <ViewTitle title="Posters Galore Admin" />
                        <div style={styles.flexColumn}>
                            <div style={styles.flex}>
                                <DashUKeypairs value={nbNewOrders} />
                            </div>
                            <div style={styles.flex}>
                                <DashUsers value={nbNewOrders} />
                            </div>
                        </div>
                    </div>
                }
                medium={
                    <div style={styles.flexColumn}>
                     <Title title="Linkel BADS" />
                        <div style={styles.flex}>
                            <DashUKeypairs value={nbNewOrders} />
                            <DashUsers value={nbNewOrders} />
                            <DashTransaction value={nbNewOrders} />
                        </div>
                    </div>
                }
                small={
                    <div style={styles.flex}>
                        <div style={styles.leftCol}>
                            <div style={styles.flex}>
                                <DashUKeypairs value={nbNewOrders} />
                            </div>
                            <div style={styles.flex}>
                                <DashUsers value={nbNewOrders} />
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

export default Dashboard;


/*
 * Copyright  2018 Linkel Technology Co., Ltd, Beijing
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BA SIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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

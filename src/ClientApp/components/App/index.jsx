import React from 'react';
import {Container} from '@material-ui/core';
import TaskInput from '../TaskInput';
import styles from './styles.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        console.log("rerender");
        return (
            <div >
                <Container className={styles.container}>
                    <TaskInput/>
                </Container>
            </div>
        );
    }
}

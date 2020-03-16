import React from 'react';
import {Container} from '@material-ui/core';
import TaskInput from '../TaskInput';
import TaskUnit from '../TaskUnit';
import TaskTable from '../ToDoList'
import styles from './styles.css';
import ToDoList from '../ToDoList';


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
                <Container className={styles.container} maxWidth='sm'>
                    <ToDoList/>

                </Container>
            </div>
        );
    }
}

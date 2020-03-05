import React from 'react'
import { IconButton, TextField, withStyles } from '@material-ui/core';
import {ArrowUpward} from '@material-ui/icons'
import styles from './styles.css'



export default class TaskInput extends React.Component {
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
        const { classes } = this.props;
        console.log("rerender");
        return (
            <div className={styles.bar}>
                <div className={styles.inputContainer}>
                    <TextField id="standard-basic" className={styles.input} placeholder="Введите задачу!"/>
                </div>


                <IconButton>
                    <ArrowUpward/>
                </IconButton>
            </div>
        );
    }
}

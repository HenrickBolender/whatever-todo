import React from 'react'
import {FormLabel, IconButton, Divider} from "@material-ui/core"
import styles from './styles.css'
import {ArrowBackIos, ArrowForwardIos} from '@material-ui/icons'


export default class DateBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    
    componentDidMount() {

    }

    componentWillUnmount() {
    }

    setNewDate(dayChangeValue){
        this.props.currentDate.setDate(this.props.currentDate.getDate() + dayChangeValue);
        this.props.onDateSwitch(this.props.currentDate);
    }


    render(){
        return (
            <div className={styles.bar}>
                <IconButton onClick ={this.setNewDate.bind(this, -1)}> 
                    <ArrowBackIos/>
                </IconButton>
                <Divider orientation="vertical" flexItem className={styles.divider}/>
                <div className={styles.container}>
                    <FormLabel className={styles.daymonth_label} >
                        <strong>
                            {this.props.currentDate.getDate()} {this.props.currentDate.toLocaleString('en', { month: 'long' }).toUpperCase()}
                        </strong>
                    </FormLabel>
                    <FormLabel className={styles.year_label}>{this.props.currentDate.getFullYear()}</FormLabel>
                </div>
                <Divider orientation="vertical" flexItem className={styles.divider}/>
                <IconButton onClick={this.setNewDate.bind(this, 1)}> 
                    <ArrowForwardIos/>
                </IconButton>
            </div>
        );
    }
}
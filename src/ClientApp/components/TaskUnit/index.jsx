import React from 'react'
import styles from './styles.css'
import {Checkbox, IconButton, Typography} from '@material-ui/core'
import { Delete } from '@material-ui/icons';



export default class TaskUnit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isDeleted: false
        };
    }
    
    executeTask(){

        this.props.taskItem.isDone = true;

        this.props.onExecution();

        const data = {id: this.props.taskItem.id, isDone: true}

        fetch("https://localhost:5001/app", {
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        .then(response => console.log(response));
    }

    delete(){
      this.setState({
        isDeleted: true
      });

      const data = {task: this.props.taskItem.task, id: this.props.taskItem.id}

      fetch("https://localhost:5001/app", {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type' : 'application/json'
        }
      });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {

        if (this.state.isDeleted) return false;
        
        return (
            <div className={styles.bar}>
              <Checkbox color="default" checked={this.props.taskItem.isDone} disabled={this.props.taskItem.isDone} onChange={this.executeTask.bind(this)}/>
              <div className={styles.container}>
        <Typography >{this.props.taskItem.isDone? <s>{this.props.taskItem.task}</s> : this.props.taskItem.task}</Typography>
              </div>
              <IconButton onClick={this.delete.bind(this)}>
                    <Delete/>
              </IconButton>
            </div>
        );
    }
}

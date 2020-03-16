import React from 'react'
import styles from './styles.css'
import {Checkbox, IconButton, Typography} from '@material-ui/core'
import { Delete } from '@material-ui/icons';



export default class TaskUnit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          description: props.description,
          isDone: props.isDone,
          isDeleted: false
        };
    }
    
    executeTask(){
        this.setState({
            isDone: true
        });

    }

    delete(){
      this.setState({
        isDeleted: true
      });

      const data = {task: this.state.description, id: this.props.id}

      fetch("https://localhost:5001/app", {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(responce => console.log("yay"));
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {

        if (this.state.isDeleted) return false;
        
        return (
            <div className={styles.bar}>
              <Checkbox color="default" checked={this.state.isDone} disabled={this.state.isDone} onChange={this.executeTask.bind(this)}/>
              <div className={styles.container}>
        <Typography >{this.state.isDone? <s>{this.state.description}</s> : this.state.description}</Typography>
              </div>
              <IconButton onClick={this.delete.bind(this)}>
                    <Delete/>
              </IconButton>
            </div>
        );
    }
}

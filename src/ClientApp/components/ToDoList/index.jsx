import React from 'react'
import {Grid} from "@material-ui/core"
import TaskUnit from "../TaskUnit"
import TaskInput from "../TaskInput"
 



export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };


    }

    componentDidMount() {
        fetch("https://localhost:5001/app", {
            method: 'GET'
        })
        .then(responce => responce.json())
        .then(data => {
            this.setState({
               tasks: data  
            })
            console.log(this.state.tasks);
        });
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
            <Grid container>
                {
                    this.state.tasks.map((task, index) => 
                        <TaskUnit key={index} description={task.task} isDone={false} id={task.id}/>
                    )
                }
            </Grid>
            <TaskInput parentList={this.state.tasks}/>
            </div>
        );
    }
}

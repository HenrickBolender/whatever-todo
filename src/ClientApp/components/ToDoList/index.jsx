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
               tasks: this.sortTasks(data)  
            })
            console.log(this.state.tasks);
        });
    }

    addNewTask(taskItem)
    {
        let newTasks = this.state.tasks;
        newTasks.push(taskItem);


        this.setState({
            tasks: newTasks
        });
        this.updateListOrder();
    }

    sortTasks(taskList)
    {
        return taskList.sort(function(a,b) {
            var a1 = 0;
            if (a.isDone === true)
            {
                a1 = 1;
            }

            var b2 = 0;
            if (b.isDone === true)
            {
                b2 = 1;
            }


            return a1 - b2;
        });
    }

    updateListOrder()
    {
        let newTasks = this.sortTasks(this.state.tasks);
        this.setState({
            tasks: newTasks
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
                        <TaskUnit key={index} taskItem={task} onExecution={this.updateListOrder.bind(this)}/>
                    )
                }
            </Grid>
            <TaskInput onPost={this.addNewTask.bind(this)}/>
            </div>
        );
    }
}

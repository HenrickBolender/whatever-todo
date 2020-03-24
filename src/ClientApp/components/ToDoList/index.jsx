import React from 'react'
import {Grid} from "@material-ui/core"
import TaskUnit from "../TaskUnit"
import TaskInput from "../TaskInput"
import DateBar from "../DateBar";
 



export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            currentDate: new Date()
        };


    }

    componentDidMount() {
        this.setTasks(this.state.currentDate);
    }

    setTasks(tasksDate)
    {
        console.log(tasksDate.toLocaleString().split(',', 1)[0]);

        var url = new URL("https://localhost:5001/app"),
        params = {
            date: tasksDate.toLocaleString().split(',', 1)[0], 
            id: 1
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url, {
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
        return taskList.sort((a,b) => (a.isDone? 1: 0) - (b.isDone? 1: 0));
    }

    removeTask(index)
    {
        this.state.tasks.splice(index, 1);
        this.forceUpdate();
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
            <DateBar onDateSwitch={this.setTasks.bind(this)} currentDate={this.state.currentDate}/>
            <Grid container>
                {
                    this.state.tasks.map((task, index) => 
                        <TaskUnit key={index} index={index} taskItem={task} onExecution={this.updateListOrder.bind(this)} onDelete={this.removeTask.bind(this)}/>
                    )
                }
            </Grid>
            <TaskInput onPost={this.addNewTask.bind(this)} currentDate={this.state.currentDate}/>
            </div>
        );
    }
}

import React from 'react'
import { IconButton, TextField, Divider } from '@material-ui/core';
import {ArrowUpward} from '@material-ui/icons'
import styles from './styles.css'
import { withStyles} from '@material-ui/core/styles';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);


export default class TaskInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
        };
    }
    
    componentDidMount() {

    }

    componentWillUnmount() {
    }

    postTask()
    {
      const data = {task: this.inputRef.value};
      console.log(JSON.stringify(data));
      if (data.task === "")
      {
        console.log("no input task to post");
        return;
      }

      const taskItem = {
        task:data.task,
        date: new Date().toLocaleString().replace(".", "/").replace(".", "/"),
        isDone: false,
        id: -1
      };

      this.props.parentList.push(taskItem);

      console.log(this.props.parentList);

      fetch("https://localhost:5001/app", {
        method: 'POST',
        body: JSON.stringify(data),
        headers:  {
          'Content-Type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        taskItem.id = data;
      });

      this.inputRef.value = "";
    }
    
    render() {
        return (
            <div className={styles.bar}>
                <div className={styles.container}>
                    <CssTextField inputRef = {ref => {this.inputRef = ref}} className={styles.input} placeholder="Введите задачу!"/>
                </div>
                <Divider orientation="vertical" flexItem className={styles.divider}/>
                <IconButton onClick={this.postTask.bind(this)}>
                    <ArrowUpward/>
                </IconButton>   
            </div>
        );
    }
}

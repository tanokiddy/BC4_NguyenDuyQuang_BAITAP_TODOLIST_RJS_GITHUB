import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "../Components/Container";
import { Dropdown } from "../Components/Dropdown";
import { Button } from "../Components/Button";
import { Heading1, Heading3 } from "../Components/Heading";
import { TextField } from "../Components/TextField";
import { Table, Th, Thead, Tr } from "../Components/Table";
import { connect } from "react-redux";
import {
  addTaskAction,
  changeThemeAction,
  deleteTaskAction,
  doneTaskAction,
  editTaskAction,
  updateTaskAction,
} from "../../redux/actions/ToDoListActions";
import { themeArr } from "../Themes/ThemesManager";

class ToDoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };

  renderToDoList = () => {
    return this.props.taskList
      .filter((task) => task.done !== true)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTaskAction(task));
                    }
                  );
                }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  {
                    this.props.dispatch(doneTaskAction(task.id));
                  }
                }}
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  renderCompletedList = () => {
    return this.props.taskList
      .filter((task) => task.done !== false)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  renderTheme = () => {
    return themeArr.map((theme, index) => {
      return <option value={theme.id}>{theme.name}</option>;
    });
  };

  // life cycle version<16.4 nh???n v??o props m???i ???????c th???c thi tr?????c render
  // componentWillReceiveProps(newProps){
  //   console.log("this.props",this.props)
  //   console.log("newProps",newProps);
  //   this.setState({
  //     taskName: newProps.taskEdit.taskName
  //   })
  // }

  //lifecycle t??nh kh??ng truy xu???t ???????c tr??? this
  // static getDerivedStateFromProps(newProps,currentState){
  //   //newProps: l?? props m???i, props c?? l?? this.props (kh??ng truy c???p ???????c)
  //   //currentState: ???ng v???i state hi???n t???i, this.state
  //   // m???c ?????nh tr??? v??? null
  //   //return null: t???c state gi??? nguy??n
  //   // ho???c tr??? v??? state m???i(this.state)
  //   let newState = {...currentState,taskName: newProps.taskEdit.taskName}
  //   return newState
  // }
  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50 text-left">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              //dispatch value len reducer
              // this.props.dispatch({
              //   type: change_theme,
              //   themeId: value,
              // });
              //cach rut gon
              this.props.dispatch(changeThemeAction(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading1>To do list</Heading1>
          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              this.setState({
                taskName: e.target.value,
              });
            }}
            name="taskName"
            className="w-50"
            label="Task name"
          />
          <Button
            onClick={() => {
              //L???y th??ng tin ng?????i d??ng nh???p v??o input
              let { taskName } = this.state;
              // t???o ra 1 task object
              let newTask = {
                id: Date.now(),
                taskName: taskName,
                done: false,
              };
              // ????a task object l??n redux th??ng qua ph????gn th???c dispatch
              this.setState(
                {
                  disabled: true,
                },
                () => {
                  this.props.dispatch(addTaskAction(newTask));
                }
              );
            }}
            className="mx-3"
          >
            <i className="fa fa-plus"></i> Add Task
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              onClick={() => {
                this.props.dispatch(updateTaskAction(this.state.taskName));
              }}
            >
              <i className="fa fa-upload"></i> Update task
            </Button>
          ) : (
            <Button
              onClick={() => {
                this.setState(
                  {
                    disabled: true,
                  },
                  () => {
                    this.props.dispatch(updateTaskAction(this.state.taskName));
                  }
                );
              }}
            >
              <i className="fa fa-upload"></i> Update task
            </Button>
          )}

          <hr />
          <Heading3>Task to do</Heading3>
          <Table>
            <Thead>{this.renderToDoList()}</Thead>
          </Table>
          <Heading3>Task completed</Heading3>
          <Table>
            <Thead>{this.renderCompletedList()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
  //????y l?? lifecycle tr??? v??? props v?? state c?? tr?????c khi render(lifecycle n??y ch???y sau render)
  componentDidUpdate(prevProps, prevState) {
    //so s??nh n???u nh?? props tr?????c ???? (taskEdit tr?????c) m?? kh??c taskEdit hi???n t???i th?? setState
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};
export default connect(mapStateToProps)(ToDoList);

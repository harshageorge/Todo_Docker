import React, { useState, useEffect } from "react";
// import http from './http-common';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [toDo, setToDo] = useState(() => []);
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  useEffect(() => {
    axios.get('/api/get').then((response) => {
      console.log(response.data.rows);
      setToDo(response.data.rows);
    }).catch((err)=>console.log(err));
  }, []);

  const addTask = () => {
    if (newTask) {
      if (toDo.length !== 0) {
        let newTaskId = toDo[toDo.length - 1].id + 1;
        let newEntry = { id: newTaskId, title: newTask, status: false };
        setToDo([...toDo, newEntry]);
        axios.post('api/post', newEntry).then((response) => {});
      } else {
        let newTaskId = toDo.length + 1;
        let newEntry = { id: newTaskId, title: newTask, status: false };
        setToDo([...toDo, newEntry]);
        axios.post('api/post',  newEntry).then((response) => {});
      }
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => 
      task.id !== id);
     setToDo(newTasks);
    axios.delete(`/api/delete/${id}`).then((response) => {
      console.log(response);
    }).catch((err)=>console.log(err));
  };

  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);

    let filteredTasks = newTask.filter((task) => task.id === id);
    console.log(filteredTasks);
    axios.put(`/api/edit/${id}`, filteredTasks[0]).then((response) => {
      console.log(response);
    }).catch((err)=>console.log(err));
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };
  const updateTask = () => {
    let filteredTasks = toDo.filter((task) => task.id !== updateData.id);
    console.log(updateData);
    let updatedTasks = [...filteredTasks, updateData];
    setToDo(updatedTasks);
    axios
      .put(`/api/edit/${updateData.id}`, updateData)
      .then((response) => {
        console.log(response);
      }).catch((err)=>console.log(err));
    setUpdateData("");
  };
  const cancelUpdate = () => {
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br></br>
      <h2>To Do List</h2>
      <br></br>

      {updateData.length !== 0 ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button onClick={updateTask} className="btn btn-lg btn-warning">
                Update
              </button>
            </div>
            <div className="col-auto">
              <button onClick={cancelUpdate} className="btn btn-lg btn-danger">
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
                style={{ alignItems: "center" }}
              />
            </div>
            <div className="col-auto">
              <button
                onClick={addTask}
                className="btn btn-lg btn-success"
                disabled={!newTask}
              >
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}

      {/* Display ToDos */}

      {toDo && toDo.length ? "" : "No Tasks..."}
      {toDo &&
        toDo?.map((task, index) => {
          return (
            <React.Fragment key={index}>
              <div className="col taskBg">
                <div>
                  <span className="taskNumber">{index + 1}</span>
                  <span
                    style={{
                      wordBreak: "break-all",
                      textDecoration: task.status ? "line-through" : "none",
                    }}
                    className="taskText"
                  >
                    {task.title}
                  </span>
                </div>
                <div className="iconsWrap">
                  <span
                    onClick={() => {
                      markDone(task.id);
                    }}
                    title="Completed/Not Completed"
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  {task.status ? (
                    ""
                  ) : (
                    <span
                      onClick={() =>
                        setUpdateData({
                          id: task.id,
                          title: task.title,
                          status: task.status ? true : false,
                        })
                      }
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                    title="Delete"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type toDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const toDoLists: toDoListType[] = [
        {id: v1(), title: 'What to learn', filter: 'completed'},
        {id: v1(), title: 'List of songs', filter: 'active'}
    ]
    return (
        <div className="App">
            {toDoLists.map((tl) => {
                return (
                    <Todolist title={tl.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={tl.filter}
                    />

                )
            })}
        </div>
    );
}

export default App;

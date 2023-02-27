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
    function removeToDoList (toDoListId: string) {
        setToDoList(toDoLists.filter(t => t.id !== toDoListId))

        delete tasksObj[toDoListId]
        setTasksObj({...tasksObj})
    }

    function removeTask(id: string, toDoListId: string) {
        const tasks = tasksObj[toDoListId]
        const filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[toDoListId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, toDoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[toDoListId];
        let newTasks = [task, ...tasks];
        tasksObj[toDoListId] = newTasks
        setTasksObj({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListId: string) {
        let tasks = tasksObj[toDoListId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    }


    function changeFilter(value: FilterValuesType, toDoListId: string) {
        setToDoList(toDoLists.map(el => el.id === toDoListId ? {...el, filter: value} : el))
    }

    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const [toDoLists, setToDoList] = useState<toDoListType[]>([
        {id: toDoListId1, title: 'What to learn', filter: 'active'},
        {id: toDoListId2, title: 'List of songs', filter: 'completed'}
    ])
    const [tasksObj, setTasksObj] = useState({
        [toDoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [toDoListId2]: [
            {id: v1(), title: 'Let it be', isDone: true},
            {id: v1(), title: 'Yesterday', isDone: true}
        ]
    })
    return (
        <div className="App">
            {toDoLists.map((tl) => {
                let tasksForTodolist = tasksObj[tl.id];
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeToDoList={removeToDoList}
                    />

                )
            })}
        </div>
    );
}

export default App;

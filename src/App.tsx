import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type ToDoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const toDoListId1 = v1();
    const toDoListId2 = v1();
    const [toDoLists, setToDoLists] = useState<ToDoListsType[]>(
        [
            {id: toDoListId1, title: 'What to learn', filter: 'active'},
            {id: toDoListId2, title: 'Songs to learn', filter: 'completed'}
        ]
    )
    const [tasksObj, setTasksObj] = useState<TasksStateType>({
            [toDoListId1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Rest API', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false}
            ],
            [toDoListId2]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Rest API', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false}
            ]
        }
    )

    function removeTask(id: string, toDoListId: string) {
        const tasks = tasksObj[toDoListId]
        const filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[toDoListId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, toDoListId: string) {
        const tasks = tasksObj[toDoListId]
        const task = {id: v1(), title: title, isDone: false};
        const newTasks = [task, ...tasks];
        tasksObj[toDoListId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean,toDoListId: string ) {
        const tasks = tasksObj[toDoListId]
        const newTasks = tasks.map(el=> el.id === taskId ? {...el, isDone: isDone} : el)
        tasksObj[toDoListId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, toDoListId: string) {
        setToDoLists(toDoLists.filter(el => el.id === toDoListId ? {...el, filter: value} : el))
    }


    return (
        <div className="App">
            {toDoLists.map(el => {
                let tasksForTodolist = tasksObj[el.id];

                if (el.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return (
                    <Todolist title={el.title}
                              key={el.id}
                              id={el.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;

import { useState } from 'react';

const Tasks = {
    DAILY: 'Daily',
    FRIENDS: 'Friends',
    SOCIAL: 'Social',
    EXTRA: 'Extra',
};

const getTasksContent = (task) => {
    switch (task) {
        default:
            return <>Coming soon.</>;
    }
};

const TaskTab = ({ title, id, task, onClick, isDisabled = false }) => {
    return (
        <li
            className={id === task ? 'is-active' : '' + (isDisabled ? ' is-disabled' : '')}
            onClick={() => {
                !isDisabled && onClick(id);
            }}
        >
            <a>{title}</a>
        </li>
    );
};

function TasksScreen() {
    const [task, setTask] = useState(Tasks.DAILY);

    const onClick = (newTask) => {
        setTask(newTask);
    };

    return (
        <div className="hero-body is-block pb-0 pl-4 pr-4 pt-4">
            <div className="tabs is-toggle is-fullwidth mb-4">
                <ul>
                    <TaskTab title={'Daily'} id={Tasks.DAILY} task={task} onClick={onClick} />
                    <TaskTab title={'Friends'} id={Tasks.FRIENDS} task={task} onClick={onClick} isDisabled={true} />
                    <TaskTab title={'Social'} id={Tasks.SOCIAL} task={task} onClick={onClick} isDisabled={true} />
                    <TaskTab title={'Extra'} id={Tasks.EXTRA} task={task} onClick={onClick} isDisabled={true} />
                </ul>
            </div>
            <div className="box is-shadowless is-tasks"> {getTasksContent(task)}</div>
        </div>
    );
}

export default TasksScreen;

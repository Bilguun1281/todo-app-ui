import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";

const TodoList: React.FC<{ tasks: ITask[], fetchTasks: () => void }> = ({ tasks, fetchTasks }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} fetchTasks={fetchTasks} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;

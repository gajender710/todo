import { Todo } from "@/models/todo-model";
import React, { useState } from "react";

const TodoItem = ({ todo, handleTodoSelect }: Props) => {
  return (
    <li
      key={todo.id}
      className={`flex items-center justify-between ${
        todo.completed ? "bg-green-100" : "bg-red-100"
      } px-4 py-3 rounded-md font-medium`}
    >
      <div className="flex items-center">
        <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
      </div>
      {todo.completed ? (
        <p className="px-3">{"Done"}</p>
      ) : (
        <button
          className="text-white bg-blue-500  px-3 py-1 rounded-lg "
          onClick={() => handleTodoSelect(todo.id)}
        >
          Start
        </button>
      )}
    </li>
  );
};

interface Props {
  todo: Todo;
  handleTodoSelect: (id: number) => void;
}

export default TodoItem;

import React, { FC } from "react";
import TodoList from "./TodoList";
import InsertTodoToggle from "./InsertTodoToggle";

const Board: FC<any> = () => {
  return (
    <div className="rounded-lg shadow-md bg-[#fafafc] p-10 min-h-[850px] mb-10">
      <div className="p-2 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Todos</h1>
        <InsertTodoToggle />
      </div>
      <TodoList></TodoList>
    </div>
  );
};

export default Board;

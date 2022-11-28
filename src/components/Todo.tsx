import React, { FC, useState } from "react";
import { deleteTodoThunk, updateTodoThunk } from "../features/todos/todosSlice";
import { useAppDispatch } from "../app/hooks";
import Tooltip from "./Tooltip";
import { TodoProps } from "../types/Custom.types";

const Todo: FC<TodoProps> = (props) => {
  const { todo, updateToggleId, setUpdateToggleId } = props;
  const { title, completed } = todo;

  const dispatch = useAppDispatch();
  const [upText, setUpText] = useState<string>(title);
  const [tooltipText, setTooltipText] = useState<string>("");

  const regex = new RegExp(/.*\S.*/);
  const MAX_LENGTH = 20;
  const update = updateToggleId === todo.id;
  const restrict =
    !regex.test(upText) || upText.length > MAX_LENGTH || tooltipText !== "";
  return (
    <div
      className={`border border-l-[5px] rounded-lg flex items-center p-2 mb-2 bg-[#ffffff] ${
        completed
          ? "border-l-green-400 bg-[#dcfce710]"
          : "border-l-red-400 bg-[#fee2e260]"
      }`}
    >
      {/* todo Titile */}
      {update ? (
        <div className="w-1/2 relative">
          <input
            className={`w-full pl-4 border p-1 rounded border-[#00000080] outline-none ${
              update && restrict ? "border-red-600" : "border-gray-300"
            }`}
            type="text"
            value={upText}
            onChange={(e) => {
              setUpText(e.target.value);
              setTooltipText("");
            }}
          />
          <Tooltip
            error={update && restrict}
            message={
              update && tooltipText
                ? tooltipText
                : !regex.test(upText)
                ? "Todo can not be empty"
                : upText.length > MAX_LENGTH
                ? `Allowd only ${MAX_LENGTH} characters`
                : ""
            }
            directon="right"
          />
        </div>
      ) : (
        <p className="w-1/2 ml-4">{title}</p>
      )}
      <div className="w-1/2 flex items-center justify-end gap-4">
        <div className="p-1 text-center">
          <button
            className={`text-center py-1 px-2 rounded bg-gray-300 ${
              update && restrict ? "opacity-50" : "opacity-100"
            }`}
            onClick={async () => {
              if (!update) {
                setUpdateToggleId(todo.id);
                setUpText(todo.title);
              } else if (regex.test(upText) && upText.length <= MAX_LENGTH) {
                const result = await dispatch(
                  updateTodoThunk(
                    Object.assign({}, props.todo, {
                      title: upText,
                    })
                  )
                );
                if (result.meta.requestStatus === "rejected")
                  setTooltipText(result.payload);
                else {
                  setTooltipText("");
                  setUpdateToggleId("");
                }
              }
            }}
          >
            {update ? "update" : "change"}
          </button>
        </div>
        <div className="p-1 text-center">
          <button
            className={`${
              completed ? "text-green-500" : "text-red-600"
            } text-center p-1 text-2xl cursor-pointer`}
            onClick={() => {
              dispatch(
                updateTodoThunk(
                  Object.assign({}, props.todo, {
                    completed: true,
                  })
                )
              );
            }}
            disabled={completed ? true : false}
          >
            &#x2691;
          </button>
        </div>
        <div className="p-1 text-center">
          <button
            className="text-center p-1 text-xl"
            onClick={() => {
              dispatch(deleteTodoThunk(props.todo));
            }}
          >
            {" "}
            &#x2715;{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;

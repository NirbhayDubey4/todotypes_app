import React, { FC, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { insertTodosThunk } from "../features/todos/todosSlice";
import Tooltip from "./Tooltip";

const InsertTodoToggle: FC<any> = () => {
  const dispatch = useAppDispatch();

  const [addToggle, setAddToggle] = useState<boolean | string>(false);
  const [todoText, setTodoText] = useState<string>("");
  const [tooltipText, setTooltipText] = useState<string>("");

  const regex = new RegExp(/.*\S.*/);
  const MAX_LENGTH = 20;
  const restrict =
    !regex.test(todoText) || todoText.length > MAX_LENGTH || tooltipText !== "";

  return (
    <div className="flex justify-center items-center">
      {addToggle ? (
        <div className="bg-[#ffffff] flex items-center rounded relative">
          <textarea
            autoFocus
            name=""
            id=""
            cols={30}
            rows={1}
            value={todoText}
            className={`border rounded-tl-md rounded-bl-md outline-none p-1 pl-3 min-h-[40px] w-full text-lg ${
              restrict ? "border-red-300" : "border-gray-400"
            }`}
            placeholder="write your todo..."
            onChange={(e) => {
              setTodoText(e.target.value);
              setTooltipText("");
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setAddToggle("");
              }
            }}
          ></textarea>
          <button
            className={`w-36 p-2 bg-gray-300 h-full border border-t border-r border-b rounded-tr-md rounded-br-md text-white bg-[#ba93fb]
            ${restrict ? "opacity-50" : "opacity-100"}
            `}
            onClick={async (e) => {
              const result = await dispatch(
                insertTodosThunk({
                  id: (Math.random() + 1).toString(36).substring(7),
                  title: todoText,
                  completed: false,
                })
              );
              if (result.meta.requestStatus === "rejected")
                setTooltipText(result.payload);
              else {
                setTodoText("");
                setAddToggle(false);
                setTooltipText("");
              }
            }}
            disabled={restrict ? true : false}
          >
            {" "}
            Add todo
          </button>
          <Tooltip
            error={restrict}
            message={
              tooltipText !== ""
                ? tooltipText
                : !regex.test(todoText)
                ? "Todo can not be empty"
                : todoText.length > MAX_LENGTH
                ? `Allowd only ${MAX_LENGTH} characters`
                : ""
            }
            directon={"left"}
          />
        </div>
      ) : (
        <button
          // className="border-[2px] border-[#52846680] border-dashed rounded-md flex items-center p-2 pl-4 bg-[#e8f2e4] hover:bg-[#e8f2e490]"
          className="flex justify-center items-center w-44 p-2 bg-gray-300 h-full border rounded-md text-white bg-[#ba93fb]"
          onClick={() => {
            setAddToggle(true);
          }}
        >
          <span className="text-2xl rounded-full h-6 w-6 flex justify-center items-center text-[#fff] border-[2px] border-[#fff] mr-3">
            +
          </span>{" "}
          Add new todo
        </button>
      )}
    </div>
  );
};

export default InsertTodoToggle;

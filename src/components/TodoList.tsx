import React, { FC, useState } from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";
import {
  filterPage,
  filterStatus,
  filterSearch,
} from "../features/todos/todosSlice";
import Pagination from "./Pagination";
import Perpage from "./Perpage";
import Tabs from "./Tabs";
import SearchBar from "./SearchBar";
import { InitialState } from "../types/Custom.types";

const TodoList: FC<any> = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [tabStatus, setTabStatus] = useState<string | boolean>("");
  const [searchQry, setSearchQry] = useState<string>("");
  const [updateToggleId, setUpdateToggleId] = useState<string>("");

  const todos = useSelector((state: InitialState) => state.todos);
  const filteredSearchTodos = filterSearch(todos, searchQry);
  const filteredStatusTodos = filterStatus(filteredSearchTodos, tabStatus);
  const filteredTodos = useSelector(() =>
    filterPage(filteredStatusTodos, {
      number: pageNo,
      perpage: perPage,
    })
  );

  return (
    <div className="container">
      {/* Tabs and Search bar */}
      <div className="flex justify-between items-center">
        <Tabs {...{ tabStatus, setTabStatus, setPageNo }} />
        <SearchBar {...{ searchQry, setSearchQry }} />
      </div>
      {/* Todo list */}
      <div className="my-4">
        <hr className="my-4" />
        {/* todos list */}
        <div
          className="scroll h-[520px] overflow-y-scroll pr-3"
          id="todoScrollDiv"
        >
          {filteredTodos?.map((todo, index) => {
            return (
              <Todo
                key={index}
                {...{ todo, updateToggleId, setUpdateToggleId }}
              />
            );
          })}
          {filteredTodos.length <= 0 && (
            <div className="flex flex-col w-full h-full justify-center items-center">
              <img src={"./emptyRecord.svg"} alt="" className="h-72" />
              <p className="text-2xl mt-8"> Oops ! No record found :(</p>
            </div>
          )}
        </div>
      </div>
      {/* Pagination and Perpage section */}
      <div className="flex justify-between mt-5 ml-4">
        <Perpage {...{ perPage, setPerPage, setPageNo }} />
        <Pagination
          {...{
            pageNo,
            perPage,
            size: filteredStatusTodos.length,
            setPageNo,
          }}
        />
      </div>
    </div>
  );
};

export default TodoList;

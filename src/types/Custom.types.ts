import { Dispatch, SetStateAction } from "react";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type InitialState = {
  status: string;
  todos: Array<Todo>;
};

export type PaginationProps = {
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  perPage: number;
  size: number;
};

export type PerPageProps = {
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  setPageNo: Dispatch<SetStateAction<number>>;
};

export type SearchBarProps = {
  searchQry: string;
  setSearchQry: Dispatch<SetStateAction<string>>;
};

export type TabsProps = {
  tabStatus: string | boolean;
  setTabStatus: Dispatch<SetStateAction<string | boolean>>;
  setPageNo: Dispatch<SetStateAction<number>>;
};

export type TodoProps = {
  todo: Todo;
  updateToggleId: string;
  setUpdateToggleId: Dispatch<SetStateAction<string>>;
};

export type TooltipProps = {
  error: boolean;
  message: string;
  directon: string;
};

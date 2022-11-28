import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { InitialState, Todo } from "../../types/Custom.types";

const initialState: InitialState = {
  status: "",
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action: PayloadAction) => {
        state.status = "loading";
      })
      .addCase(
        fetchTodos.fulfilled,
        (state, action: PayloadAction<Array<Todo>>) => {
          const data = action.payload || [];
          state.todos = data.reverse();
        }
      )
      .addCase(
        insertTodosThunk.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          if (action.payload) {
            const data = state.todos.reverse();
            data.push(action.payload);
            state.todos = data.reverse();
          }
        }
      )
      .addCase(insertTodosThunk.rejected, (state, action) => {})
      .addCase(
        deleteTodoThunk.fulfilled,
        (state, action: PayloadAction<{ id: string; status: string }>) => {
          if (action.payload.status === "OK") {
            state.todos = state.todos.filter(
              (item) => item.id !== action.payload.id
            );
          }
        }
      )
      .addCase(
        updateTodoThunk.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          if (action.payload) {
            state.todos = state.todos.map((todo) => {
              if (todo.id === action.payload.id)
                return Object.assign({}, todo, action.payload);
              return todo;
            });
          }
        }
      )
      .addCase(updateTodoThunk.rejected, (state, action) => {});
  },
});

export default todoSlice.reducer;

// creating initial fetch thunk
export const fetchTodos = createAsyncThunk("todos/fetchtodos", async () => {
  const res = await axios.get("http://localhost:3000/todos");
  return res.data;
});

// creating insert todo thunk
export const insertTodosThunk = createAsyncThunk(
  "todos/inserttodos",
  async (newTodo: Todo, thunkAPI) => {
    try {
      const res1 = await axios.get("http://localhost:3000/todos");
      if (res1.data) {
        const exist = res1.data.find(
          (todo: Todo) =>
            todo.title.toLowerCase() === newTodo.title.toLowerCase()
        );
        if (exist && exist.id)
          return thunkAPI.rejectWithValue("todo already exist");
      }
      const res = await axios.post("http://localhost:3000/todos", newTodo);
      return res.data;
    } catch (error) {}
  }
);

// creating delete todo thunk
export const deleteTodoThunk = createAsyncThunk(
  "todos/deletetodos",
  async (deleteTodo: Todo) => {
    const res = await axios.delete(
      `http://localhost:3000/todos/${deleteTodo.id}`
    );
    return { id: deleteTodo.id, status: res.statusText };
  }
);

// creating update todo thunk
export const updateTodoThunk = createAsyncThunk(
  "todos/updatetodos",
  async (updateTodo: Todo, thunkAPI) => {
    try {
      const res1 = await axios.get("http://localhost:3000/todos");
      if (res1.data) {
        const exist = res1.data.find(
          (todo: Todo) =>
            todo.id !== updateTodo.id &&
            todo.title.toLowerCase() === updateTodo.title.toLowerCase()
        );
        if (exist && exist.id)
          return thunkAPI.rejectWithValue("todo already exist");
        const res = await axios.put(
          `http://localhost:3000/todos/${updateTodo.id}`,
          updateTodo
        );
        return res.data;
      }
    } catch (error) {}
  }
);

export const filterPage = createSelector(
  (todos: Array<Todo>) => todos,
  (state: Array<Todo>, page: { number: number; perpage: number }) => page,
  (allTodos, page: { number: number; perpage: number }) => {
    const no = page.number;
    const perpage = page.perpage;
    const filteredTodos = allTodos.slice((no - 1) * perpage, no * perpage);
    return filteredTodos;
  }
);

export const filterStatus = createSelector(
  (todos: Array<Todo>) => todos,
  (state: Array<Todo>, completed: boolean | string) => completed,
  (allTodos, completed: boolean | string) => {
    const filteredTodos =
      completed === ""
        ? allTodos
        : allTodos.filter((todo) => todo.completed === completed);
    return filteredTodos;
  }
);

export const filterSearch = createSelector(
  (todos: Array<Todo>) => todos,
  (state: Array<Todo>, searchQry: string) => searchQry,
  (allTodos: Array<Todo>, searchQry: string) => {
    const filteredTodos = allTodos.filter((todo) => {
      return todo.title.toLowerCase().includes(searchQry.toLowerCase());
    });
    return filteredTodos;
  }
);

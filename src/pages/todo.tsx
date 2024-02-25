import { useAppContext } from "@/context/app-context";
import { useEffect, useRef, useState } from "react";
import TodoItem from "@/components/todo-item";
import TimerDialog from "@/components/timer-dialog";
import { todoService } from "@/service/todos";

const TodoList = () => {
  const { selectedUser, allTodos, setAllTodos } = useAppContext();
  const todos = useRef(selectedUser ? allTodos[selectedUser.id] : []);
  const [filteredTodos, setFilteredTodos] = useState(todos.current);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completedWorkSessions, setCompletedWorkSessions] = useState(
    todos.current
      ? todos.current.reduce((acc, cur) => acc + (!!cur.completed ? 1 : 0), 0)
      : 0
  );
  const [selectedTodo, setSelectedTodo] = useState(0);

  const getAllTodos = async () => {
    if (!selectedUser || !!allTodos[selectedUser.id]?.length) {
      return;
    }
    setLoading(true);
    const { data, error, success } = await todoService.getTodos(
      selectedUser.id
    );
    if (!success || !data?.length) {
      return;
    }
    let completed = data.reduce(
      (acc, cur) => acc + (!!cur.completed ? 1 : 0),
      0
    );
    setCompletedWorkSessions(completed);
    todos.current = data;
    setFilteredTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleTodoSelect = (id: number) => {
    setSelectedTodo(id);
    setOpenDialog(true);
  };

  const handleCompletion = () => {
    if (!selectedUser) {
      return;
    }
    const newAllTodos = { ...allTodos };
    newAllTodos[selectedUser.id] = todos.current.map((item) => {
      if (selectedTodo === item.id) {
        return { ...item, completed: true };
      }
      return item;
    });
    todos.current = newAllTodos[selectedUser.id];
    setFilteredTodos(todos.current);
    setAllTodos(newAllTodos);
    setOpenDialog(false);
    setCompletedWorkSessions(completedWorkSessions + 1);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFilter = (filter: string) => {
    const filteredTodos = todos.current.filter((todo: any) => {
      if (filter === "all") return true;
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    });
    setFilteredTodos(filteredTodos);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen">
      {loading ? (
        <div className="flex h-full w-full justify-center items-center">
          <h2 className="text-4xl">Loading...</h2>
        </div>
      ) : (
        <div className="w-full max-w-3xl px-2">
          <div className="sticky top-0 bg-white mb-4 flex justify-between items-center py-2">
            <h2 className="text-2xl font-bold ">Todo List</h2>
            <div className="flex items-center space-x-2 sm:space-x-8">
              <select
                className="border border-gray-300 rounded-md p-1"
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
              <p className="text-green-500">
                Completed: {completedWorkSessions}
              </p>
              <p className="text-red-500">
                Pending: {todos.current?.length - completedWorkSessions}
              </p>
            </div>
          </div>

          <ul className="space-y-2 pb-8">
            {!!filteredTodos?.length &&
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleTodoSelect={handleTodoSelect}
                />
              ))}
          </ul>
        </div>
      )}
      <TimerDialog
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        handleCompletion={handleCompletion}
      />
    </div>
  );
};

export default TodoList;

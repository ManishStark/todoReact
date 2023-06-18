import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAlert from "../states/storeAlert";
import TodoService from "../service/todoService";

const Todo = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { data, error, isLoading } = TodoService.useAllTodo();

  if (error instanceof AxiosError) {
    if (error.response?.status == 401) {
      showAlert("Your session has expired.. Please login again..", 0);
      navigate("/login");
    }
  }
  return (
    <>
      <TodoForm />
      {isLoading && <p>Loading..</p>}
      {error && <p className="text-danger">{error.message}</p>}
      <div className="grid">
        {data?.map((todo) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
      </div>
    </>
  );
};

export default Todo;

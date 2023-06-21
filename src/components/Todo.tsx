import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAlert from "../states/storeAlert";
import TodoService from "../service/TodoService";
import Cookies from "universal-cookie";

const Todo = () => {
  const navigate = useNavigate();
  const showAlert = useAlert((s) => s.showAlert);
  const { data, error, isLoading } = TodoService.useAllTodo();
  const cookie = new Cookies();

  if (error instanceof AxiosError) {
    if (error.response?.status == 401) {
      cookie.remove("jwt");
      showAlert("Your session has expired.. Please login again..", 0);
      navigate("/login");
    }
  }

  return (
    <>
      <TodoForm />
      {isLoading && <p>Loading..</p>}
      {error && <p className="text-danger">{error.message}</p>}
      {data?.length == 0 && <p>Please add some Todos..</p>}
      <div className="grid">
        {data?.map((todo) => (
          <TodoCard todo={todo} key={todo._id} />
        ))}
      </div>
    </>
  );
};

export default Todo;

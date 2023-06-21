import { Todo } from "../service/TodoService";
import randomColor from "randomcolor";
import TodoService from "../service/TodoService";

interface Props {
  todo: Todo;
}
const TodoCard = ({ todo }: Props) => {
  const color = randomColor();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const deleteTodo = TodoService.useDeleteTodo();
  const completeTodo = TodoService.useCompleteTodo();

  const onDelete = (id: string) => {
    deleteTodo.mutate(id);
  };
  const onUpdate = (id: String) => {
    completeTodo.mutate(id);
  };

  return (
    <div
      className="card"
      style={{
        boxShadow: `${color} 0px 3px 0px`,
      }}
    >
      <div className="todo_title">{todo.title}</div>
      <div className=" mt-2 d-flex justify-content-end">
        {new Date(todo.date).toLocaleString(undefined, options)}
      </div>
      <div className="d-flex mt-2">
        <button
          className="button button_primary"
          onClick={() => onUpdate(todo._id)}
        >
          Complete
        </button>
        <button
          className="ms-3 button button_danger"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;

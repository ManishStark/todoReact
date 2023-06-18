import { Todo } from "../hooks/useTodo";
import randomColor from "randomcolor";

interface Props {
  todo: Todo;
}
const TodoCard = ({ todo }: Props) => {
  const color = randomColor();

  return (
    <div
      className="card"
      style={{
        boxShadow: `${color} 0px 3px 0px`,
      }}
    >
      <div className="todo_title">{todo.title}</div>
      <div className="d-flex mt-3">
        <button
          className="button button_primary"
          onClick={() => console.log(todo)}
        >
          Complete
        </button>
        <button className="ms-3 button button_danger">Delete</button>
      </div>
    </div>
  );
};

export default TodoCard;

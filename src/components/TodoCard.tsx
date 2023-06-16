import React from "react";

const TodoCard = () => {
  return (
    <div className="card">
      <div className="todo_title">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, illum!
      </div>
      <div className="d-flex mt-3">
        <button className="button button_primary">Complete</button>
        <button className="ms-3 button button_danger">Delete</button>
      </div>
    </div>
  );
};

export default TodoCard;

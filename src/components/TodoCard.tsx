import React from "react";

const TodoCard = () => {
  return (
    <div className="col-lg-4">
      <div className="card p-3">
        <h2>Title</h2>
        <div className="d-flex">
          <button>Completed</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;

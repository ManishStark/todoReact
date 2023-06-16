import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import TodoCard from "./components/TodoCard";
import TodoForm from "./components/TodoForm";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="mt-4"></div>
      <TodoForm />
      <div className="container row mt-3">
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </div>
    </>
  );
};

export default App;

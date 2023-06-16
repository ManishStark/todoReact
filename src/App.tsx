import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="mt-0"></div>
      <TodoForm />
      <div className="container grid mt-3"></div>
    </>
  );
};

export default App;

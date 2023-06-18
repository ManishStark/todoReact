import { Link, useNavigate } from "react-router-dom";
import useAlert from "../states/storeAlert";

const Navbar = () => {
  const { message, code } = useAlert();
  const navigate = useNavigate();

  return (
    <header className="container-fluid">
      <nav className="container d-flex justify-content-between">
        <div className="logo" onClick={() => navigate("/")}>
          Todo List
        </div>
        <div className="d-flex flex-wrap">
          {/* <a href="/login">Login A TAG</a> */}
          <Link to={"/login"} className="button button_primary">
            Login
          </Link>
          <Link to={"/signup"} className="button button_secondary ms-lg-3 ms-2">
            SignUp
          </Link>
        </div>
      </nav>
      <div className={`show_alert ${code == 1 ? "bg-sucess" : "bg-danger"}`}>
        {message}
      </div>
    </header>
  );
};

export default Navbar;

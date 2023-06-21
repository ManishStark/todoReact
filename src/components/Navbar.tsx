import { Link, useNavigate } from "react-router-dom";
import useAlert from "../states/storeAlert";
import Cookies from "universal-cookie";

const Navbar = () => {
  const cookie = new Cookies();
  const { message, code } = useAlert();
  const navigate = useNavigate();
  const credentials = (
    <div className="d-flex flex-wrap">
      <Link to={"/login"} className="button button_primary">
        Login
      </Link>
      <Link to={"/signup"} className="button button_secondary ms-lg-3 ms-2">
        SignUp
      </Link>
    </div>
  );

  return (
    <header className="container-fluid">
      <nav className="container d-flex justify-content-between">
        <div className="logo" onClick={() => navigate("/")}>
          Todo List
        </div>
        {cookie.get("jwt") ? (
          <button
            className="button button_danger"
            onClick={() => {
              cookie.remove("jwt");
              location.href = "/login";
            }}
          >
            Logout
          </button>
        ) : (
          credentials
        )}
      </nav>
      <div className={`show_alert ${code == 1 ? "bg-sucess" : "bg-danger"}`}>
        {message}
      </div>
    </header>
  );
};

export default Navbar;

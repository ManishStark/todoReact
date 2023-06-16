const Navbar = () => {
  return (
    <header className="container-fluid">
      <nav className="container d-flex justify-content-between">
        <div className="logo">Todo List</div>
        <div className="d-flex flex-wrap">
          <button className="button button_primary">Login</button>
          <button className="button button_secondary ms-lg-4 ms-sm-1">
            SignUp
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="title">
        <h2>ResMatch</h2>
      </div>

      <div className="nav-links">
        <ul className="ul">
          <li className="li">
            <a className="button"  href="#home"><p className="p">Home</p></a>
          </li>
          <li className="li">
            <a className="button" href="#about"><p className="p">About Me</p></a>
          </li>
          <li className="li">
            <a className="button" href="#contact"><p className="p">Contact Me</p></a>
          </li>
        </ul>
      </div>

      <div className="login-btn">
        <button className="btn">Login</button>
      </div>
    </div>
  );
};

export default Navbar;

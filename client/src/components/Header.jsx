import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="title">UOWD Tech Club</h1>
        <nav className="navbar">
          <li>
            <a className="nav-link">Home</a>
          </li>
          <li>
            <a className="nav-link">About</a>
          </li>
          <li>
            <button className="nav-signup">Sign up</button>
          </li>
        </nav>
      </div>
    </header>
  );
}

export default Header;

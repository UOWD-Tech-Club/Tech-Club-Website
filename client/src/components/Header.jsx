import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Tech Club</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#events">Events</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

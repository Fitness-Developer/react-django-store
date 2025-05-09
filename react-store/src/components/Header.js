import React, { useEffect } from 'react';
import '../index.scss';
import { Link } from 'react-router-dom';
import { useCard } from '../hooks/useCard';

const Header = () => {
  const { totalPrice } = useCard();
  // const [searchTerm, setSearchTerm] = useState('');

  // const SearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   onSearch(e.target.value); // Передаем значение поиска в родительский компонент
  // };

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <header className="header">
      <div className="main-ico">
        <Link to="/" style={{ display: 'flex', gap: '20px', position: 'relative' }}>
          <img src="/img/main-ico.png" alt="" />
          <h1>React-store</h1>
        </Link>
      </div>

      <div className="icons">
        {!token ? (
          <>
            <Link to="/Login">
              <button>Login</button>
            </Link>
            <Link to="/Register">
              <button>Register</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/Drawer" style={{ textDecoration: 'none', color: '#333' }}>
              <span>{totalPrice} руб.</span>
              <img src="/img/pack.png" alt="" />
            </Link>
            <Link to="/Favorites">
              <img src="/img/like.png" alt="" />
            </Link>
            <Link to="/Order">
              <img src="/img/bought.png" alt="" />
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

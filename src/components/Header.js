import React from 'react';
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
  return (
    <header className="header">
      <div className="main-ico">
        <Link to="/" style={{ display: 'flex', gap: '20px', position: 'relative' }}>
          <img src="/img/main-ico.png" alt="" />
          <h1>React-store</h1>
        </Link>
      </div>

      <div className="icons">
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
      </div>
    </header>
  );
};

export default Header;

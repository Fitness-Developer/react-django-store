import '../index.scss';
import Card from '../components/Card';
import React, { useContext, useState } from 'react';
import LoaderCard from '../components/Loader';
import AppContext from '../AppContext';

const Home = ({ items }) => {
  const { isLoading, likeClick, getClick } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'Все' || item.title.startsWith(selectedCategory);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="content">
      <h1>Товары</h1>
      <div className="sort">
        <div className="categs">
          {['Все', 'Кроссовки', 'Футболка', 'Кофта'].map((category) => (
            <div
              key={category}
              className={`category ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Введите ваш запрос..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="cards">
        {isLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <div className="loader-card-container" key={index}>
                <LoaderCard />
              </div>
            ))
          : filteredItems.map((item) => (
              <Card key={item.id} item={item} onLikeClick={likeClick} getClick={getClick} />
            ))}
      </div>
    </section>
  );
};

export default Home;

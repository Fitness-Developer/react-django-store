import React from 'react';
import '../index.scss';
import Card from '../components/Card';
import { useContext } from 'react';
import AppContext from '../AppContext';

const Favorites = () => {
  const { favorites, items, likeClick } = useContext(AppContext);

  return (
    <section className="content">
      <h1>Мои любимые</h1>
      <div className="cards">
        {favorites.length > 0 ? (
          favorites.map((like) => {
            const item = items.find((i) => i.id === like.item); // Находим объект
            if (!item) {
              return null; // Или другой способ обработки отсутствующего объекта
            }
            return (
              <Card
                key={like.id}
                item={item}
                onLikeClick={() => likeClick(item.id)}
                noPlus={true}
              />
            );
          })
        ) : (
          <div className="nothing">
            <img src="/img/fav.png" alt="" />
            <p>У вас пока нету понравившихся товаров :(</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;

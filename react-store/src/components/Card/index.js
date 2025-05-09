import React, { useRef } from 'react';
import './Card.scss';

function Card({
  item,
  onLikeClick,
  noPlus,
  getClick,
  noLike,
  getPlus,
  addToOrders,
  noLike2,
  noPlus2,
}) {
  const token = localStorage.getItem('token');
  const timeoutRef = useRef(null);
  const handleLikeClick = (itemId) => {
    if (token) {
      onLikeClick(itemId);
    } else {
      alert('Войдите или зарегистрируйтесь');
    }
  };
  const handlePlusClick = (itemId) => {
    if (token) {
      getClick(itemId);
    } else {
      alert('Войдите или зарегистрируйтесь');
    }
  };
  return (
    <div className="card item">
      {noLike ? (
        <img className="like" src="img/del.png" alt="" onClick={() => getClick(item.id)} />
      ) : (
        !noLike2 && (
          <img
            className="like"
            src={item.isLiked ? '/img/like2.png' : '/img/like.png'}
            alt=""
            onClick={() => handleLikeClick(item.id)}
          />
        )
      )}
      <img src={item.image} alt={item.title} />
      <div className="cardofitems">
        <div className="card-name">
          <p className="name-line">{item.title}</p>
          <p className="price-line">Цена: {item.price} p.</p>
        </div>
        {getPlus ? (
          <img
            className="to-get"
            src="/img/to-get.png"
            alt=""
            onClick={() => {
              addToOrders(item.id);
              setTimeout(() => {
                getClick(item.id);
              }, 1000);
            }}
          />
        ) : (
          !noPlus2 &&
          !noPlus && (
            <img
              className="plus"
              src={item.isDrawer ? '/img/get.png' : '/img/plus.png'}
              alt=""
              onClick={() => handlePlusClick(item.id)}
            />
          )
        )}
      </div>
    </div>
  );
}
export default Card;

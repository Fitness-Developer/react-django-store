import React from 'react';
import '../index.scss';
import Card from '../components/Card';
import { useContext } from 'react';
import AppContext from '../AppContext';

const Order = () => {
  const { items, addToOrders, orders } = useContext(AppContext);
  return (
    <section className="content">
      <h1>Мои покупки</h1>
      <div className="cards">
        {orders.length > 0 ? (
          orders.map((get) => {
            const item = items.find((i) => i.id === get.item); // Находим объект
            if (!item) {
              return null; // Или другой способ обработки отсутствующего объекта
            }
            return (
              <Card
                key={get.id}
                item={item}
                addToOrders={() => addToOrders(item.id)}
                noLike2={true}
                noPlus2={true}
              />
            );
          })
        ) : (
          <div className="nothing">
            <img src="/img/gethome.png" alt="" />
            <p>У вас пока нет покупок :(</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Order;

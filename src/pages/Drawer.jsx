import React, { useState } from 'react';
import '../index.scss';
import Card from '../components/Card';
import { useContext } from 'react';
import AppContext from '../AppContext';

const Drawer = () => {
  const { items, setItems, getClick, drawer, addToOrders, removeFromDrawer } =
    useContext(AppContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const addAllToOrders = async () => {
    try {
      for (const item of drawer) {
        await new Promise((resolve) => {
          setTimeout(async () => {
            await addToOrders(item.item);

            resolve(); // Разрешаем промис после выполнения кода
          }, 100); // Задержка в 1000 мс (1 секунда)
        });
        removeFromDrawer(item.id);
        setItems((prevItems) =>
          prevItems.map((i) => (i.id === item.item ? { ...i, isDrawer: false } : i)),
        );
      }
      setOrderConfirmed(true);
    } catch (error) {
      console.error('Ошибка при добавлении всех товаров в заказы:', error);
    }
  };

  return (
    <section className="content">
      <div className="buy">
        <h1>Моя корзина</h1>
        <div className="buyall" onClick={addAllToOrders}>
          Купить все
        </div>
      </div>

      <div className="cards">
        {orderConfirmed ? ( // Проверяем состояние подтверждения заказа
          <div className="nothing">
            <img src="/img/accept.png" alt="" />
            <p>Ваши товары успешно приняты 😊</p> {/* Отображаем сообщение о принятии заказа */}
          </div>
        ) : drawer.length > 0 ? ( // Проверяем, есть ли элементы в drawer
          drawer.map((get) => {
            const item = items.find((i) => i.id === get.item); // Находим объект
            if (!item) {
              return null; // Или другой способ обработки отсутствующего объекта
            }
            return (
              <Card
                key={get.id}
                item={item}
                getClick={() => getClick(item.id)}
                noLike={true}
                noPlus={true}
                getPlus={true}
                addToOrders={() => {
                  addToOrders(item.id);
                }}
              />
            );
          })
        ) : (
          <div className="nothing">
            <img src="/img/bask.png" alt="" />
            <p>Добавьте товары в корзину, пока она у вас пустая :(</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Drawer;

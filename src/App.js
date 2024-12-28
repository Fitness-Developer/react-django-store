import './index.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Drawer from './pages/Drawer';
import Order from './pages/Order';
import Login from './account/Login';
import Register from './account/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppContext from './AppContext';

function App() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [drawer, setDrawer] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Получаем данные из Django API
    const fetchData = async () => {
      try {
        // Получаем данные о предметах без токена
        const itemsResponse = await axios.get('http://127.0.0.1:8000/api/items/');

        // Если требуется получить информацию о лайках и других данных, можно использовать токен
        const token = localStorage.getItem('token');
        const [likeResponse, drawerResponse, ordersResponse] = await Promise.all([
          token
            ? axios.get('http://127.0.0.1:8000/api/likes/', {
                headers: { Authorization: `Bearer ${token}` },
              })
            : Promise.resolve({ data: [] }), // Если токена нет, возвращаем пустой массив
          token
            ? axios.get('http://127.0.0.1:8000/api/drawer/', {
                headers: { Authorization: `Bearer ${token}` },
              })
            : Promise.resolve({ data: [] }), // Если токена нет, возвращаем пустой массив
          token
            ? axios.get('http://127.0.0.1:8000/api/orders/', {
                headers: { Authorization: `Bearer ${token}` },
              })
            : Promise.resolve({ data: [] }), // Если токена нет, возвращаем пустой массив
        ]);

        const itemsData = itemsResponse.data.map((item) => ({
          ...item,
          isLiked: likeResponse.data.some((like) => like.item === item.id),
          isDrawer: drawerResponse.data.some((get) => get.item === item.id),
        }));

        setIsLoading(false);
        setItems(itemsData);
        setFavorites(likeResponse.data);
        setDrawer(drawerResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const likeClick = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found! User is not authenticated.');
      return;
    }
    try {
      const isLiked = favorites.some((like) => like.item === itemId);
      if (isLiked) {
        const likeToRemove = favorites.find((like) => like.item === itemId);
        await axios.delete(`http://127.0.0.1:8000/api/likes/${likeToRemove.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites((prevFavorites) =>
          prevFavorites.filter((like) => like.id !== likeToRemove.id),
        );
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === itemId ? { ...item, isLiked: false } : item)),
        );
      } else {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/likes/',
          { item: itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setFavorites((prevFavorites) => [...prevFavorites, response.data]);
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === itemId ? { ...item, isLiked: true } : item)),
        );
      }
    } catch (error) {
      console.error('Ошибка обработки лайка:(', error);
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Token is invalid or expired.');
      }
    }
  };
  //   const addToDrawer = async (itemId) => {
  //     try {
  //       const response = await axios.post('http://127.0.0.1:8000/api/drawer/', { item: itemId });
  //       setDrawer((prevDrawer) => [...prevDrawer, response.data]);
  //       setItems((prevItems) =>
  //         prevItems.map((item) =>
  //           item.id === itemId ? { ...item, isDrawer: true } : item
  //         )
  //       );
  //     } catch (error) {
  //       console.error('Ошибка добавления в корзину:', error);
  //     }
  //   };
  // const removeFromDrawer = async (itemId) => {
  //     try {
  //       const itemToRemove = drawer.find((get) => get.item === itemId);
  //       await axios.delete(`http://127.0.0.1:8000/api/drawer/${itemToRemove.id}/`);
  //       setDrawer((prevDrawer) =>
  //         prevDrawer.filter((get) => get.item !== itemId)
  //       );
  //       setItems((prevItems) =>
  //         prevItems.map((item) =>
  //           item.id === itemId ? { ...item, isDrawer: false } : item
  //         )
  //       );
  //     } catch (error) {
  //       console.error('Ошибка удаления из корзины:', error);
  //     }
  //   };

  const getClick = async (itemId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found!');
      return;
    }

    try {
      const isDrawer = drawer.some((get) => get.item === itemId);
      if (isDrawer) {
        const getToRemove = drawer.find((get) => get.item === itemId);
        await axios.delete(`http://127.0.0.1:8000/api/drawer/${getToRemove.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDrawer((prevDrawer) => prevDrawer.filter((get) => get.id !== getToRemove.id));
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, isDrawer: !item.isDrawer } : item,
          ),
        );
      } else {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/drawer/',
          { item: itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setDrawer((prevDrawer) => [...prevDrawer, response.data]);
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === itemId ? { ...item, isDrawer: true } : item)),
        );
      }
    } catch (error) {
      console.error('Ошибка обработки лайка:(', error);
    }
  };
  const removeFromDrawer = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/drawer/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDrawer((prevDrawer) => prevDrawer.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении из корзины:', error);
    }
  };

  const addToOrders = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/orders/',
        { item: itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setOrders((prevOrders) => [...prevOrders, response.data]);
      setDrawer((prevDrawer) => {
        return prevDrawer.filter((item) => item.id !== itemId);
      });
    } catch (error) {
      console.error('Ошибка добавления в заказы:(', error);
    }
  };

  // const SearchItems = (searchTerm) => {
  //   const filtered = items.filter((item) =>
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );
  //   setFilteredItems(filtered);
  // };

  return (
    <AppContext.Provider
      value={{
        items,
        favorites,
        drawer,
        orders,
        setItems,
        setFavorites,
        setDrawer,
        setOrders,
        likeClick,
        getClick,
        addToOrders,
        setIsLoading,
        isLoading,
        removeFromDrawer,
      }}
    >
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home items={items} />} />
            <Route path="/Favorites" element={<Favorites favorites={favorites} />} />
            <Route path="/Drawer" element={<Drawer drawer={drawer} />} />
            <Route path="/Order" element={<Order orders={orders} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

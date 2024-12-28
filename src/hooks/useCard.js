import React from 'react';
import AppContext from '../AppContext';

export const useCard = () => {
  const { drawer, setDrawer, items } = React.useContext(AppContext);
  const totalPrice = drawer.reduce((sum, drawerItem) => {
    const item = items.find((item) => item.id === drawerItem.item); // Find item in items array
    return item ? sum + item.price : sum; // Add price only if item is found
  }, 0);

  return { drawer, setDrawer, totalPrice };
};

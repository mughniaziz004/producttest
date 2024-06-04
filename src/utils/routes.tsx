import Product from '../screens/product';
import Detail from '../screens/product-detail';
import Search from '../screens/search';

export const route = [
  {
    key: 'product',
    name: 'product',
    component: Product,
    options: {headerShown: false},
  },
  {
    key: 'detail',
    name: 'detail',
    component: Detail,
    options: {headerShown: false},
  },
  {
    key: 'search',
    name: 'search',
    component: Search,
    options: {headerShown: false},
  },
];

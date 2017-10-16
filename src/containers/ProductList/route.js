import ProductList from './';
import productCreateRoute from '../ProductCreate/route';
import productChangeRoute from '../ProductChange/route';

export default {
  component: ProductList,
  path: '/products',
  childRoutes: [productCreateRoute, productChangeRoute]
}
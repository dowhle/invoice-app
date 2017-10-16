import CustomerList from './';
import customerCreateRoute from '../CustomerCreate/route';
import customerChangeRoute from '../CustomerChange/route';

export default {
  component: CustomerList,
  path: '/customers',
  childRoutes: [customerCreateRoute, customerChangeRoute]
}
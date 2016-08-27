import IndexComponent from './app/Index';
import PageComponent from './app/Page';

const routes = {
  path: '',
  component: IndexComponent,
  childRoutes: [
    {
      path: '/',
      component: IndexComponent
    },
    {
      path: '/page/:nameslug',
      component: PageComponent
    }
  ]
};

export { routes };

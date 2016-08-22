import AppComponent from './app/App';
import PageComponent from './app/Page';
import IndexComponent from './app/Index.js';

const routes = {
  path: '',
  component: IndexComponent,
  childRoutes: [
    {
      path: '/',
      component: AppComponent
    },
    {
      path: '/page/:nameslug',
      component: PageComponent
    }
  ]
};

export { routes };

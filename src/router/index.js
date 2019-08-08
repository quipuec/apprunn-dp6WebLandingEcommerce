import Router from 'vue-router';
import login from './login';
import Components from './components';
import Profile from './profile';
import register from './register';
import Order from './buy';
import Category from './category';

export default function (Vue) {
	Vue.use(Router);
	const config = new Router({
		mode: 'history',
		routes: [
			{
				path: '/',
				name: 'page-home',
				component: () => import('@/pages/page-home'),
			},
			Category,
			Components,
			login,
			Order,
			Profile,
			register,
		],
	});
	return config;
}

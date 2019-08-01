import Router from 'vue-router';
import login from './login';
import Components from './components';
import Profile from './profile';
import register from './register';
import Products from './products';
import Order from './buy';

export default function (Vue) {
	Vue.use(Router);
	const config = new Router({
		mode: 'history',
		routes: [
			{
				path: '/',
				name: 'page-home',
				redirect: '/productos',
				component: () => import('@/pages/page-home'),
				children: [
					Components,
					Order,
					Products,
					Profile,
				],
			},
			login,
			register,
		],
	});
	return config;
}

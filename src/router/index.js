import Router from 'vue-router';
import login from './login';
import Components from './components';
import Profile from './profile';
import register from './register';

export default function (Vue) {
	Vue.use(Router);
	const config = new Router({
		mode: 'history',
		routes: [
			{
				path: '/',
				name: 'page-home',
				component: () => import('@/pages/page-home'),
				children: [
					Components,
					Profile,
				],
			},
			{
				path: '/category',
				name: 'page-categoty',
				component: () => import('@/pages/page-category'),
			},
			login,
			register,
		],
	});
	return config;
}

import Router from 'vue-router';
import login from './login';
import Components from './components';

export default function (Vue) {
	Vue.use(Router);
	const config = new Router({
		mode: 'history',
		routes: [
			{
				path: '/',
				name: 'page-home',
				component: () => import('@/pages/page-home'),
				children: [],
			},
			login,
			Components,
		],
	});
	return config;
}

import Router from 'vue-router';
import login from './login';
import components from './components';

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
			components,
			login,
		],
	});
	config.beforeEach((to, from, next) => next());
	return config;
}

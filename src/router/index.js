import Router from 'vue-router';
import login from './login';

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
		],
	});
	config.beforeEach((to, from, next) => {
		if (to.name !== 'login') {
			const token = window.localStorage.getItem(`${process.env.STORAGE_USER_KEY}::token`);
			if (token) {
				return next();
			}
			return next({ name: 'login' });
		}
		return next();
	});
	return config;
}

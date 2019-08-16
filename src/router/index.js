import Router from 'vue-router';
import login from './login';
import Components from './components';
import Profile from './profile';
import register from './register';
import Order from './buy';
import Help from './help';
import Category from './category';
import ProductDetail from './detail-product';
import restorePassword from './restore-password';

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
			Help,
			Category,
			Components,
			login,
			Order,
			Profile,
			register,
			ProductDetail,
			restorePassword,
		],
		scrollBehavior() {
			return { x: 0, y: 0 };
		},
	});
	return config;
}

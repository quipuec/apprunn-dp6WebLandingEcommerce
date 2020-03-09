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
import SummaryOrder from './summary-order';
import RecoverPassword from './recover-password';

export default function (Vue) {
	Vue.use(Router);
	const config = new Router({
		mode: 'history',
		routes: [
			{
				path: '/',
				name: 'page-home',
				meta: {
					title: 'Home',
					description: 'pantalla principal del ecommerce',
				},
				component: () => import(/* webpackChunkName: "home" */ '@/pages/page-home'),
				beforeEnter: (to, from, next) => {
					console.dir(`beforeEnter: ${to}-${from}`);
					next();
				},
				beforeRouteLeave: (to, from, next) => {
					console.log(`beforeRouteLeave: ${to}-${from}`);
					next();
				},
				beforeResolve: (to, from, next) => {
					console.log(`beforeResolve: ${to}-${from}`);
					next();
				},
			},
			Category,
			Components,
			Help,
			login,
			Order,
			ProductDetail,
			Profile,
			RecoverPassword,
			register,
			restorePassword,
			SummaryOrder,
		],
		scrollBehavior() {
			return { x: 0, y: 0 };
		},
	});
	return config;
}

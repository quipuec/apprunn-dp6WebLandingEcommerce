import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueAnalytics from 'vue-analytics';
import VueTheMask from 'vue-the-mask';
import 'normalize.css';
import App from './App';
import registerVuetify from './vuetify';
import {
	httpRequestInterceptor,
	httpResponseInterceptor,
	httpResponseSuccessInterceptor,
} from './http/index';
import registerAxios from './axios';
import vueRouter from './router';
import globalMixin from './mixins/global';
import registerFilters from './filters/global';
import './global-components';
import store from './store';
import helper from './shared/helper';

Vue.use(VueTheMask);
Vue.use(Vuelidate);
Vue.use(VueAnalytics, {
	id: 'UA-XXXXXXX-1',
	autoTracking: {
		screenview: true,
	},
	disableScriptLoader: true,
	sendHitTask: window.location.hostname === 'ecommerce.netlify.com',
});

const userInfo = helper.getLocalData('ecommerce-user');
const router = vueRouter(Vue);
registerFilters(Vue);
registerVuetify(Vue);
registerAxios(Vue);
Vue.prototype.$imageUrl = process.env.S3_IMAGES_URL;
Vue.prototype.$userInfo = userInfo;
Vue.config.productionTip = false;
Vue.mixin(globalMixin);

async function created() {
	const route = window.location.pathname;
	const surveyId = Number(route.split('/')[2]);
	helper.setLocalData('surveyId', surveyId);
	this.$http.interceptors.request.use(this.httpRequestInterceptor);
	this.$http.interceptors.response.use(
		this.httpResponseSuccessInterceptor,
		this.httpResponseInterceptor,
	);
	this.$httpAcl.interceptors.request.use(this.httpRequestInterceptor);
	this.$httpAcl.interceptors.response.use(
		this.httpResponseSuccessInterceptor,
		this.httpResponseInterceptor,
	);
	this.$httpSales.interceptors.request.use(this.httpRequestInterceptor);
	this.$httpSales.interceptors.response.use(
		this.httpResponseSuccessInterceptor,
		this.httpResponseInterceptor,
	);
	const token = helper.getLocalToken();
	if (token) {
		const { data: response } = await this.$httpSales.get('employee/current');
		helper.setLocalData('ecommerce-user', response);
		helper.setLocalData('acl-code', response.aclCode);
		this.$store.dispatch('setUser', response);
		Vue.prototype.$userInfo = this.$store.getters.user;
	}
}

/* eslint-disable no-new */
new Vue({
	created,
	el: '#app',
	methods: {
		httpRequestInterceptor,
		httpResponseInterceptor,
		httpResponseSuccessInterceptor,
	},
	router,
	render: h => h(App),
	store,
});

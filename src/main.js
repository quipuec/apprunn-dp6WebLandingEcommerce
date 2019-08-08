import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueAnalytics from 'vue-analytics';
import VueSimpleSVG from 'vue-simple-svg';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import VueTheMask from 'vue-the-mask';
import VueAuthenticate from 'vue-authenticate';
import axios from 'axios';
import VueAxios from 'vue-axios';
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
import registerMap from './vue-map';

registerAxios(Vue);
registerMap(Vue);
Vue.use(VueAxios, axios);
Vue.use(VueTheMask);
Vue.use(Vuelidate);
Vue.use(VueSimpleSVG);
Vue.use(VueAuthenticate, {
	baseUrl: process.env.ACL_URL,
	providers: {
		facebook: {
			clientId: process.env.CLIENT_ID,
			redirectUri: process.env.REDIRECT_URI,
			responseType: 'token',
			authorizationEndpoint: 'https://www.facebook.com/v4.0/dialog/oauth',
		},
	},
});
Vue.use(VueAnalytics, {
	id: 'UA-XXXXXXX-1',
	autoTracking: {
		screenview: true,
	},
	disableScriptLoader: true,
	sendHitTask: window.location.hostname === 'ecommerce.netlify.com',
});
Vue.use(VueAwesomeSwiper);

const userInfo = helper.getLocalData('ecommerce-user');
const router = vueRouter(Vue);
registerFilters(Vue);
registerVuetify(Vue);
Vue.prototype.$imageUrl = process.env.S3_IMAGES_URL;
Vue.prototype.$clientId = process.env.CLIENT_ID;
Vue.prototype.$userInfo = userInfo;
Vue.config.productionTip = false;
Vue.mixin(globalMixin);

async function created() {
	this.$httpProducts.interceptors.request.use(this.httpRequestInterceptor);
	this.$httpProducts.interceptors.response.use(
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
		const { data: response } = await this.$httpSales.get('customers/current');
		helper.setLocalData('ecommerce-user', response);
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

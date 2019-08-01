import store from '@/store';
import errors from './errors';


export function httpRequestInterceptor(config) {
	const headers = config.headers;
	if (store.state.token) {
		headers.common.Authorization = `Bearer ${store.state.token}`;
	} else {
		headers.common.Authorization = `Bearer ${process.env.TOKEN}`;
	}
	store.dispatch('toggleLoading', true);
	return config;
}

export function httpResponseSuccessInterceptor(response) {
	store.dispatch('toggleLoading', false);
	return response;
}

export function httpResponseInterceptor(error) {
	store.dispatch('toggleLoading', false);
	let text = 'Su sesión expiró.';
	const status = error.response.status;
	if (status === 401) {
		text = 'Correo o contraseña inválidos';
	} else if (status === 400) {
		text = errors(error.response);
	} else if (status === 403) {
		text = 'No tiene suficientes permisos para realizar ésta acción';
	} else if (status === 500) {
		text = 'No se logró completar la acción, intente de nuevo.';
	}
	store.dispatch('showSnackBar', { text, color: 'error' });
	return Promise.reject(error.response);
}

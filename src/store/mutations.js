import Vue from 'vue';

function clearUser(state) {
	Vue.set(state, 'token', null);
	Vue.set(state, 'user', null);
}

function setToken(state, token) {
	Vue.set(state, 'token', token);
}

function setUser(state, user) {
	Vue.set(state, 'user', user);
}

function showSnackBar(state, snackbar) {
	Vue.set(state.appConfig, 'snackbar', snackbar);
}

function toggleLoading(state, value) {
	Vue.set(state.appConfig, 'isLoading', value);
}

function UPDATE_POLL_PROGRESS(state, number) {
	Vue.set(state.pollData, 'progress', state.pollData.progress + number);
}

const methods = {
	clearUser,
	setToken,
	setUser,
	showSnackBar,
	toggleLoading,
	UPDATE_POLL_PROGRESS,
};

export default methods;

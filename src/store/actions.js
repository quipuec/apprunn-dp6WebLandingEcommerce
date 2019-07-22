function clearUser(context) {
	context.commit('clearUser');
}

function toggleLoading(context, value) {
	context.commit('toggleLoading', value);
}

function showSnackBar(context, snackbar) {
	const visibleSnackBar = { ...snackbar };
	visibleSnackBar.isVisible = true;
	visibleSnackBar.color = visibleSnackBar.color || 'primary';
	context.commit('showSnackBar', visibleSnackBar);
}

function setToken(context, token) {
	context.commit('setToken', token);
}

function setUser(context, user) {
	context.commit('setUser', user);
}

const methods = {
	clearUser,
	setUser,
	setToken,
	showSnackBar,
	toggleLoading,
};

export default methods;

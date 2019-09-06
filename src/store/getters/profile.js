export default {
	getAddress(state) {
		return state.profile.address;
	},
	getUserInfo(state) {
		return state.profile.userData;
	},
	getFavorites(state) {
		return state.profile.favorites;
	},
};

const methods = {
	getDeeper: (args) => {
		const propsFlow = args.split('.');
		return function innerGetDeeper(item) {
			let newItem = item;
			propsFlow.forEach((el) => {
				newItem = (newItem || {})[el];
			});
			return newItem;
		};
	},
};
export default methods;

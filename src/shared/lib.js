const methods = {
	/* eslint-disable max-len */
	compose: (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0],
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
	setNewProperty: (prop, v) => (item) => {
		const newItem = item;
		newItem[prop] = typeof v === 'function' ? v(item) : item;
		return newItem;
	},
	decimals: d => n => Number(n.toFixed(d)),

};
export default methods;

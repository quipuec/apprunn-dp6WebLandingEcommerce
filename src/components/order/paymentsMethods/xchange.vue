<template>
	<div>

	</div>
</template>
<script>
function created() {
	const isDev = process.env.NODE_ENV === 'development';
	const url = 'https://xchange.paybox.la/api/';
	const eviroment = isDev ? 'sandbox.js' : 'checkout.js';
	const [head] = document.getElementsByTagName('head');
	const xchangeScript = document.createElement('script');
	xchangeScript.setAttribute('src', `${url}${eviroment}`);
	head.appendChild(xchangeScript);
}

export default {
	name: 'xchange',
	created,
};
</script>
<style lang="scss" scoped>

</style>
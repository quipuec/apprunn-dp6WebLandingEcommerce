<template>
	<div>
		<button class="js-paymentez-checkout">Paymentez</button>
	</div>
</template>
<script>

function mounted() {
	/* eslint-disable new-cap */
	const paymentezCheckout = new window.PaymentezCheckout.modal({
		client_app_code: '',
		client_app_key: '',
		locale: 'es',
		env_mode: 'stg',
		onOpen: () => console.log('open Modal'),
		onClose: () => console.log('close Modal'),
		onResponse: response => console.log(response),
	});
	const btnOpenCheckout = document.querySelector('.js-paymentez-checkout');
	btnOpenCheckout.addEventListener('click', () => {
		paymentezCheckout.open({
			user_id: '1234',
			user_email: 'test@paymentez.com',
			user_phone: '7777777777',
			order_description: '1 Green Salad',
			order_amount: 1500,
			order_vat: 0,
			order_reference: '#234323411',
		});
	});
}

export default {
	name: 'paymentez',
	mounted,
};
</script>
<style lang="scss" scoped>

</style>
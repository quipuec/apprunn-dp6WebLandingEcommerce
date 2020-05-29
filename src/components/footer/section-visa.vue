<template>
  <div class="section-visa" v-if="isPeru">
		<img
			:src="indeterminate ? null : iconVisa"
			alt="logo_visa"
			:class="[
				'icon-visanet',
				{ 'loading': indeterminate },
			]"
		>
		<p
			:class="[
				'description-section-visa',
				{ 'loading': indeterminate },
			]"
		>{{description}}</p>
	</div>  
</template>

<script>
import { mapGetters } from 'vuex';

function data() {
	return {
		description: 'Esta tienda está autorizada por Visa para realizar transacciones electrónicas.',
		iconVisa: '/static/img/icons/icon-visanet.png',
	};
}

export default {
	name: 'section-visa',
	computed: {
		...mapGetters([
			'indeterminate',
		]),
	},
	data,
};
</script>

<style lang="scss" scoped>
.description-section-visa {
	color: color(dark);
	font-family: font(regular);
	font-size: size(medium);
	margin: 0 0 0 17px;

	@media (max-width: 650px) {
		font-size: size(msmall);
		margin: 9px 0 0 0;
		width: 243px;
	}
}

.section-visa {
	align-items: center;
	background-color: color(white);
	display: flex;
	padding: 35px 0 18px 84px;
	width: 100%;

	@media (max-width: 650px) {
		flex-direction: column;
		padding: 15px 40px;
		text-align: center;	
	}
}

.icon-visanet {
	@media (max-width: 650px) {
		height: 35px;
		width: 96px;
	}
}
</style>

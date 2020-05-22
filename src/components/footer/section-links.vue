<template>
	<div class="footer-main-container">
		<div class="section-links">
			<div v-for="item in menu" :key="item.id" class="mb-2">
				<p
					:class="[
						'title-section-links',
						{ 'loading loading-dark': indeterminate },
					]">{{ item.name }}</p>
				<ul v-for="link in item.details" :key="link.id">
					<li
						:class="[
							'section-link',
							{ 'loading': indeterminate },
						]"
						@click="goToHelp(item, link)"
					>
							{{ link.name }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { isEmpty } from '@/shared/lib';

function existcreditsCard() {
	if (!isEmpty(this.getCommerceData)) {
		const cards = this.getCommerceData.wayPayment.find(c => c.code === 'CDC');
		return Boolean(cards);
	}
	return false;
}

function goToHelp(item, link) {
	const newItem = item.name.split(' ').join('-');
	const newLink = link.name.split(' ').join('-');
	this.$router.push(`/ayuda/apartado/${newItem}/seccion/${newLink}`);
}

function data() {
	return {
		creditCards: [
			{ url: 'static/img/creditCards/visa.png', alt: 'visa' },
			{ url: 'static/img/creditCards/mastercard.png', alt: 'mastercard' },
			{ url: 'static/img/creditCards/american.png', alt: 'american express' },
			{ url: 'static/img/creditCards/diners.png', alt: 'diners' },
		],
	};
}

export default {
	name: 'section-links',
	computed: {
		...mapGetters([
			'getCommerceData',
			'indeterminate',
		]),
		existcreditsCard,
	},
	data,
	methods: {
		goToHelp,
	},
	props: {
		menu: {
			default: () => [],
			type: Array,
		},
	},
};
</script>

<style lang="scss" scoped>
.footer-main-container {
	padding: 44px 101px 20px 101px;
	
	@media (max-width: 925px) {
		padding: 0 5px;
	}
}

ul, ol {
	list-style: none;
	padding-left: 0;

	@media (max-width: 925px) {
		text-align: center;
	}
}

.title-section-links {
	color: color(dark);
	font-family: font(heavy);
	font-size: size(xlarge);

	@media (max-width: 925px) {
		font-size: size(minmedium);
		text-align: center;
	}
}

.section-link {
	color: color(dark);
	cursor: pointer;
	font-family: font(regular);
	font-size: size(minmedium);
	text-decoration: none;
}

.section-links {
	display: flex;
	justify-content: space-around;

	@media (max-width: 925px) {
		align-items: center;
		flex-direction: column;
	}
}

.mb-2 {
	margin-bottom: 24px !important;
}

.credit-cards {
	align-items: center;
	display: flex;
	justify-content: flex-start;

	img {
		height: 27px;
		margin-right: 30px;
	}
}
</style>

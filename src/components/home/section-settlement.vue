<template>
	<div class="section-settlement">
		<div class="container-slider">
			<settlement-carousel/>
		</div>
	</div>
</template>
<script>
import settlementCarousel from '@/components/home/settlement-carousel';

export default {
	name: 'section-settlement',
	components: {
		settlementCarousel,
	},
	props: {
		colorDark: String,
		colorBase: String,
	},
};
</script>
<style lang="scss" scoped>
	.section-settlement {
		display: flex;
		padding: 32px 5% 36px;

		@media (max-width: 1161px) {
			flex-direction: column;
		}
	}

	.container-publicity {
		width: 30%;

		@media (max-width: 1161px) {
			width: 100%;
		}
	}

	.container-slider {
		margin: auto;
		width: 70%;
		@media (max-width: 1161px) {
			width: 100%;
		}
	}
</style>


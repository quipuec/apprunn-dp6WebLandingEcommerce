<template>
	<div class="section-settlement">
		<div>
			<title-section 
				title="Liquidación" 
				:color="colorDark"/>
		</div>
		<settlement-carousel />
	</div>
</template>
<script>
const settlementCarousel = () => import('@/components/home/settlement-carousel');
const titleSection = () => import('@/components/home/title-section');

export default {
	name: 'section-settlement',
	components: {
		settlementCarousel,
		titleSection,
	},
	props: {
		colorDark: String,
	},
};
</script>

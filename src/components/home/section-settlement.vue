<template>
	<div class="section-settlement">
		<div>
			<title-section 
				title="Liquidación" 
				:color="colorBorder"/>
		</div>
		<settlement-carousel />
	</div>
</template>
<script>
const settlementCarousel = () => import('@/components/home/settlement-carousel');
const titleSection = () => import('@/components/home/settlement-carousel');

export default {
	name: 'section-settlement',
	components: {
		settlementCarousel,
		titleSection,
	},
	props: {
		colorBase: String,
	},
};
</script>

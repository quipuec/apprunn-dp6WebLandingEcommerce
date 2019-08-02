<template>
	<div class="buy-container">
		<div v-if="stepThree">Resumen de orden - Header</div>
		<div class="buy-layout">
			<section class="big">
				<div v-if="stepOneAndTwo">Tabla de productos</div>
				<router-view></router-view>
			</section>
			<section class="small">
				<summary-order/>
			</section>
		</div>
	</div>
</template>
<script>
import lib from '@/shared/lib';

function stepOneAndTwo() {
	const step = lib.getDeeper('meta.step')(this.$route);
	return step !== 3;
}

function stepThree() {
	return lib.getDeeper('meta.step')(this.$route) === 3;
}

export default {
	name: 'page-buy',
	components: {
		summaryOrder: () => import(/* webpackChunkName: "summaryOrder" */ '@/components/order/summary-order'),
	},
	computed: {
		stepOneAndTwo,
		stepThree,
	},
};
</script>
<style lang="scss" scoped>
	.buy-container {
		margin: 0 auto;
		max-width: 1200px;
	}
	.buy-layout {
		align-items: flex-start;
		display: flex;
		flex-wrap: wrap;
	}

	.big {
		flex: 1 1 65%;
		margin: 0 10px;
	}

	.small {
		flex: 1 1 30%;
		margin: 0 10px;
	}
</style>

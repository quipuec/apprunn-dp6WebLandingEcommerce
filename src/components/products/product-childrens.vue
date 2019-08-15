<template>
  <div class="product-childrens">
		<app-select
			v-for="(feature, index) in features"
			:key="index"
			:items="feature.values" 
			item-text="name" 
			item-value="code"
			class="select-feature"
			:value="feature.value"
			@input="selectFeature(index, $event)"
			@clear="$emit('clear')"
			v-model="feature.value"
			append-outer-icon="clear"
		/>
	</div>
</template>
<script>
const appSelect = () => import('@/components/shared/inputs/app-select');

function selectFeature(index, value) {
	this.$emit('select', index, value);
}

function data() {
	return {
		items: [],
	};
}
export default {
	name: 'product-childrens',
	components: {
		appSelect,
	},
	data,
	methods: {
		selectFeature,
	},
	props: {
		features: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
<style lang="scss" scoped>
	.product-childrens {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		@media screen and (max-width: 996px) {
			margin-bottom: 50px;
			padding: 0 5%;
		}
	}

	.select-feature {
		width: 45%;
		margin-bottom: 22px;
	}
</style>
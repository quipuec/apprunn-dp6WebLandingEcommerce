<template>
  <div class="my-4">
	  <div
	  	v-for="(feature, index) in features"
		:key="index"
		:class="[
			isLoading ? 'loading features' : 'product-childrens',
		]"
	  >
	  	<h3
		  	:class="{ 'loading': isLoading }"
			:style="`color:${globalColors.base}`"  
		>{{feature.name}}:</h3>
		<div class="wrap-buttons">
			<span
				v-for="v in feature.values"
				:key="v.value"
			>
				<AppFeatureButton
					class="ml-2 feature-button"
					v-show="!isLoading"
					:feature="v"
					:is-selected="v.isSelected"
					:disabled="v.disabled"
					@click="selectFeature(v)"
				/>
			</span>
		</div>
	  </div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function selectFeature(value) {
	this.$emit('selected', value);
}
export default {
	name: 'product-childrens',
	components: {
		AppFeatureButton: () => import('@/components/shared/buttons/app-feature-button'),
	},
	computed: {
		...mapGetters('loading', [
			'isLoading',
		]),
	},
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
		align-items: center;
		display: grid;
		grid-template-columns: 120px 3fr;
		margin-bottom: 10px;
	}

	.select-feature {
		margin-bottom: 22px;
		width: 45%;
	}

	.wrap-buttons {
		display: flex;
		justify-content: flex-start;
	}

	.feature-button {
		min-width: 80px;
	}

	.features {
		margin-bottom: 10px;
	}
</style>
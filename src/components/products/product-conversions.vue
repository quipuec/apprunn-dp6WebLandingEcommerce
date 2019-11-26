<template>
	<div
		class="conversions-container"
	>
		<h3
			:class="[
				isLoading ? 'loading' : 'conversions-title',
			]"
			:style="`color:${globalColors.base}`"
		>Presentaciones:</h3>
		<div
			:class="{ 'loading conversions-select-container': isLoading }"
		>
			<AppSelect
				v-show="!isLoading"
				class="conversions-select"
				placeholder="presentaciones..."
				:items="conversions"
			/>
		</div>
	</div>
</template>
<script>
import AppSelect from '@/components/shared/inputs/app-select';
import { mapGetters } from 'vuex';

function data() {
	return {
		conversions: [],
	};
}

export default {
	name: 'product-conversions',
	components: {
		AppSelect,
	},
	computed: {
		...mapGetters('loading', [
			'isLoading',
		]),
	},
	data,
};
</script>
<style lang="scss" scoped>
	.conversions-container {
		align-items: center;
		border-bottom: 1px solid color(border);
		border-top: 1px solid color(border);
		display: flex;
		justify-content: flex-start;
		margin-top: 10px;
		padding: 20px 0;
	}

	.conversions-title {
		margin-right: 10px;
	}

	.conversions-select-container {
		height: 24px;
		margin-left: 10px;
		width: 100%;
	}
</style>
<template>
	<div
		class="conversions-container"
	>
		<h3
			class="conversions-title"
			:style="`color:${globalColors.base}`"
		>Presentaciones:</h3>
		<div>
			<AppSelect
				class="conversions-select"
				placeholder="presentaciones..."
				:items="conversions"
			/>
		</div>
	</div>
</template>
<script>
import AppSelect from '@/components/shared/inputs/app-select';

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
</style>
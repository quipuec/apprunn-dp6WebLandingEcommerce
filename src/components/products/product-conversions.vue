<template>
	<div
		class="conversions-container"
	>
		<h3
			:class="[
				indeterminate ? 'loading' : 'conversions-title',
			]"
			:style="`color:${globalColors.base}`"
		>Presentaciones:</h3>
		<div
			:class="{ 'loading conversions-select-container': indeterminate }"
		>
			<AppSelect
				v-show="!indeterminate"
				return-object
				class="conversions-select"
				placeholder="presentaciones..."
				item-text="code"
				:items="conversionsComputed"
				:value="defaultUnit"
				@input="$emit('unit-selection', $event)"
			/>
		</div>
	</div>
</template>
<script>
import AppSelect from '@/components/shared/inputs/app-select';
import { mapGetters } from 'vuex';
import l from '@/shared/lib';

function conversionsComputed() {
	const conversionsFormatted = l.map(
		k => l.setNewProperty('id', Number(k))(this.conversions[k]),
		Object.keys(this.conversions),
	);
	return [].concat(this.defaultUnit, conversionsFormatted);
}

export default {
	name: 'product-conversions',
	components: {
		AppSelect,
	},
	computed: {
		...mapGetters([
			'indeterminate',
		]),
		conversionsComputed,
	},
	props: {
		conversions: {
			default: () => {},
			type: Object,
		},
		defaultUnit: {
			default: () => {},
			type: Object,
		},
	},
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
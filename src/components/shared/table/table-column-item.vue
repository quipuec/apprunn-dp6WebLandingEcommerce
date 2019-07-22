<template>
	<th :id="'column-' + column.id">
		<span v-if="column.isEditable">
			<span v-if="column.showInput">
				<input
					class="column-input"
					type="text"
					:placeholder="column.name"
					:ref="`colheader${column.id}`"
					@keyup.esc.enter="toggleInput(column)"
					@input="$emit('column-input', { event: $event, column })"
				/>
			</span>
			<span class="column-edit-container" v-else-if="column.tooltip">
				<v-tooltip top>
					<span slot="activator">{{ column.name }}</span>
					{{ column.tooltip }}
				</v-tooltip>
				<button @click="toggleInput(column)">
					<img
						height="11"
						title="Editar todas las filas a la vez"
						width="11"
						:src="`${$imageUrl}/edit-table.svg`"
					/>
				</button>
			</span>
			<span class="column-edit-container" v-else>
				{{column.name}}
				<button @click="toggleInput(column)">
					<img
						height="11"
						title="Editar todas las filas a la vez"
						width="11"
						:src="`${$imageUrl}/edit-table.svg`"
					/>
				</button>
			</span>
		</span>
		<span v-else-if="column.tooltip">
			<v-tooltip top>
				<span slot="activator">{{ column.name }}</span>
				{{ column.tooltip }}
			</v-tooltip>
		</span>
		<span v-else>
			{{ column.name }}
		</span>
		<button v-if="column.isSortable"
			@click="onColumnSortable(column)"
			class="sortable-button"
		>
			<i v-if="column.isSortable.down" class="sortable-icon material-icons icon">
				arrow_drop_down
			</i>
			<i v-if="column.isSortable.up" class="sortable-icon material-icons icon">
				arrow_drop_up
			</i>
		</button>
	</th>
</template>

<script>

const SORTABLE_COLUMN_EVENT = 'on-column-sortable';

function data() {
	return {
		showInput: false,
	};
}

function onColumnSortable(column) {
	this.$emit(SORTABLE_COLUMN_EVENT, column);
}

function toggleInput(column) {
	this.$set(column, 'showInput', !column.showInput);
	if (column.showInput) {
		this.$nextTick(() => {
			const columnInput = this.$refs[`colheader${column.id}`];
			if (columnInput) {
				columnInput.focus();
			}
		});
	}
}

export default {
	name: 'table-column-item',
	data,
	props: {
		column: {
			type: Object,
			required: true,
		},
		onCloumnSortable: {
			type: Function,
		},
	},
	methods: {
		onColumnSortable,
		toggleInput,
	},
};
</script>

<style lang="scss" scoped>
.column-edit-container {
	display: flex;
	justify-content: space-around;
}

.column-input {
	border-radius: 3px;
	background-color: map-get($colors, white);
	box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.2);
	color: map-get($colors, black);
	max-width: 93px;
	padding: 3px;
}
</style>

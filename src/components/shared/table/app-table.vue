<template>
	<table class="table-list" border="0" cellpadding="0" cellspacing="0">
		<thead>
			<tr v-if="inputSearch || filterColumns || includeFilter || addButton">
				<th :colspan="totalVisibleColumns" :class="`text-xs-${direction}`">
					<v-layout wrap align-center justify-space-between>
						<v-flex text-xs-left>
							<div class="table-title info--text">
								{{ title }}
							</div>
						</v-flex>
						<v-flex>
							<v-layout wrap align-center justify-end>	
								<div class="search-input" v-if="inputSearch">
									<input
										type="text"
										v-model="search"
										@keyup.enter="searchRows"
										@keyup.esc="searchRows"
									/>
									<img
										src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/magnifying-glass.svg"
										alt="Buscador"
										height="20"
										width="20"
									/>
								</div>
								<div xs2 v-if="iconEmployee" class="new-area center">
									<app-tooltip-button
										text="Nuevo Empleado"
										color="primary"
										img="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/add-group.svg"
										@click-icon="$emit('open-modal')"
									/>
								</div>
								<div xs2 v-if="iconArea" class="d-flex new-area">
									<app-tooltip-button
										text="Nueva Área"
										img="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/group-19-copy.svg"
										@click-icon="$emit('open-area')"
										color="primary"
									/>
								</div>
								<div xs2 v-if="iconEmployee" class="new-area center">
									<app-tooltip-button
										img="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/group-16-(1).svg"
										text="Asignar Área"
										color="info"
										@click-icon="$emit('open-area')"
										:disabled="disabledAssign"
									/>
								</div>
								<div xs2 v-if="iconExcel" text-xs-center class="new-area center">
									<app-tooltip-button
										img="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/icon.svg"
										text="Importar Empleados"
									/>
								</div>
							</v-layout>
						</v-flex>
						<v-flex v-if="filterColumns || includeFilter || addButton">
							<v-menu
								offset-y
								:nudge-left="97"
								max-height="300"
								content-class="columns-menu"
								fixed
								v-model="showMenu"
								v-if="filterColumns"
								:close-on-content-click="false">
								<button slot="activator">
									<v-icon>view_column</v-icon>
								</button>
								<div>
									<template v-for="column in columns">
										<v-checkbox
											v-model="column.checked"
											:label="column.name"
											:key="column.id"
											hide-details
											v-if="!column.flagVisible"
											color="success"
											style="background: white">
										</v-checkbox>
									</template>
									<div class="apply text-xs-center">
										<button @click="toggleColumns">Aplicar</button>
									</div>
								</div>
							</v-menu>
							<button
								class="vertical-align-middle"
								v-if="includeFilter"
								type="button"
								@click="tableOption">
								<v-icon dark>filter_list</v-icon>
							</button>
							<button
								v-if="addButton"
								type="button"
								@click="addOption">
								<v-icon>add</v-icon>
							</button>
						</v-flex>
					</v-layout>
				</th>
			</tr>
			<tr>
				<th class="text-xs-center td-check" v-if="selectable">
					<input
						type="checkbox"
						:value="checkAll"
						:checked="checkAll"
						class="input-checkbox"
						@change="selectedAll($event)">
				</th>
				<th
					is="table-column-item"
					class="primary--text text-xs-left"
					v-for="column in columns"
					:key="column.id"
					:column="column"
					v-show="column.visible"
					:class="column.flagVisible ? 'text-xs-center' : 'text-xs-left'"
				></th>
			</tr>
		</thead>
		<tbody>
			<template>
				<tr v-for="row in rows"
					:key="row[keyValue]"
					:class="{ 'row-checked' : row.isSelected}"
					class="info--text"
					@click="rowIsSelected(row)">
					<td v-if="selectable" class="td-check">
						<input
							type="checkbox"
							v-model="row.isSelected"
							class="input-checkbox"
							:disabled="dispatchDetail && (row.flagDispatch > 0)">
					</td>
					<slot name="rows" :row="row"></slot>
				</tr>
			</template>
		</tbody>
		<tfoot class="table-pagination">
			<tr v-if="mainList && rows.length > 0">
				<td :colspan="totalVisibleColumns" class="text-xs-right info--text">
					<input
						type="text"
						@input="selectPage($event.target.value)"
						:value="currentPage"
						class="search-input unique-input">
					<a
						v-for="(page, index) in pages"
						:key="index"
						:class="{ 'active-page': page === currentPage }"
						@click="selectPage(page)">{{page}}</a>
					<span>|</span>
					<a @click="selectLastPage">>></a>
				</td>
			</tr>
			<tr v-if="rows.length === 0">
				<td :colspan="totalVisibleColumns"
					:style="!mainList ?
						'border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;' :
						'border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;'"
					class="info--text"
				>
					<p style="text-align:center; margin: 5px 0 0 5px" class="info--text">
						No hay información que mostrar
					</p>
				</td>
			</tr>
		</tfoot>
	</table>
</template>

<script>

import TableColumnItem from './table-column-item';
import helper from './../../../shared/helper';

const ADD_REQUEST_EVENT = 'on-add-event';
const LOCAL_SEARCH_EVENT = 'on-local-search';
const SEARCH_EVENT = 'on-search-event';
const ON_DRAG_EVENT = 'on-drag-event';
const ON_DRAG_ENTER = 'on-drag-enter';
const ON_DRAG_LEAVE = 'on-drag-leave';
const ON_DROP_EVENT = 'on-drop-event';
const ON_PAGE_EVENT = 'on-page';
const ROW_IS_SELECTED = 'row-is-selected';
const ROW_ON_CLICK = 'row-on-click';
const SELECTED_ALL_EVENT = 'on-selected-all';
const TABLE_OPTION_EVENT = 'table-option-event';

const components = {
	TableColumnItem,
};

function addOption() {
	this.$emit(ADD_REQUEST_EVENT);
}

function pagination(pageNumber, totalRecords) {
	const current = pageNumber;
	const last = totalRecords;
	const delta = 2;
	const left = current - delta;
	const right = current + delta + 1;
	const range = [];
	const rangeWithDots = [];
	let l = null;

	for (let i = 1; i <= last; i += 1) {
		/* eslint-disable no-mixed-operators */
		if (i === 1 || i === last || i >= left && i < right) {
			range.push(i);
		}
	}

	/* eslint-disable no-restricted-syntax */
	for (const i of range) {
		if (l) {
			if (i - l === 2) {
				rangeWithDots.push(l + 1);
			} else if (i - l !== 1) {
				rangeWithDots.push('...');
			}
		}
		rangeWithDots.push(i);
		l = i;
	}

	return rangeWithDots;
}

function data() {
	return {
		direction: 'right',
		search: '',
		showMenu: false,
	};
}

function mounted() {
	window.addEventListener('resize', this.optionsDirection);
	this.optionsDirection();
	const columnsInLocalStorage = helper.getLocalData(`${this.$attrs.name}::columns`);
	if (columnsInLocalStorage) {
		this.columns.forEach((col) => {
			const newCol = col;
			const colToChange = columnsInLocalStorage.find(c => c.id === newCol.id);
			if (colToChange) {
				newCol.visible = colToChange.visible;
				newCol.checked = colToChange.checked;
			}
		});
	}
	if (this.localStorage) {
		const searchFromLocalStorage = helper.getLocalData(`${this.$attrs.name}::search`);
		if (searchFromLocalStorage) {
			this.search = searchFromLocalStorage;
			this.$emit(SEARCH_EVENT, searchFromLocalStorage);
		}
	}
}

function toggleColumns() {
	this.selectedColumns = this.columns.filter(c => !c.checked);
	this.columns.forEach((col) => {
		const newCol = col;
		const colToChange = this.selectedColumns.find(c => c.id === newCol.id);
		newCol.visible = typeof colToChange === 'undefined';
	});
	helper.setLocalData(`${this.$attrs.name}::columns`, this.selectedColumns);
	this.showMenu = false;
}

function selectedAll({ target }) {
	this.$emit(SELECTED_ALL_EVENT, target.checked);
}

function rowIsSelected(row) {
	if (this.selectable) {
		this.$set(row, 'isSelected', !row.isSelected);
		this.$emit(ROW_IS_SELECTED, row);
	} else {
		this.$emit(ROW_ON_CLICK, row);
	}
}

function searchRows($event) {
	const keyCode = $event.keyCode;
	if (keyCode === 27) {
		this.search = '';
	}
	if (this.localSearch) {
		const dataToLocalSearch = this.search.toLowerCase();
		helper.setLocalData(`${this.$attrs.name}::search`, dataToLocalSearch);
		this.$emit(LOCAL_SEARCH_EVENT, dataToLocalSearch);
	} else {
		helper.setLocalData(`${this.$attrs.name}::search`, this.search);
		this.$emit(SEARCH_EVENT, this.search);
	}
}

function onDragEnter(row) {
	this.$emit(ON_DRAG_ENTER, row);
}

function onDragLeave(row) {
	this.$emit(ON_DRAG_LEAVE, row);
}

function onDrop(row) {
	this.$emit(ON_DROP_EVENT, row);
}

function onDrag(row) {
	this.$emit(ON_DRAG_EVENT, row);
}

function changePage(page) {
	if (page !== '...') {
		if (page !== this.currentPage) {
			this.$emit(ON_PAGE_EVENT, page);
		}
	}
}

function cleanSearch(val) {
	if (val) {
		this.search = '';
	}
}

function selectPage(page) {
	let newPage = page > this.lastPage ? this.lastPage : page;
	newPage = newPage <= 0 ? 1 : newPage;
	changePage.call(this, Number(newPage));
}

function selectLastPage() {
	changePage.call(this, this.lastPage);
}

function tableOption() {
	const action = {
		active: true,
		code: 'filter-by',
		color: '#fafafa',
		imgSrc: '/static/img/actions-list/cancel.svg',
		open: true,
		title: 'FILTRAR POR',
		width: 229,
	};
	this.$emit(TABLE_OPTION_EVENT, action);
}

function optionsDirection() {
	if (window.innerWidth < 768) {
		this.direction = 'left';
	} else {
		this.direction = 'right';
	}
}

function totalVisibleColumns() {
	return this.columns.filter(c => c.visible).length + 1;
}

function pages() {
	return pagination(this.currentPage, this.lastPage);
}

export default {
	name: 'app-table',
	components,
	computed: {
		pages,
		totalVisibleColumns,
	},
	data,
	methods: {
		addOption,
		onDrag,
		onDragEnter,
		onDragLeave,
		onDrop,
		optionsDirection,
		rowIsSelected,
		searchRows,
		selectedAll,
		selectPage,
		selectLastPage,
		tableOption,
		toggleColumns,
	},
	mounted,
	props: {
		iconArea: {
			default: false,
			type: Boolean,
		},
		iconEmployee: {
			default: false,
			type: Boolean,
		},
		addButton: {
			default: false,
			type: Boolean,
		},
		checkAll: {
			type: Boolean,
			default: false,
		},
		columns: {
			type: Array,
			required: true,
		},
		currentPage: {
			type: Number,
			default: 1,
		},
		dispatchDetail: {
			default: false,
			type: Boolean,
		},
		filterColumns: {
			default: true,
			type: Boolean,
		},
		includeFilter: {
			type: Boolean,
			default: false,
		},
		inputSearch: {
			default: true,
			type: Boolean,
		},
		localSearch: {
			type: Boolean,
			default: false,
		},
		localStorage: {
			type: Boolean,
			default: false,
		},
		rows: {
			type: Array,
			required: true,
		},
		selectable: {
			type: Boolean,
			default: false,
		},
		lastPage: {
			type: Number,
			default: 0,
		},
		keyValue: {
			type: String,
			default: 'id',
		},
		mainList: {
			type: Boolean,
			default: true,
		},
		cleanSearch: {
			default: false,
			type: Boolean,
		},
		title: String,
		iconExcel: {
			default: false,
			type: Boolean,
		},
		disabledAssign: {
			default: false,
			type: Boolean,
		},
	},
	watch: {
		cleanSearch,
	},
};

</script>

<style lang="scss" scoped>
	input {
		background-color: transparent;
		border-style: none;
	}

	table.table-list {
		border: 1px solid map-get($colors, gray);
		box-shadow: 0 2px 7px 0 rgba(0, 0, 0, .2);
		width: 100%;

		thead {
			background-color: map-get($colors, white);
			color: map-get($colors, primary);

			th {
				align-items: center;
				border-top: 1px solid map-get($colors, gray);
				font-family: map-get($fonts, opens-semibold);
				font-size: 13px;
				font-weight: 500;
				height: 38px;
				padding: 8px;
				text-align: left;

				&:first-child {
					padding-left: 9px;
					text-align: left;
					width: 34px;
				}

				.check-list {
					margin-top: -1px !important;
				}
			}

			tr {
				&:first-child {
					th {
						border-top: 0px;
						height: 73px;

						&:last-child {
							padding-right: 20px;
						}
					}
				}

				&:not(:first-child) {
					text-align: left;

					th:first-child {
						&.td-check {
							padding-left: 15px;
						}

						&:not(.td-check) {
							padding-left: 51px;
						}
					}

					th {
						text-transform: uppercase;
					}
				}
			}

			button {
				background-color: map-get($colors, success);
				border: 0px;
				border-radius: 4px;
				height: 22px;
				line-height: 22px;
				margin-left: 3px;
				outline: none;
				width: 25px;

				.icon {
					color: white;
					height: 20px;
					line-height: 19px;
				}
			}
		}	

		&.is-not-selectable {
			th {
				&:first-child {
					width: auto;
				}
			}
		}


		tbody {
			tr {
				background-color: white;
				font-size: 13px;

				td {
					align-items: center;
					border-top: 1px solid map-get($colors, gray);
					height: 62px;
					padding: 0px 5px;
					text-align: left;

					&:first-child {
						&.td-check {
							padding-left: 15px;
						}

						&:not(.td-check) {
							padding-left: 51px;
						}

						&:not(.is-not-selectable) {
							border-left: 1px solid transparent;
							border-right: 0px;
							padding-left: 8px;
							text-align: center;
							width: 34px;
						}
					}

					&:last-child {
						border-right: 1px solid transparent;
					}

					.check-list {
						margin-top: -1px !important;
					}

					.table-icon {
						img {
							vertical-align: middle;
						}

						&.btn {
							background-color: transparent;
							box-shadow: none;
							margin: 0px;
							min-width: auto;
						}
					}
				}

				&:hover {
					td:not(.td-employee) {
						border-bottom: 1px solid map-get($colors, primary);
						border-top: 1px solid map-get($colors, primary);
						color: map-get($colors, black);
						font-family: map-get($fonts, bold);

						&:first-child {
							border-left: 1px solid map-get($colors, primary);
						}

						&:last-child {
							border-right: 1px solid map-get($colors, primary) !important;
						}
					}
				}
			}

			tr.is-select {
				td:not(.td-employee) {
					border-bottom: 1px solid map-get($colors, primary);
					border-top: 1px solid map-get($colors, primary);
					color: map-get($fonts, info);
					font-family: map-get($fonts, opens-regular);

					&:first-child {
						border-left: 1px solid map-get($colors, primary);
					}

					&:last-child {
						border-right: 1px solid map-get($colors, primary);
					}
				}

				&-employee {
					td.td-employee {
						border-bottom: 1px solid map-get($colors, primary);
						border-top: 1px solid map-get($colors, primary);
						color: grey;
						font-family: map-get($fonts, opens-regular);

						&:first-child {
							border-left: 1px solid map-get($colors, primary);
						}

						&:last-child {
							border-right: 1px solid map-get($colors, primary);
						}
					}
				}
			}
		}

		tfoot {
			tr {
				td {
					background-color: white;
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
					border-top: 1px solid map-get($colors, subheaderText);
					box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, .2);
					height: 29px;
					padding-right: 17px;

					a {
						color: map-get($colors, paginationText);
						font-family: map-get($fonts, open-regular);
						font-size: 15px;
						font-weight: lighter;
						line-height: 10px;
						margin-left: 7px;
						padding: 5px;

						& + span {
							color: map-get($colors, grey-border);

							& + a {
								margin-left: 0px;
							}
						}

						&.active-page {
							color: red;
						}
						&:hover {
							font-size: 18px;
						}
					}
				}
			}
		}

		&.no-main-list {
			border-bottom: 1px solid map-get($colors, gray);
		}

		.search-input {
			background-color: map-get($colors, white);
			border: 1px solid map-get($colors, gray);
			border-radius: 4px;
			display: inline-flex;
			height: 37px;
			max-width: 287px;
			vertical-align: middle;
			width: 100%;

			input {
				color: map-get($colors, info);
				font-size: 14px;
				outline: none;
				padding: 0 5px;
				width: calc(100% - 25px);
			}

			img {
				align-self: center;
			}
		}

		.checkbox {
			.icon {
				font-size: 14px;
			}

			.input-group--selection-controls__ripple {
				height: 15px;
				left: 13px;
				width: 15px;
			}
		}

		.input-checkbox {
			border: 1px solid map-get($colors, grey-border);
			border-radius: 1px;
			height: 12px;
			width: 12px;
		}
	}

	.unique-input {
		border: 1px solid map-get($colors, black);
		opacity: 0.1;
		padding-left: 5px;
		width: 50px;
	}

	.unique-input:focus-within{
		opacity: 1;
	}

	.row-checked {
		background-color: map-get($colors, rowSelected) !important;
	}

	.v-menu .v-icon {
		color: map-get($colors, white) !important;
	}

	.vertical-align-middle {
		vertical-align: middle;
	}

	.table-title {
		font-family: map-get($fonts, bold);
		font-size: map-get($sizes, xlarge);
		margin-left: 22px;
		vertical-align: middle;
	}

	.btn-employee {
		background-color: transparent !important;
	}

	.new-area {
		border-left: 1px solid map-get($colors, gray);
		display: flex;
		justify-content: flex-start;
		margin-left: 16px !important;
		padding-left: 11px !important;

		&.center {
			justify-content: center;
		}
	}
</style>

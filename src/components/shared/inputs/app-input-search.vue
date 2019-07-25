<template>
  <div class="app-input-search">
		<img 
			src="/static/img/search.svg" 
			alt="Buscar"
			class="icon-search">
		<input
			v-bind="$attrs"
			class="app-input"
			placeholder="¿Qué buscas?"
		/>
	</div>
</template>
<script>

export default {
	name: 'app-input-search',
};
</script>
<style lang="scss" scoped>
	.app-input-search {
		border: solid 2px color(border);
		border-radius: 8px;
		display: flex;
		padding: 9px 14px;

		@media (max-width: 764px) {
			border: solid 1px color(border);
			border-radius: 3px;
		}
	}

	.app-input {
		background-color: color(white);
		border-color: transparent;
		border-radius: 7px;
		border-style: solid;
		border-width: 1px;
		font-family: font(demi);
		font-size: size(medium);
		outline: none;
		padding: 0px 16.2px;
		width: 100%;
	}

	.icon-search {
		height: 22px;

		@media (max-width: 764px) {
			height: 17px;
		}
	}
</style>



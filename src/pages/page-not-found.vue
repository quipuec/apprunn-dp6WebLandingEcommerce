<template>
	<div class="not-found">
		<h1 :style="`color:${globalColors.primary}`">404</h1>
		<h2 :style="`color:${globalColors.base}`">(0.0)</h2>
		<router-link :to="{ name: 'page-home' }">Inicio</router-link>
	</div>
</template>
<script>
export default {
	name: 'page-not-found',
};
</script>
<style lang="scss" scoped>
.not-found {
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;

	h1 {
		font-size: 54px;
	}

	h2 {
		font-size: 40px;
	}
}
</style>
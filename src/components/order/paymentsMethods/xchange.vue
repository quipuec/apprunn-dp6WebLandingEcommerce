<template>
	<div>
		<div id="ButtonPaybox" class="xchange-btn"></div>
		<div v-show="false">
			<input type="text" id="PayboxRemail" value="xchange@mail.com">
			<input type="text" id="PayboxSendmail" value="asd@mail.com">
			<input type="text" id="PayboxRename" value="pepe">
			<input type="text" id="PayboxSendname" value="jj">
			<input type="text" id="PayboxAmount" value="100">
		</div>
	</div>
</template>
<script>

export default {
	name: 'xchange',
};
</script>
<style lang="scss" scoped>
.xchange-btn {

	button {
		width: 210px !important;
	}
}
</style>
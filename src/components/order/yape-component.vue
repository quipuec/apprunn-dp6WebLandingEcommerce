<template>
	<button
		type="button"
		class="yape-btn"
		:style="`border:1px solid ${globalColors.base}`"
	>
		<span class="yape-btn-content">Pague con: </span>
		<img
			src="https://lh3.googleusercontent.com/y5S3ZIz-ohg3FirlISnk3ca2yQ6cd825OpA0YK9qklc5W8MLSe0NEIEqoV-pZDvO0A8=s180-rw"
			alt="logo_yape"
		>
	</button>
</template>
<script>
export default {
	name: 'yape-component',
};
</script>
<style lang="scss" scoped>
.yape-btn {
	align-items: center;
	background-color: white;
	border-radius: 12px;
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
	transition: background-color, color 150ms ease-in-out;
	width: 180px;

	.yape-btn-content {
		font-family: font(bold);
		font-size: size(large);
	}

	img {
		border-radius: 50%;
		height: 45px;
		width: 45px;
	}

	&:hover {
		background-color: #7D349B;
		color: white;
	}
}
</style>
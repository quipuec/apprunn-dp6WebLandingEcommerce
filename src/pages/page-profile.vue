<template>
	<layout-admin>
		<section class="profile-layout">
			<div
				:style="`background-color: ${globalColors.dark};`"
				class="profile-menu"
			>
				<div class="user-avatar-container">
					<div
						:style="`border: 2px solid ${globalColors.primary};`"
						class="user-avatar-wrapper"
					>
						<div class="user-avatar"></div>
					</div>
				</div>
				<h3 class="user-name">Manuel Amado</h3>
				<ul class="user-actions">
					<li class="user-action">
						<button
							:style="`border-bottom: 6px solid ${globalColors.dark};${borderPrimaryUserData}`"
							:class="[
								'user-action-btn',
							]"
							@click="goTo('user-data')"
						>Mis Datos</button>
					</li>
					<li class="user-action">
						<button
							:style="`border-bottom: 6px solid ${globalColors.dark};${borderPrimaryUserOrder}`"
							:class="[
								'user-action-btn',
							]"
							@click="goTo('user-orders')"
						>Mis Órdenes</button>
					</li>
					<li class="user-action">
						<button
							:style="`border-bottom: 6px solid ${globalColors.dark};${borderPrimaryFavorites}`"
							:class="[
								'user-action-btn',
							]"
							@click="goTo('favorites')"
						>Mis Favoritos</button>
					</li>
					<li class="user-action">
						<button
							:style="`border-bottom: 6px solid ${globalColors.dark};${borderPrimaryAddress}`"
							:class="[
								'user-action-btn',
							]"
							@click="goTo('address')"
						>Direcciones</button></li>
					<li class="user-action user-logout">
						<button
							:style="`border-bottom: 6px solid ${globalColors.dark};`"
							class="user-action-btn "
						>Cerrar sesión</button></li>
				</ul>
			</div>
			<div class="profile-info">
				<router-view></router-view>
			</div>
		</section>
	</layout-admin>
</template>
<script>

function goTo(name) {
	this.$router.push({ name });
}

function borderPrimaryUserData() {
	const border = `border-bottom: 6px solid ${this.globalColors.primary};`;
	const { name } = this.$route;
	return (name === 'user-data-details' || name === 'edit-user-data') ? border : null;
}

function borderPrimaryUserOrder() {
	const border = `border-bottom: 6px solid ${this.globalColors.primary};`;
	const { name } = this.$route;
	return (name === 'user-orders' || name === 'order-detail') ? border : null;
}

function borderPrimaryFavorites() {
	const border = `border-bottom: 6px solid ${this.globalColors.primary};`;
	const { name } = this.$route;
	return name === 'favorites' ? border : null;
}

function borderPrimaryAddress() {
	const border = `border-bottom: 6px solid ${this.globalColors.primary};`;
	const { name } = this.$route;
	return name === 'address' ? border : null;
}

export default {
	name: 'page-profile',
	computed: {
		borderPrimaryAddress,
		borderPrimaryFavorites,
		borderPrimaryUserData,
		borderPrimaryUserOrder,
	},
	methods: {
		goTo,
	},
};
</script>
<style lang="scss" scoped>
	.profile-layout {
		align-items: center;
		display: grid;
		grid-template-columns: 342px 1fr;
		min-height: 630px;
		margin: auto;
		max-width: 1142px;
		padding-top: 100px;

		@media (max-width: 900px) {
			grid-template-columns: 1fr;
		}

		@media (max-width: 768px) {
			height: auto;
			padding: 90px 15px 0;
			position: relative;
		}
	}

	.profile-menu {
		border-radius: 7px;
		flex: 1 1 30%;
		height: 100%;
		padding: 122px 0 0;
		position: relative;
		text-align: center;

		@media (max-width: 768px) {
			padding: 100px 0px 14px;
		}
	}

	.user-avatar-container {
		align-items: center;
		bottom: 85%;
		display: flex;
		justify-content: center;
		position: absolute;
		width: 100%;

		@media (max-width: 768px) {
			bottom: 75%;
		}
	}

	.user-avatar-wrapper {
		align-items: center;
		background-color: transparent;
		border-radius: 50%;
		display: flex;
		height: 148px;
		justify-content: center;
		width: 148px;
	}

	.user-avatar {
		background-image: url('/static/img/user-avatar.jpg');
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		border-radius: 50%;
		height: 128px;
		object-fit: contain;
		width: 128px;
	}

	.profile-info {
		background-color: color(disabled);
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.08);
		flex: 1 1 70%;
		height: 100%;
		padding: 17px 0px;
		position: relative;

		@media (max-width: 768px) {
			height: auto;
		}
	}

	.user-actions {
		align-items: center;
		display: grid;
		grid-template-columns: 1fr;
		padding: 0 50px;

		@media (max-width: 768px) {
			grid-column-gap: 10px;
			grid-template-columns: repeat(2, 1fr);
			padding: 0 75px;
		}
	}

	.user-name,
	.user-actions {
		color: color(background);
		font-family: font(bold);
		font-size: size(medium);
		padding: 0;
	}

	.user-action {
		list-style: none;
		margin-bottom: 15px;
	}

	.user-action-btn {
		width: 92px;
	}

	.user-name {
		font-size: size(large);
		margin-bottom: 20px;

		@media (max-width: 500px) {
			margin-bottom: 35px;
		}
	}

	.user-logout {
		color: color(border);

		@media (max-width: 768px) {
			grid-column: 2;
		}
	}
</style>


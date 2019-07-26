<template>
	<layout-admin>
		<section class="profile-layout">
			<div class="profile-menu">
				<div class="user-avatar-container">
					<div class="user-avatar-wrapper">
						<div class="user-avatar"></div>
					</div>
				</div>
				<h3 class="user-name">Manuel Amado</h3>
				<ul class="user-actions">
					<li class="user-action"><button class="user-action-btn active">Mis Datos</button></li>
					<li class="user-action"><button class="user-action-btn ">Mis Órdenes</button></li>
					<li class="user-action"><button class="user-action-btn ">Mis Favoritos</button></li>
					<li class="user-action"><button class="user-action-btn ">Direcciones</button></li>
					<li class="user-action user-logout"><button class="user-action-btn ">Cerrar sesión</button></li>
				</ul>
			</div>
			<div class="profile-info">
				<router-view></router-view>
			</div>
		</section>
	</layout-admin>
</template>
<script>
export default {
	name: 'page-profile',
};
</script>
<style lang="scss" scoped>
	.profile-layout {
		align-items: center;
		display: flex;
		height: 630px;
		justify-content: flex-start;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin: auto;
		max-width: 1142px;
		padding-top: 100px;

		@media (max-width: 768px) {
			height: auto;
			padding: 0 15px;
			padding-top: 90px;
		}
	}

	.profile-menu {
		background-color: color(dark);
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
		border: 2px solid color(primary);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		height: 148px;
		width: 148px;
	}

	.user-avatar {
		background-image: url('/static/img/user-avatar.jpg');
		background-repeat: no-repeat;
		background-position: center;
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
			padding: 17px 10px;
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
		font-size: size(small);
	}

	.user-action {
		list-style: none;
		margin-bottom: 15px;
	}

	.user-action-btn {
		border-bottom: 6px solid color(dark);
		width: 92px;
	}

	.active {
		border-bottom: 6px solid color(primary);
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


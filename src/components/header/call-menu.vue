<template>
	<button 
		class="call-menu"
		@click="toggleMenu">
		<div class="call-menu-btn" :class="{open: menuIsVisible}">
			<span :style="`background: ${color}`" class="call-menu-line"></span>
			<span :style="`background: ${color}`" class="call-menu-line"></span>
			<span :style="`background: ${color}`" class="call-menu-line"></span>
		</div>
		<p :style="`color: ${color}`" class="call-menu-text mt-2">{{text}}</p>
	</button>
</template>
<script>
function toggleMenu() {
	this.menuIsVisible = !this.menuIsVisible;
}

function data() {
	return {
		menuIsVisible: false,
	};
}

export default {
	name: 'call-menu',
	data,
	methods: {
		toggleMenu,
	},
	props: {
		color: String,
		text: String,
	},
};

</script>
<style lang="scss" scoped>
	.call-menu {
		align-items: center;
		display: inline-flex;
		flex-direction: column;
	}

	.call-menu-btn {
		border: 2px solid color(border);
		border-radius: 50%;
		height: 34px;
		position: relative;
		transition: .5s ease-in-out;
		width: 36px;
		
		@media (max-width: 764px) {
			border: none;
		}

		.call-menu-line {
			display: block;
			height: 2px;
			left: 9px;
			position: absolute;
			transition: .5s ease-in-out;
			width: 14px;
			
			&:nth-child(1) {
				top: 10px;
				transform-origin: left center;
			}

			&:nth-child(2) {
				top: 14px;
				transform-origin: left center;
			}

			&:nth-child(3) {
				top: 18px;
				transform-origin: left center;
			}

			@media (max-width: 764px) {
				width: 18px;
			}
		}

		&.open {
			span:nth-child(1) {
				left: 11px;
				top: 9px;
				transform: rotate(45deg);

				@media (max-width: 764px) {
					top: 7px;
				}
			}

			span:nth-child(2) {
				opacity: 0;
				width: 0%;
			}

			span:nth-child(3) {
				left: 11px;
				top: 19px;
				transform: rotate(-45deg);
			}
		}
	}

	.call-menu-text {
		font-family: font(bold);
		font-size: size(msmall);
		margin-bottom: 0px;

		@media (max-width: 764px) {
			display: none;
		}
	}
</style>


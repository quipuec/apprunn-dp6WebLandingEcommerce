<template>
	<button type="button" @click="clicked">
		<svg width="40px" height="36px" viewBox="0 0 40 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<g id="PERFIL" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<g id="8_PERFIL_V2" transform="translate(-1114.000000, -454.000000)">
					<g id="Group-21" transform="translate(439.000000, 404.000000)">
						<g id="Group-15" transform="translate(675.000000, 50.000000)">
							<rect id="Rectangle-10" fill="#F42B17" fill-rule="nonzero" x="0" y="0" width="40" height="36" rx="4"></rect>
							<polygon id="+" fill="#FFFFFF" points="22.7847848 20.46875 22.7847848 27 18.3603604 27 18.3603604 20.46875 11.1111111 20.46875 11.1111111 16.53125 18.3263263 16.53125 18.3263263 10 22.7507508 10 22.7507508 16.53125 30 16.53125 30 20.46875"></polygon>
						</g>
					</g>
				</g>
			</g>
		</svg>
	</button>
</template>
<script>
function clicked() {
	this.$emit('click');
}
export default {
	name: 'plus-component',
	methods: {
		clicked,
	},
};
</script>


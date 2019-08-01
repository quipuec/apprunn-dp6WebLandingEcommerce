<template>
	<button type="button" @click="clicked">
		<svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20">
			<g fill="#4A4A4A" fill-rule="nonzero">
				<path d="M9.5 0C4.262 0 0 4.274 0 9.528c0 5.254 4.262 9.528 9.5 9.528S19 14.782 19 9.528C19 4.274 14.738 0 9.5 0zm0 17.423c-4.34 0-7.871-3.542-7.871-7.895S5.159 1.633 9.5 1.633c4.34 0 7.871 3.542 7.871 7.895s-3.53 7.895-7.871 7.895z"/>
				<path d="M12.845 6.173a.74.74 0 0 0-1.048 0L9.5 8.477 7.203 6.173a.74.74 0 0 0-1.048 0c-.29.29-.29.76 0 1.05l2.297 2.305-2.297 2.304a.744.744 0 0 0 .524 1.27c.19 0 .38-.073.524-.219L9.5 10.58l2.297 2.304a.738.738 0 0 0 1.048 0c.29-.29.29-.76 0-1.05l-2.297-2.305 2.297-2.304c.29-.29.29-.76 0-1.051z"/>
			</g>
		</svg>
	</button>
</template>
<script>
function clicked() {
	this.$emit('click');
}
export default {
	name: 'delete-component',
	methods: {
		clicked,
	},
};
</script>


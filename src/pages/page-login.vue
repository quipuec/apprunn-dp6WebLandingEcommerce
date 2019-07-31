<template>
	<div></div>
</template>

<script>

function data() {
	return {
		companyLoginLogo: process.env.COMPANY_LOGIN_LOGO,
		user: '',
		password: '',
		isLoading: false,
	};
}

export default {
	name: 'page-login',
	data,
};
</script>

<style lang="scss" scoped>
</style>

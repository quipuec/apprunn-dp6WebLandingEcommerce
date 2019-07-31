<template>
	<div class="form-bulletin">
		<div>
			<p class="text-subscription">Suscríbete a Boletín</p>
			<input type="text" placeholder="Ingresa tu correo Electrónico" class="input-form">
			<button class="button-form">Suscríbete</button>
		</div>
		<div>
			<div class="content-date-company">
				<img src="/static/img/icons/telephone-1.svg" alt="">
				<p class="item-date-company">[511] 326-0933 
				[511] 326-8056</p>
			</div>
			<div class="content-date-company">
				<img src="/static/img/icons/mail.svg" alt="">
				<p class="item-date-direction">Av. Circunvalación #1857, 
				Urb. El Pino - San Luis</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'form-bulletin',
};
</script>

<style lang="scss">
.button-form {
	background-color: color(dark);
	border-bottom-right-radius: 6px;
	border-top-right-radius: 6px;
	color: color(white);
	font-size: 15px;
	min-height: 41px;
	min-width: 148px;
}

.text-subscription {
	color: color(dark);
	font-family: font(demi);
	font-size:  size(medium);
	margin-bottom: 45px;
}

.form-bulletin {
	align-items: center;
	background-color: color(background);
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.08);
	display: flex;
	justify-content: space-around;
	min-height: 209px;
	padding: 40px 0px;
	width: 100%;
}

.item-date-company {
	margin: 0 0 0 20px;
	max-width: 109px;
}

.content-date-company {
	align-items: center;
	display: flex;
	margin-top: 11px;
}

.item-date-direction {
	margin: 0 0 0 20px;
	max-width: 190px;
}

.input-form {
	border: 1px solid color(dark);
	border-radius: 6px;
	left: 8px;
	min-height: 41px;
	min-width: 301px;
	padding-left: 13px;
	position: relative;
}
</style>

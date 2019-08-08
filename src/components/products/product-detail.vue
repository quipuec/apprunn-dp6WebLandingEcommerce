<template>
	<div>
		<div>
			<heart-component v-model="data.favorite"/>
		</div>
		<div>
			<div>
				<p>{{data.name}}</p>
				<p>marca</p>
			</div>
			<div>
				<p>{{data.code}}</p>
				<div>
					<v-rating
						small
						class="product-rating"
						background-color="#ffcc03"
						color="#ffcc03"
						v-model="data.rating">
					</v-rating>
				</div>
			</div>
		</div>
		<div>
			<p>S/ {{data.code}}</p>
		</div>
	</div>
</template>
<script>
const heartComponent = () => import('@/components/shared/icons/heart-component');

export default {
	name: 'product-detail',
	components: {
		heartComponent,
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>


const route = {
	path: ':subsidiaryId/:subsidiaryName/accounting-periods/:periodId/records',
	name: 'records',
	meta: {
		title: 'REGISTROS',
	},
	component: () => import('@/pages/records/page-record'),
	props: true,
};

export default route;

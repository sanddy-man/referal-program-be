module.exports = {
	'GET /users': 'UsersController.getAll',
	'GET /invites': 'InviteController.getAll',
	'GET /credits': 'CreditController.getAll',

	'POST /invites/create': 'InviteController.createInvite',
};

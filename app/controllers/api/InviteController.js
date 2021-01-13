const Invite = require('#models/Invite');
const User = require('#models/User');

const processError = (err, req, res) => {
	return res.status(500).json({ msg: 'Internal server error' });
};

const InviteController = () => {
	const createInvite = async (req, res) => {
		try{
			const { body } = req;
			const userQuery = {
				where: {
					email: body.email
				}
			};
			const user = await User.findOne(userQuery);
			if (user){
				return res.status(400).json({ msg: 'Bad Request: User already exists' });
			}

			const inviteQuery = {
				where: {
					userId: body.userId + '',
					email: body.email
				}
			}
			let invite = await Invite.findOne(inviteQuery);
			if (invite) {
				return res.status(400).json({ msg: 'Bad Request: You already invited that user' });
			}

			const data = {
				email: body.email,
                userId: body.userId,
                registered: false,
			};
			invite = await Invite.create(data);
			return res.status(200).json({ invite });
		}
		catch(error){
			console.error("InviteController.createInvite error: ", error.original);
			return processError(error, req, res);
		}
	};

	const getAll = async (req, res) => {
		try{
			const { query } = req;
			const { userId } = query;
			let invites = [];
			if (userId) {
				const inviteQuery = {
					where: { userId }
				}
				invites = await Invite.findAll(inviteQuery);
			} else {
				invites = await Invite.findAll();
			}
			return res.status(200).json({ invites });
		}
		catch(error){
			console.error("InviteController.getAll error: ", { error });
			return processError(error, req, res);
		}
	};


	return {
		createInvite,
		getAll
	};
};

module.exports = InviteController;
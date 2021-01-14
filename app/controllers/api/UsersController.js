const User = require('#models/User');
const Credit = require('#models/Credit');
const Invite = require('#models/Invite');
const authService = require('#services/auth.service');
const bcryptService = require('#services/bcrypt.service');

const processError = (err, req, res) => {
	if (err.original.code === '23505') {
		const { body } = req;
		return res.status(500).json({ msg: `User with email: ${body.email} already exists.` });
	}
	return res.status(500).json({ msg: 'Internal server error' });
};

const UsersController = () => {
	const register = async (req, res) => {
		try{
			const { body } = req;
			const data = {
				email: body.email,
				password: body.password,
			};
			const user = await User.create(data);
			const token = authService.issue({ id: user.id });

			const { referalCode } = body;
			if (referalCode) {
				// user signed-up by referal link
				// add 50 credits
				const inviteQuery = {
					where: {
						referalCode
					}
				}
				let invite = await Invite.findOne(inviteQuery);
				if (invite && !invite.registered) {
					await Credit.create({
						userId: user.id,
						value: 50,
					});
					await invite.update({
						registered: true
					})
					// add some more
				} else {
					// already used referal link
					await Credit.create({
						userId: user.id,
						value: 0,
					});
				}
			} else {
				// user doesn't sign-up by referal link
				// 0 credit
				await Credit.create({
					userId: user.id,
					value: 0,
				});
			}
			return res.status(200).json({
				token,
				user
			});
		}
		catch(error){
			console.error("UsersController.register error: ", error.original);
			return processError(error, req, res);
		}
	};

	const login = async (req, res) => {
		try{
			const { email, password } = req.body;
			if (!email || email === undefined || !password || password === undefined) {
				const error = new Error("Invalid email OR password input");
				throw error;
			}

			const query = {
				where: {
					email
				}
			};
			const user = await User.findOne(query);
			if (!user){
				return res.status(400).json({ msg: 'Bad Request: User not found' });
			}

			if (bcryptService.comparePasswords(password, user.password)) {
				const token = authService.issue({ id: user.id });

				return res.status(200).json({
					token,
					user
				});
			}

			return res.status(401).json({ msg: 'Unauthorized' });
		}
		catch(error){
			console.error("UsersController.login error: ", { error });
			return processError(error, req, res);
		}
	};

	const validate = async (req, res) => {
		try{
			const { token } = req.body;

			// Compare token with local seed
			await authService.verify(token);

			// Everything's fine, send response
			return res.status(200).json({ isValid: true, msg: "Valid Token" });
		}
		catch(error){
			// In any error case, we send token not valid
			return res.status(401).json({ isValid: false, err: 'Invalid Token!' });
		}
	};

	const getAll = async (req, res) => {
		try{
			const users = await User.findAll();
			return res.status(200).json({ users });
		}
		catch(error){
			console.error("UsersController.getAll error: ", { error });
			return processError(error, req, res);
		}
	};


	return {
		register,
		login,
		validate,
		getAll
	};
};

module.exports = UsersController;
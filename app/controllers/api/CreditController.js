const Credit = require('#models/Credit');

const processError = (err, req, res) => {
	return res.status(500).json({ msg: 'Internal server error' });
};

const CreditController = () => {
	const getAll = async (req, res) => {
		try{
			const { query } = req;
			const { userId } = query;
			let credits = [];
			if (userId) {
				const creditQuery = {
					where: { userId }
				}
				credits = await Credit.findAll(creditQuery);
			} else {
				credits = await Credit.findAll();
			}
			return res.status(200).json({ credits });
		}
		catch(error){
			console.error("CreditController.getAll error: ", { error });
			return processError(error, req, res);
		}
	};


	return {
		getAll
	};
};

module.exports = CreditController;
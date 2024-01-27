const mongoose = require("mongoose");
// turning string into object_id
module.exports = (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).send({ message: "Invalid ID." });

	next();
};
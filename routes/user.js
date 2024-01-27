const router = require("express").Router();
const { User, validate } = require('../models/users.js');
const bcrypt = require("bcrypt");
 const admin = require('../middlewares/admin.js')
 const auth = require('../middlewares/authentication.js')
 const validateObjectId = require("../middlewares/validation.js");
 

// creating the user
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	// if user email id already exist send error
	if (user)
		return res.status(403).send({ message: "User with given email already Exist!" });
	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	// salting the given password
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	let newUser = await new User({
		...req.body,
		password: hashPassword,
	}).save(); // hashed password saved

	newUser.password = undefined;
	newUser.__v = undefined;
	res.status(200).send({ data: newUser, message: "Account created successfully" });// everything working fine
});

// getting all users
// user details will be olny fetched when token access is there and isAdmin is true
router.get("/",admin, async (req, res) => {
	const users = await User.find().select("-password -__v");
	res.status(200).send({ data: users });
});

// getting user by id
//access token is must
router.get("/:id" ,[validateObjectId, auth], async (req, res) => {
	const user = await User.findById(req.params.id).select("-password -__v");
	res.status(200).send({ data: user });
});

// update user by id
// you need access token and user_id
router.put("/:id" ,[validateObjectId, auth], async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	).select("-password -__v");
	res.status(200).send({ data: user, message: "Profile updated successfully" });
});

// delete user by id
router.delete("/:id" ,[validateObjectId, auth], async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Successfully deleted user." });
});

module.exports = router;
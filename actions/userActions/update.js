const model = require("../../models");

module.exports.UpdateUser = async (req, res) => {
    let name = req.body.name;
    let id = req.params.userId;

    let user = await model.users.findOne({
        where: {
            id: id
        }
    })
    if (!user) {
        res.send("user doesn't exist");
    }
    user.name = name;
    await user.save();
    res.json({
        user: {
            name: user.name,
            email: user.email
        }
    })
}

const asyncHandler = require("express-async-handler");


exports.login= asyncHandler(async (req, res, next) => {

res.send("login attmpet")
})


module.exports.devMongoURL = `mongodb://localhost/userDB`;
module.exports.prodMongoURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@users.s9tkz.mongodb.net/UserDB?retryWrites=true&w=majority`;
module.exports.callbackURL = "/auth/redirect";
module.exports.clientPort = 3000;

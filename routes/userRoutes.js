const jsonfile = require("jsonfile");
const file = './DB/users.json';

module.exports = app => {
    app.get("/users", (req, res) => {
        console.log("fetching all users");

        // jsonfile reading
        jsonfile.readFile(file, function(err, content) {
            // send file contents back to sender
            res.send(content);
        });
    });

    app.post("/users/new", (req, res) => {
        let { email, username } = req.body;
      
        jsonfile.readFile(file, function(err, content) {
            content.push({ email, username });
            console.log("added " + email + "to DB");
            jsonfile.writeFile(file, content, function(err) {
                console.log(err);
            });
      
            res.sendStatus(200);
        });
    });

    app.delete("/users/destroy", (req, res) => {
        let email = req.body.email;

        jsonfile.readFile(file, function(err, content) {
            for (let i = content.length - 1; i >=0; i--) {
                if (content[i].email === email) {
                    console.log("removing " + content[i].email + "from DB");
                    content.pop(i);
                }
            }

            jsonfile.writeFile(file, content, function(err) {
                console.log(err);
            });

            res.sendStatus(200);
        });
    });

    app.put("/user", (req, res) => {
        let user;
        let { username, email } = req.body;

        jsonfile.readFile(file, function(err, content) {
            for (let i = content.length - 1; i >=0; i--) {
                if (content[i].email === req.query.email) {
                    console.log("updated user " + req.query.email + " has now username : " + username);

                    user = content[i];
                    user.username = username;
                }
            }

            jsonfile.writeFile(file, content, function(err) {
                console.log(err);
            });
        });
        res.send(user);
    });

    app.get("/user", (req, res) => {
        let user;
        let email = req.query.email;

        jsonfile.readFile(file, function(err, content) {
            for (let i = content.length - 1; i>= 0; i--) {
                if (content[i].email === email) {
                    console.log("found user" + content[i]);
                    console.log(content[i]);
                    user = content[i];
                }
            }
            res.send(user);
        });
    });

}
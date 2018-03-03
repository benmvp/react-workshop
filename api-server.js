var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),

    assign = require('lodash/assign'),
    find = require('lodash/find'),
    findIndex = require('lodash/findIndex'),

    app = express(),
    router = express.Router(),

    // Using a JSON file as our "database"
    EMAILS_FILE = path.join(__dirname, 'data/emails.json'),

    port = process.env.PORT || 9090;

function getEmails(callback) {
    fs.readFile(EMAILS_FILE, function(err, fileContents) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        callback(JSON.parse(fileContents));
    });
}

function saveEmails(emails, callback) {
    fs.writeFile(EMAILS_FILE, JSON.stringify(emails, null, 4), function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        callback();
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// allow for cross-origin API requests
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

// routes that end in /emails
router.route('/emails')

    // create an email (accessed via POST to http://localhost:9090/emails)
    .post(function(req, res) {
        getEmails(function(emails) {
            var newEmail = assign({
                    id: Date.now(),
                    date: new Date() + '',
                    read: true
                }, req.body),
                newEmails = emails.concat(newEmail);

            // write out file back to disk
            saveEmails(newEmails, function() {
                res.json({success: true});
            });
        });
    })

    // get all the emails (access via GET from http://localhost:9090/emails)
    .get(function(req, res) {
        getEmails(function(emails) {
            // Return back the full list of emails
            res.setHeader('Cache-Control', 'no-cache');
            res.json(
                emails
                    .filter(function(email) { return !email.deleted; })
                    .sort(function(emailA, emailB) { return new Date(emailB.date) - new Date(emailA.date); })
            );
        });
    });

// routes that end in emails/:emailId
router.route('/emails/:emailId')

    // get the email with this id (accessed via GET from http://localhost:9090/emails/:emailId)
    .get(function(req, res) {
        getEmails(function(emails) {
            var emailIdToGet = +req.params.emailId,
                emailToGet = find(emails, function(email) {
                    return email.id === emailIdToGet;
                });

            res.json(emailToGet);
        });
    })

    // update the email this id (accessed via PUT on http://localhost:9090/emails/:emailId)
    .put(function(req, res) {
        getEmails(function(emails) {
            var emailIdToUpdate = +req.params.emailId,

                // make a new copy of the emails list, updating the appropriate email
                updatedEmails = emails.map(function(email) {
                    if (email.id === emailIdToUpdate) {
                        // make a copy of the email to update before updating
                        return assign({}, email, {
                            read: !!req.body.read
                        });
                    }

                    return email;
                });

            saveEmails(updatedEmails, function() {
                res.json({success: true});
            });
        });
    })

    // delete the email this id (accessed via PUT on http://localhost:9090/emails/:emailId)
    .delete(function(req, res) {
        getEmails(function(emails) {
            var emailIdToDelete = +req.params.emailId,

                // make a new copy of the emails list, marking the appropriate email as deleted
                updatedEmails = emails.map(function(email) {
                    if (email.id === emailIdToDelete) {
                        // make a copy of the email to update before updating
                        return assign({}, email, {
                            deleted: true
                        });
                    }

                    return email;
                });

            saveEmails(updatedEmails, function() {
                res.json({success: true});
            });
        });
    });

// Register the routes
app.use('/', router);

app.get('/ping', function(req, res) {
    res.json({success: true});
});

app.listen(port, function() {
  console.log('Server started: http://localhost:' + port + '/');
});

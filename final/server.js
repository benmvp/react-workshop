var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),

    assign = require('lodash/assign'),
    find = require('lodash/find'),
    findIndex = require('lodash/findIndex'),
    filter = require('lodash/filter'),

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

// pass through all non-API request to files in the public folder
app.use('/', express.static(path.join(__dirname, 'src')));

// routes that end in /api/emails
router.route('/emails')

    // create an email (accessed via POST to http://localhost:8080/api/emails)
    .post(function(req, res) {
        getEmails(function(emails) {
            var newEmails = emails.concat(),
                newEmail = assign({
                    id: Date.now(),
                    date: new Date() + '',
                    unread: true
                }, req.body);

            // add newly created email
            newEmails.push(newEmail);

            // write out file back to disk
            saveEmails(newEmails, function() {
                res.json({success: true});
            });
        });
    })

    // get all the emails (access via GET from http://localhost:8080/api/emails)
    .get(function(req, res) {
        getEmails(function(emails) {
            // Return back the full list of emails
            res.setHeader('Cache-Control', 'no-cache');
            res.json(emails);
        });
    });

// routes that end in api/emails/:emailId
router.route('/emails/:emailId')

    // get the email with this id (accessed via GET from http://localhost:8080/api/emails/:emailId)
    .get(function(req, res) {
        getEmails(function(emails) {
            var emailIdToGet = req.params.emailId,
                emailToGet = find(emails, function(email) {
                    return email.id == emailIdToGet;
                });

            res.json(emailToGet);
        });
    })

    // update the email this id (accessed via PUT on http://localhost:8080/api/emails/:emailId)
    .put(function(req, res) {
        getEmails(function(emails) {
            var emailIdToUpdate = req.params.emailId,
                emailIndexToUpdate = findIndex(emails, function(email) {
                    return email.id == emailIdToUpdate
                }),

                // make a new copy of the emails list, updated the appropriate email
                updatedEmails = emails.slice(0, emailIndexToUpdate)
                    .concat([
                        // make a cpy of the email to update before updating
                        assign({}, emails[emailIndexToUpdate], {
                            unread: !!req.body.unread
                        })
                    ])
                    .concat(emails.slice(emailIndexToUpdate + 1));

            saveEmails(updatedEmails, function() {
                res.json({success: true});
            });
        });
    })

    // delete the email this id (accessed via PUT on http://localhost:8080/api/emails/:emailId)
    .delete(function(req, res) {
        getEmails(function(emails) {
            var emailIdToDelete = req.params.emailId,

                filteredEmails = filter(emails, function(email) {
                    return email.id != emailIdToDelete
                });

            saveEmails(filteredEmails, function() {
                res.json({success: true});
            });
        });
    });

// Register the routes
// All routes are prefixed with /api
app.use('/api', router);

app.listen(port, function() {
  console.log('Server started: http://localhost:' + port + '/');
});

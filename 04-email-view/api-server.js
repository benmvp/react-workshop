const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const assign = require('lodash/assign');

const app = express();
const router = express.Router();

// Using a JSON file as our "database"
const EMAILS_FILE = path.join(__dirname, 'data/emails.json');

const {PORT: port = 9090} = process.env;

const getEmails = callback => {
  fs.readFile(EMAILS_FILE, (err, fileContents) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    callback(JSON.parse(fileContents));
  });
};

const saveEmails = (emails, callback) => {
  fs.writeFile(EMAILS_FILE, JSON.stringify(emails, null, 4), err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    callback();
  });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// allow for cross-origin API requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  );
  next();
});

// routes that end in /emails
router
  .route('/emails')
  // create an email (accessed via POST to http://localhost:9090/emails)
  .post((req, res) => {
    getEmails(emails => {
      let newEmail = assign(
        {
          id: Date.now(),
          date: new Date() + '',
          unread: true
        },
        req.body
      );
      let newEmails = [...emails, newEmail];

      // write out file back to disk
      saveEmails(newEmails, () => {
        res.json({success: true});
      });
    });
  })
  // get all the emails (access via GET from http://localhost:9090/emails)
  .get((req, res) => {
    getEmails(emails => {
      // Return back the full list of emails
      res.setHeader('Cache-Control', 'no-cache');
      res.json(
        emails
          .filter(email => !email.deleted)
          .sort(
            (emailA, emailB) => new Date(emailB.date) - new Date(emailA.date)
          )
      );
    });
  });

// routes that end in emails/:emailId
router
  .route('/emails/:emailId')
  // get the email with this id (accessed via GET from http://localhost:9090/emails/:emailId)
  .get((req, res) => {
    getEmails(emails => {
      let emailIdToGet = +req.params.emailId;
      let emailToGet = emails.find(email => email.id === emailIdToGet);

      res.json(emailToGet);
    });
  })
  // update the email this id (accessed via PUT on http://localhost:9090/emails/:emailId)
  .put((req, res) => {
    getEmails(emails => {
      let emailIdToUpdate = +req.params.emailId;

      // make a new copy of the emails list, updating the appropriate email
      let updatedEmails = emails.map(email => {
        if (email.id === emailIdToUpdate) {
          // make a copy of the email to update before updating
          return assign({}, email, {
            unread: !!req.body.unread
          });
        }

        return email;
      });

      saveEmails(updatedEmails, () => {
        res.json({success: true});
      });
    });
  })
  // delete the email this id (accessed via PUT on http://localhost:9090/emails/:emailId)
  .delete((req, res) => {
    getEmails(emails => {
      let emailIdToDelete = +req.params.emailId;

      // make a new copy of the emails list, marking the appropriate email as deleted
      let updatedEmails = emails.map(email => {
        if (email.id === emailIdToDelete) {
          // make a copy of the email to update before updating
          return assign({}, email, {
            deleted: true
          });
        }

        return email;
      });

      saveEmails(updatedEmails, () => {
        res.json({success: true});
      });
    });
  });

// Register the routes
app.use('/', router);

app.get('/ping', (req, res) => {
  res.json({success: true});
});

app.listen(port, () => {
  console.log(`Server started: http://localhost:${port}/`);
});

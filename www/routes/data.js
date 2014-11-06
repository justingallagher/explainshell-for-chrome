var express = require('express');
var router = express.Router();

// ----- Helper function (http://jsperf.com/hostname-from-url) ----------------
//
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

// TODO pull this into its own file
function parseUri (str) {
  var     o   = parseUri.options,
  m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
  uri = {},
    i   = 14;

  while (i--) uri[o.key[i]] = m[i] || "";

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
};

parseUri.options = {
  strictMode: false,
  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
  q:   {
    name:   "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

// ----- NOTE: has prefix of /api/ in app.js ------------------------------- //

// ----- POST /api/click/ : data endpoint for new click in the extension ------
router.post('/click/', function(req, res) {
  // Initialize database
  var clicks = req.db.get("usercollection");

  // Initialize click data from JSON POST body
  var click = {};
  click.url = req.body.url;
  click.title = req.body.title;
  click.domain = parseUri(click.url).host;
  click.timestamp = new Date();

  console.log(JSON.stringify(click, null, 2));

  // Insert into table
  clicks.insert(click, function(err, doc) {
    if (err) {
      res.status(500).end("Error inserting click into database.");
    }
    else {
      console.log("Successfully inserted into database.");
      res.end();
    }
  });
});

// ----- GET /api/top_sites/ : dump of top domains and counts -----------------
router.get('/top/:field/', function(req, res) {
  var clicks = req.db.get("usercollection");

  // Trim off the final 's'
  var field = req.param('field').slice(0, -1);
  console.log(field);

  if (['url', 'domain'].indexOf(field) < 0) {
    res.status(400).end("/top/:field/ -> field in ['urls', 'domains']");
  }

  var cursor = clicks.col.aggregate([
      {
        $group: {
          _id: "$" + field,
          count: { $sum: 1 }
        }
      }
  ], function(err, doc) {
    if (err) {
      res.status(500).end("Error querying database.");
    }
    else {
      doc.forEach(function(elem, idx, arr) {
        elem[field] = elem._id;
        delete elem._id;
      });
      res.json(doc);
    }
  });
});

// ----- GET /api/clicks/ : dump of all clicks --------------------------------
router.get('/clicks/', function(req, res) {
  var clicks = req.db.get("usercollection");

  var cursor = clicks.find({}, function(err, doc) {
    if (err) {
      res.status(500).end("Error querying database.");
    }
    else {
      doc.forEach(function(elem, idx, arr) {
        delete elem._id;
      });
      res.json(doc);
    }
  });
});



module.exports = router;

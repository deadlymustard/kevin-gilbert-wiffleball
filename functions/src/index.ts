import * as functions from 'firebase-functions';
import * as path from 'path';

// Increase readability in Cloud Logging
require("firebase-functions/lib/logger/compat");

const expressApp = require(path.resolve(__dirname, '../dist/kevin-gilbert-wiffleball/server/main')).app();

exports.ssr = functions
  .region('us-central1')
  .runWith({})
  .https
  .onRequest(expressApp);

exports.mailer = require('./mailer');

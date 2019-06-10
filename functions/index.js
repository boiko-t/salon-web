/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendFollowerNotification = functions.database.ref('/visits/{visitId}')
    .onCreate(async (change, context) => {
      const visitId = context.params.visitId;

      console.log('New visit created');

      const getDeviceTokensPromise = admin.database()
          .ref(`/notificationTokens`).once('value');

      const getCreatedVisitPromise = admin.database()
        .ref(`visits/${visitId}`).once('value');

      let tokensSnapshot;
      let tokens;

      const results = await Promise.all([getDeviceTokensPromise, getCreatedVisitPromise]);
      tokensSnapshot = results[0];
      const visit = results[1];

      if (!tokensSnapshot.hasChildren()) {
        return console.log('There are no notification tokens to send to.');
      }
      console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');

      const payload = {
        notification: {
          title: 'New visit added!',
          body:  `${visit.val().clientName} has completed their visit`,
        }
      };

      tokens = Object.keys(tokensSnapshot.val());
      const response = await admin.messaging().sendToDevice(tokens, payload);
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });

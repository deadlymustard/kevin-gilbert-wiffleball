import * as functions from 'firebase-functions';
import { messages } from "mailgun-js";
import { Member } from './member';
import { League, Team } from './team';

const apiKey =  functions.config().mailgun.api_key;
const domain = functions.config().mailgun.domain;
const mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});

exports.createTeam = functions.firestore
.document('teams/{teamId}')
.onCreate((snap, context) => {
  const newTeam: Team = snap.data() as Team;
  const newTeamId = snap.id;

  const teamCaptain: Member | undefined = newTeam.members.find(member => member.isCaptain === true);

  if (teamCaptain) {
    const captainEmail = teamCaptain.email;

    const data = {
      from: 'Kevin Gilbert Scholarship Fund <no-reply@ktgscholarshipfund.com>',
      to: [captainEmail],
      cc: ['ktgwiff@gmail.com'],
      subject: `Congrats ${newTeam.name}! You're registered!`,
      template: "team-registered",
      "h:X-Mailgun-Variables": JSON.stringify({
        "teamName": newTeam.name,
        "teamColor": newTeam.color,
        "teamId": newTeamId
      })
    };
    mailgun.messages().send(data, (error: any, body: messages.SendResponse) => {
      console.log(body);
      return;
    });
  }

});

exports.markTeamAsPaid = functions.firestore
.document('teams/{teamId}')
.onUpdate((change, context) => {
  if (change && change.after && change.after.data() && change.before && change.before.data()) {

    const updatedTeam: Team = change.after.data() as Team;
    const teamHasPaid = (!change.before.data().paid && change.after.data().paid);
    const teamCaptain: Member | undefined = updatedTeam.members.find(member => member.isCaptain === true);


    if (teamHasPaid && teamCaptain) {
      const captainEmail = teamCaptain.email;

      const basePrice = 125;
      const baseMembers = (updatedTeam.league === League.COMPETITIVE) ? 4 : 5;
      const baseFee = basePrice + ((updatedTeam.members.length % baseMembers) * 25);
      const transactionFee = ((baseFee) + baseFee * (.029) + .30)  * (.029) + .30;
      const totalPrice = (baseFee + transactionFee).toFixed(2);

      const dt = new Date();
      const todaysDate =  `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;

      const data = {
        from: 'Kevin Gilbert Scholarship Fund <no-reply@ktgscholarshipfund.com>',
        to: [captainEmail],
        cc: ['ktgwiff@gmail.com'],
        subject: `Thanks for paying! You're all set.`,
        template: "team-paid",
        "h:X-Mailgun-Variables": JSON.stringify({
          "teamCaptainName": teamCaptain.name,
          "todaysDate": todaysDate,
          "baseFee": baseFee,
          "transactionFee": transactionFee,
          "totalPrice": totalPrice
        })
      };
      mailgun.messages().send(data, (error: any, body: messages.SendResponse) => {
        console.log(body);
      });
    }
  }
});

const webpush = require('web-push');
const vapidKeys = {
  publicKey: 'BEWoJlH2cLYaSDjhK_rCHmfF-87fgEoV7xwPmcXruxn8DFbAQjnctEqGURnjM-sHj712ECsyemY7UPCJOFNRGE0',
  privateKey: 'frfAdq8VdtzfZBZEqjAIAn8buF_PNKwe6Bny_f1I_KQ'
};
const webPush = webpush;
webPush.setVapidDetails(
  'mailto:imbigking12@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const payload = '< Push Payload String >';
const options = {

  body: 'Angular 測試工作坊 9月23日(六)',
// tslint:disable-next-line: max-line-length
  image: 'https://scontent.ftpe7-1.fna.fbcdn.net/v/t31.0-8/21273134_10156585628499554_8520027102111869914_o.jpg?oh=9d7bcbc999c161f5ce778e361a4b9ea4&oe=5A47D9EE',
  data: {
    link: 'https://www.facebook.com/groups/augularjs.tw/',
// tslint:disable-next-line: max-line-length
    link_ok: 'https://www.facebook.com/events/188912961650574/?acontext=%7B%22ref%22%3A%224%22%2C%22feed_story_type%22%3A%22370%22%2C%22action_history%22%3A%22null%22%7D',
    link_ng: 'https://www.facebook.com/groups/angularstudygroup/'
  }
};
const subscription = {
  // tslint:disable-next-line:max-line-length
  endpoint: 'https://fcm.googleapis.com/fcm/send/fOimIzlt9OQ:APA91bF1N62dnMV75ig985mzgVf4kFFz_M5DecC7tZXFHnKfKGOYoIRTAMVQJiIrZDNdfcDF4caHLtjXsjTb26aS905i8MYMruej-IHWP7WmLkYGjnyXYgM__gIT_-g4NvYXKu2Xix5H',
  expirationTime: null,
  keys: {
    p256dh: 'BI03gPjar7JZSykM65p_Sc89kIh22R0_NGiXYgjwDVZT2wnzSJJVjPxlNaIoPKm7ETGvZY0CQFg_c2w2Ee3Zun4',
    auth: 'orz9CQR0e9NWFY-3oDcm0g'
  }};
webPush.sendNotification(subscription, payload, JSON.stringify(options));

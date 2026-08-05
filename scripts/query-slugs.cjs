const https = require('https');
const KEY = 'sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k';

const options = {
  hostname: 'qujcrmbzuzlgjrexbzga.supabase.co',
  path: '/rest/v1/blog_articles?select=slug,date&order=date.desc',
  headers: { apikey: KEY, Authorization: 'Bearer ' + KEY }
};

https.get(options, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const rows = JSON.parse(data);
      rows.forEach(r => console.log(r.slug + ' | ' + r.date));
      console.log('Total: ' + rows.length);
    } catch(e) {
      console.error('Parse error:', e.message);
      console.error('Raw:', data);
    }
  });
}).on('error', e => console.error('Request error:', e));

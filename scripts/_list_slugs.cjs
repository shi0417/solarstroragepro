const { runSql } = require('./_mgmt_query.cjs');
runSql('select slug, date from blog_articles order by date desc').then(rows => {
  console.log('TOTAL:', rows.length);
  rows.forEach(r => console.log(r.date, r.slug));
}).catch(e => { console.error('ERR:', e.message); process.exit(1); });

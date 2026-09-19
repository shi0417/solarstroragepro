const ANON = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k";
const H = { apikey: ANON, Authorization: "Bearer " + ANON };
const slug = "battery-storage-ul-9540-certification-guide";
Promise.all([
  fetch(`https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1/blog_articles?slug=eq.${slug}&select=id,slug,date,read_time,tags`, { headers: H }).then(r => r.json()),
  fetch(`https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1/blog_article_translations?article_id=eq.5d7248d9-5d7d-4947-83c6-0d915d69ba86&select=locale,title&title=neq.null`, { headers: H }).then(r => r.json()),
]).then(([a, t]) => { console.log("ARTICLE:", JSON.stringify(a, null, 2)); console.log("TRANSLATIONS:", JSON.stringify(t, null, 2)); });

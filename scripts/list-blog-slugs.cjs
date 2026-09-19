const ANON = "sb_publishable_bBrZR2df4POLnM4sWI96xQ_xPvlD06k";
fetch("https://qujcrmbzuzlgjrexbzga.supabase.co/rest/v1/blog_articles?select=slug,date&order=date.desc", {
  headers: { apikey: ANON, Authorization: "Bearer " + ANON },
})
  .then((r) => r.json())
  .then((d) => {
    console.log("TOTAL:", d.length);
    d.forEach((a) => console.log(a.date, a.slug));
  })
  .catch((e) => { console.error("ERR", e.message); process.exit(1); });

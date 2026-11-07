module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const q = req.query.q || "";
  const CLIENT_ID = "2ce095c5";
  const url = "https://api.jamendo.com/v3.0/tracks/?client_id=" + CLIENT_ID +
    "&format=json&limit=20&audioformat=mp31&order=popularity_total" +
    (q ? "&search=" + encodeURIComponent(q) : "");
  try {
    const r = await fetch(url);
    const data = await r.json();
    const hasil = (data.results || []).map(t => ({
      id: t.id,
      title: t.name,
      artist: t.artist_name,
      file: t.id + ".mp3",
      url: t.audio
    }));
    res.status(200).json(hasil);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};

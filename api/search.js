const songs = [
  { id: 1, title: "Lagu Satu", artist: "Aku", file: "lagu1.mp3" }
];

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const q = (req.query.q || "").toLowerCase();
  const base = "https://" + req.headers.host + "/songs/";
  const hasil = songs
    .filter(s => (s.title + " " + s.artist).toLowerCase().includes(q))
    .map(s => ({ ...s, url: base + s.file }));
  res.status(200).json(hasil);
};

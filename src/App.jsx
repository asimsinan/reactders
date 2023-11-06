import "./App.css";
const yaziListesi = [
  {
    baslik: "React Öğreniyorum",
    url: "www.sdu.edu.tr",
    yazar: "Sinan Yüksel",
    yorum_sayisi: 3,
    puan: 4,
    id: 0,
  },
  {
    baslik: "Web Teknolojileri ve Programlama",
    url: "wwww.google.com.tr",
    yazar: "Asım Yüksel",
    yorum_sayisi: 2,
    puan: 5,
    id: 1,
  },
];
function App() {
  return (
    <div>
      <h1>Yazılar</h1>
      <label htmlFor="arama">Ara: </label>
      <input id="arama" type="text" />
      <hr />
      <ul>
        {yaziListesi.map(function (yazi) {
          return (
            <li key={yazi.id}>
              <span>
                <a href={yazi.url}>{yazi.baslik}</a>, 
              </span>
              <span><b>Yazar:</b> {yazi.yazar}, </span>
              <span><b>Yorum Sayısı:</b> {yazi.yorum_sayisi}, </span>
              <span><b>Puan:</b> {yazi.puan}</span>
            </li>
          );
        })}{" "}
      </ul>
    </div>
  );
}
export default App;

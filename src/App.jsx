import "./App.css";
import React from "react";
function App() {
  const [aramaMetni, setAramaMetni] = React.useState(
    localStorage.getItem("aranan") || "React"
  );

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
  function getAsyncPosts() {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: { yazilar: yaziListesi } }), 2000)
    );
  }

  const yazilarReducer = (state, action) => {
    switch (action.type) {
      case "POSTS_FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "POSTS_FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case "POSTS_FETCH_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case "REMOVE_POST":
        return {
          ...state,
          data: state.data.filter((post) => action.payload !== post.id),
        };
      default:
        throw new Error();
    }
  };
  const [yazilar, dispatchYazilar] = React.useReducer(yazilarReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const arananYazilar = yazilar.data.filter(function (yazi) {
    return (
      yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      yazi.yazar.toLowerCase().includes(aramaMetni.toLowerCase())
    );
  });
  React.useEffect(() => {
    localStorage.setItem("aranan", aramaMetni);
  }, [aramaMetni]);

  React.useEffect(() => {
    handleFetchPosts();
  }, []);

  const handleFetchPosts = React.useCallback(() => {
    dispatchYazilar({ type: "POSTS_FETCH_INIT" });
    getAsyncPosts()
      .then((result) => {
        dispatchYazilar({
          type: "POSTS_FETCH_SUCCESS",
          payload: result.data.yazilar,
        });
      })
      .catch(() => dispatchYazilar({ type: "POSTS_FETCH_FAILURE" }));
  });
  function handleRemovePost(tiklananYaziId) {
    dispatchYazilar({
      type: "REMOVE_POST",
      payload: tiklananYaziId,
    });
  }
  function handleSearch(event) {
    setAramaMetni(event.target.value);
  }
  return (
    <div>
      <h1>Yazılar</h1>
      <InputWithLabel
        id="arama"
        value={aramaMetni}
        label="Ara"
        type="text"
        onInputChange={handleSearch}
      />
      {aramaMetni && (
        <p>
          <strong>{aramaMetni} aranıyor...</strong>.
        </p>
      )}
      <hr />
      {yazilar.isError ? (
        <p>Birşeyler ters gitti!</p>
      ) : yazilar.isLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <Liste yazilar={arananYazilar} onRemovePost={handleRemovePost} />
      )}
    </div>
  );
}
function InputWithLabel({ id, label, value, type, onInputChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}: </label>
      <input id={id} type={type} onChange={onInputChange} value={value} />
    </div>
  );
}
function Liste({ yazilar, onRemovePost }) {
  return (
    <div>
      <ul>
        {yazilar.map(function (yazi) {
          return <Yazi key={yazi.id} {...yazi} onRemovePost={onRemovePost} />;
        })}{" "}
      </ul>
    </div>
  );
}
function Yazi({ id, url, baslik, yazar, yorum_sayisi, puan, onRemovePost }) {
  return (
    <li key={id}>
      <span>
        <a href={url}>{baslik}</a>,
      </span>
      <span>
        <b>Yazar:</b> {yazar},{" "}
      </span>
      <span>
        <b>Yorum Sayısı:</b> {yorum_sayisi},{" "}
      </span>
      <span>
        <b>Puan:</b> {puan}
      </span>
      <span>
        <button type="button" onClick={() => onRemovePost(id)}>
          Sil
        </button>
      </span>
    </li>
  );
}
export default App;

import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
  host: "http://127.0.0.1:7700",
  apiKey: "masterKey",
});

const pushDocs = async (index, documents) => {
  return await index.addDocuments(documents);
}

function App() {
  const index = client.index("movies");

  const documents = [
    { id: 1, title: "Carol", genres: ["Romance", "Drama"] },
    { id: 2, title: "Wonder Woman", genres: ["Action", "Adventure"] },
    { id: 3, title: "Life of Pi", genres: ["Adventure", "Drama"] },
    {
      id: 4,
      title: "Mad Max: Fury Road",
      genres: ["Adventure", "Science Fiction"],
    },
    { id: 5, title: "Moana", genres: ["Fantasy", "Action"] },
    { id: 6, title: "Philadelphia", genres: ["Drama"] },
  ];

  // If the index 'movies' does not exist, Meilisearch creates it when you first add the documents.
  pushDocs(index, documents).then((success) => {
    console.log(success);
  });

  const [searchText, setSearchText] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    index.search(searchText).then((success)=>{
      setResults(success.hits)
    })
  }, [searchText])

  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Meilie search test</h1>
      <input type='text' id="search" onChange={(e) => setSearchText(e.target.value)}/>
      <div>
        <h3>Results for {searchText}</h3>
        {/* <div>{JSON.stringify(results)}</div> */}
        <div>{results.map((hit)=>{
          return <li>{hit.id} {hit.title}</li>
        })}</div>
      </div>
      
    
    </div>
  );
}

export default App;

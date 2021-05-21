import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgress } from '@material-ui/core';
import Home from './Components/Home/Home';
function App() {
  const [url, setUrl] = useState("https://www.w3schools.com/");

  const [links, setLinks] = useState([]);
  useEffect(()=>{
    fetch(`https://robot-crawling-server.herokuapp.com/all-links?url=${url}`)
    .then( res => res.json())
    .then( data => {
      // console.log(data);
      fetch('https://robot-crawling-server.herokuapp.com/',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json'}
      })
      .then( res => res.json())
      .then( allLinks => {
        console.log(allLinks);
        let mainRout = allLinks[0].href;
        // console.log(mainRout);
        allLinks.map(link => {
          // console.log(link)
          if(link.href.includes("http")){
            // console.log(link)
            link["text"] = "Special " + link.text;
          }
          else{
            // console.log(link.href)
            if(!link.href.includes("/")){
              link["href"] = "/"+link.href;
            }
            link["href"] = mainRout+link.href;
            link["href"] = link["href"].replace(" ", "");
          }
        })
        // console.log(allLinks);
        setLinks(allLinks);
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  },[url])

  const handleSubmit = (evt)=>{
    evt.preventDefault();
    const formUrl = evt.target.search.value;
    console.log(formUrl);
    setUrl(formUrl);
  }
  return (
    <div className="container-fluid bg-light p-4">
      <h1 className="text-center">Crawling Robot</h1>
      <form onSubmit={handleSubmit}  className="mx-auto p-3 d-flex">
        <input type="search" className="form-control" name="search"/>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
      <Home links={links} />
      {
        links.length === 0 && <div className="d-flex justify-content-center">
          <CircularProgress color="secondary" />
        </div>
      }
    </div>
  );
}

export default App;

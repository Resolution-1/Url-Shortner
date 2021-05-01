import React, { useState, useEffect } from 'react';
import './Home.scss';
import axios from 'axios';
import UrlCard from '../components/UrlCard';

export default function Home() {
  // const longUrlRef = useRef();

  const [longUrl, setlongUrl] = useState('');
  const [urlData, setUrlData] = useState({});
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);

  const postRequest = async () => {
    try {
      console.log('hello');
      const response = await axios.post('https://ak-surl.herokuapp.com/url', {
        longUrl,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    return postRequest;
  };

  useEffect(() => {
    async function fetchData() {
      console.log('hello');
      axios.get('https://ak-surl.herokuapp.com/url').then((response) => {
        // console.log(response.data);
        setUrlData(() => response.data);
      });
    }
    fetchData();
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  }, [change]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(longUrl);
    postRequest();
    setlongUrl('');
    setChange(true);
  }

  function redirect(url) {
    console.log(url);
    // window.location.replace(url)
    window.location.href = url;
  }
  return (
    <div className="container">
      <h1 className="title">Url Shortner</h1>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          className="input"
          value={longUrl}
          onChange={(e) => setlongUrl(e.target.value)}
          type="url"
          placeholder="Enter Long Url"
        />
      </form>
      <div className="url-list">
        {loading &&
          urlData.map((urldata, index) => (
            <UrlCard
              handleClick={() => redirect(urldata.longUrl)}
              data={urldata}
              key={index}
            />
          ))}
      </div>
      {/* <UrlCard handleClick={tryClick} /> */}
    </div>
  );
}

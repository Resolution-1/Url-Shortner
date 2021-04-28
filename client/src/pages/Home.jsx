import React, { useState, useEffect } from 'react';
import './Home.scss';
import axios from 'axios';
import UrlCard from '../components/UrlCard';

export default function Home() {
  // const longUrlRef = useRef();

  const [longUrl, setlongUrl] = useState('');
  const [urlData, setUrlData] = useState([]);

  const postRequest = async () => {
    try {
      console.log('hello');
      const response = await axios.post('http://localhost:5000/url', {
        longUrl,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    return postRequest;
  };
  // return postRequest;

  useEffect(() => {
    const call = async () => {
      try {
        const data = axios.get('http://localhost:5000/url');
        setUrlData(data);
        console.log(urlData);
      } catch (error) {
        console.log(error);
      }
    };
    return call();
  }, [longUrl]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(longUrl);
    postRequest();
    setlongUrl('');
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
      <UrlCard />
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import './Home.scss';
import axios from 'axios';
import UrlCard from '../components/UrlCard';

export default function Home() {
  // const longUrlRef = useRef();
  const [longUrl, setlongUrl] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    console.log(longUrl);
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

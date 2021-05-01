import React from 'react';
import './UrlCard.scss';

const UrlCard = ({ data, handleClick }) => {
  return (
    <div className="urlcard">
      <p className="long-url">{data.longUrl}</p>
      <p className="short-url" onClick={handleClick}>
        {data.shortUrl}
      </p>
    </div>
  );
};

export default UrlCard;

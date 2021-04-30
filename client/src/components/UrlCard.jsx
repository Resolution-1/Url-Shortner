import React from 'react';
import './UrlCard.scss';

// export default function UrlCard({ tryClick }) {
//   return (
//     <div className="urlcard" onClick={tryClick}>
//       <p>http://localhost:3000</p>
//       <p>Short Url</p>
//     </div>
//   );
// }

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

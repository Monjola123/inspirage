import React from 'react';
import './LikedQuotes.css';

const LikedQuotes = ({ likedQuotes, onRemoveQuote, onSpeakQuote, onCopyQuote, onShareQuote }) => {
  const handleRemoveQuote = (quote) => {
    onRemoveQuote(quote);
  };

  const handleSpeakQuote = (quote) => {
    onSpeakQuote(quote);
  };

  const handleCopyQuote = (quote) => {
    onCopyQuote(quote);
  };

  const handleShareQuote = (quote) => {
    onShareQuote(quote);
  };

  return (
    <div className="liked-quotes-container">
      <h2 className="liked-quotes-heading">Liked Quotes</h2>
      <ul className="liked-quotes-list">
        {likedQuotes.map((quote, index) => (
          <li key={index} className="liked-quote">
            <p className="liked-quote-content">"{quote.content}"</p>
            <p className="liked-quote-author">- {quote.author}</p>
            <div className="quote-buttons">
              <button className="quote-button" onClick={() => handleSpeakQuote(quote)}>
                <i className="fas fa-volume-up"></i> Speak
              </button>
              <button className="quote-button" onClick={() => handleCopyQuote(quote)}>
                <i className="fas fa-copy"></i> Copy
              </button>
              <button className="quote-button" onClick={() => handleShareQuote(quote)}>
                <i className="fab fa-twitter"></i> Share
              </button>
              <button className="quote-button" onClick={() => handleRemoveQuote(quote)}>
                <i className="fas fa-trash"></i> Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedQuotes;

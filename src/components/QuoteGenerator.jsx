import React, { useState, useEffect } from 'react';
import './QuoteGenerator.css';

const QuoteGenerator = ({ addLikedQuote, removeLikedQuote, likedQuotes, fetchRandomQuote }) => {
  const [quote, setQuote] = useState(null);
  const [backgroundColors, setBackgroundColors] = useState({
    main: '#25274D',
    text: '#2D2E5B'
  });
  const [showNotification, setShowNotification] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const changeBackgroundColors = () => {
    const mainColors = ['#25274D', '#1E206B', '#383A73'];
    const textColors = ['#2D2E5B', '#383A73', '#44467E'];

    const randomMainColor = mainColors[Math.floor(Math.random() * mainColors.length)];
    const randomTextColor = textColors[Math.floor(Math.random() * textColors.length)];

    setBackgroundColors({
      main: randomMainColor,
      text: randomTextColor
    });
  };

  const speakQuote = () => {
    if (quote) {
      const speech = new SpeechSynthesisUtterance(`${quote.content} by ${quote.author}`);
      speechSynthesis.speak(speech);
      setIsSpeaking(true);
      speech.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const copyToClipboard = () => {
    if (quote) {
      navigator.clipboard.writeText(`${quote.content} by ${quote.author}`);
    }
  };

  const tweetQuote = () => {
    if (quote) {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${quote.content} - ${quote.author}`
      )}`;
      window.open(tweetUrl, '_blank');
    }
  };

  const toggleLike = () => {
    if (quote && likedQuotes.some((likedQuote) => likedQuote.content === quote.content)) {
      removeLikedQuote(quote);
      setShowNotification(true);
    } else if (quote) {
      addLikedQuote(quote);
      setShowNotification(true);
    }
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    fetchRandomQuote().then((data) => {
      if (data) {
        setQuote(data);
      }
    });
    changeBackgroundColors();
  }, []);

  const renderQuote = () => {
    if (!quote) {
      return (
        <div className="loading-indicator animate__animated animate__zoomInRight infinite-animation">
          Loading...
        </div>
      );
    }

    return (
      <div className="quote">
        <p className="quote-text">{quote.content}</p>
        <p className="quote-author" style={{ fontFamily: 'viner hand itc', fontSize: '18px' }}>
          — {quote.author}
        </p>
      </div>
    );
  };

  const quoteContainerStyle = {
    backgroundColor: backgroundColors.text,
  };

  const quoteGeneratorStyle = {
    backgroundColor: backgroundColors.main,
  };

  return (
    <div className="quote-generator" style={quoteGeneratorStyle}>
      <div className="quote-container" style={quoteContainerStyle}>
        <div className={`notification ${showNotification ? 'show' : ''}`}>
          {quote && likedQuotes.some((likedQuote) => likedQuote.content === quote.content)
            ? 'Quote added to Liked!'
            : 'Quote removed from Liked!'}
        </div>
        <div className="glow-container"></div>
        {renderQuote()}
        <div className="buttons">
          <div className="features">
            <ul>
              <li className="speech" onClick={isSpeaking ? stopSpeech : speakQuote}>
                <i className={`fas fa-volume-${isSpeaking ? 'off' : 'up'}`}></i>
              </li>
              <li className="copy" onClick={copyToClipboard}>
                <i className="fas fa-copy"></i>
              </li>
              <li className="twitter" onClick={tweetQuote}>
                <i className="fab fa-twitter"></i>
              </li>
              <li className={`like ${quote && likedQuotes.some((likedQuote) => likedQuote.content === quote.content) ? 'liked' : ''}`} onClick={toggleLike}>
                <i className={`fas fa-heart`}></i>
              </li>
            </ul>
          </div>
          <button className="new-quote-button" onClick={() => fetchRandomQuote().then((data) => setQuote(data))}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;

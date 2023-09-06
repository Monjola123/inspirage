import React, { useState } from 'react';
import QuoteGenerator from './components/QuoteGenerator';
import LikedQuotes from './components/LikedQuotes';
import Navbar from './components/Navbar'; 
import './App.css';

function App() {
  const [selectedTab, setSelectedTab] = useState('quotes');
  const [likedQuotes, setLikedQuotes] = useState([]);

  const addLikedQuote = (quote) => {
    setLikedQuotes([...likedQuotes, quote]);
  };

  const removeLikedQuote = (quote) => {
    setLikedQuotes(likedQuotes.filter((likedQuote) => likedQuote.content !== quote.content));
  };

  const speakQuote = (quote) => {
    const speech = new SpeechSynthesisUtterance(`"${quote.content}" by ${quote.author}`);
    speechSynthesis.speak(speech);
  };

  const copyToClipboard = (quote) => {
    navigator.clipboard.writeText(`"${quote.content}" - ${quote.author}`);
  };

  const tweetQuote = (quote) => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote.content}" - ${quote.author}`
    )}`;
    window.open(tweetUrl, '_blank');
  };

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('http://api.quotable.io/random');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching random quote:', error);
      return null;
    }
  };

  return (
    <div className="App">
      <Navbar selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      {selectedTab === 'quotes' && (
        <QuoteGenerator
          addLikedQuote={addLikedQuote}
          removeLikedQuote={removeLikedQuote}
          likedQuotes={likedQuotes}
          fetchRandomQuote={fetchRandomQuote} 
        />
      )}
      {selectedTab === 'liked' && (
        <LikedQuotes
          likedQuotes={likedQuotes}
          onRemoveQuote={removeLikedQuote}
          onSpeakQuote={speakQuote}
          onCopyQuote={copyToClipboard}
          onShareQuote={tweetQuote}
        />
      )}
    </div>
  );
}

export default App;

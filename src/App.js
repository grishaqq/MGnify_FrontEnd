import { useState } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // e.target is our input field
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // so that the page wouldn't reload
    // Add search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="app-container">
      <div className="search-wrapper">
        <div className="ebi-header">
            European Bioinformatics Institute
        </div>
        <h1>Search our dataset - with plain English.</h1>
        <form onSubmit={handleSubmit}>
          <label>What are you searching for?</label>
          <input 
            type="text" 
            placeholder="I want data on..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Get Results</button>
        </form>
      </div>
    </div>
  );
}

export default App;

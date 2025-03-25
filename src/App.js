import { useState } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // Keep the input string as state
  const [returnVisible, setReturnVisible] = useState(false); // Hide the return elements until ready to serve to user
  const [queryClicked, setQueryClicked] = useState(false); // Hide or show the API call to users


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // e.target is our input field
    // We should also re-hide the hidden elements upon an input change:
    setReturnVisible(false);
    setQueryClicked(false);
  };


  // Once the form is submit, we need to pass the input back to the LLM,
  // and then we need to wait to hear back from this and the web server,
  // and serve the results to the user.
  const handleSubmit = (e) => {
    e.preventDefault(); // so that the page wouldn't reload
    // Add search logic here. Send Query off to the LLM.
    console.log('Searching for:', searchQuery);
    // NOTE: The following should only activate once we hear two responses:
    // First, we should hear back from our product's back-end, to be able to display what the code that made the call is.
    // Second, we should hear back from the web server, to be able to serve the results.
    setReturnVisible(true); 
  };


  // THIS IS CURRENTLY A DUMMY FUNCTION FOR DEVELOPMENT PURPOSES
  // Final version should download the result of the API call
  // Current version serves user a text file of the search they made
  function downloadSearchInfo() {
    // create file contents (DUMMY FUNCTIONALITY)
    const fileData = `You searched for ${searchQuery} in the MGNify database!`
    // create a blob with those contents (Useful functionality)
    const blob = new Blob([fileData], { type: "text/plain" });
    // create a link in the DOM from the blob (Useful functionality)
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${searchQuery}.txt`; // filetype may be specified by backend, clarify later.
    link.href = url;
    // click the link and download file. (Useful functionality)
    link.click();
  }

  // Components we only want you to see when we have the data back from the web server
  function ReturnComponents() {
    // the "WriteResponse" component is going to have all the download options.
    // the "WriteQuery" component is going to display the generated API query.
    // NOTE: I used a "form" here to keep the styling consistent with the input form.
    //       This is not actually a form, so it might be better to change this in future.
    return (
      <form>
        <WriteResponse />
        <div className="query-show">
          <p> Advanced: </p>
          <button id="apiBtn" onClick={handleQueryClick} type="button"> Click here to show/hide the query we generated</button>
          {queryClicked && <WriteQuery />}
        </div>
      </form>
    )
  }

  // Display the download options.
  // Currently serves a single downloadable text file indicating the query that was made.
  // NOTE: Mock-up had the download button being an icon-based button, not a text-based button.
  //       I could not figure this out, so made it a text button. This would be a nice change,
  //       but is non-essential so can be left as-is for the time being.
  function WriteResponse(){
    return(
      <div className="download-all-lines">
        <div className="download-line">
          <p>Click here to download the {searchQuery} data:</p>
          <button id="downloadBtn" onClick={downloadSearchInfo} type="button">Download</button> 
        </div>
      </div>
    )
  }

  // Display the generated query.
  // Currently displays a notice that says we do not have a query to return.
  function WriteQuery(){
    return( 
      <div className="queryReturn">
        <p> No query yet! sorry!</p>
        <p>It will be written here for users to read and check.</p>
      </div>
    )
  }

  // Change the state of "queryClicked" when the 'click here to...' button is pressed.
  function handleQueryClick(){
    setQueryClicked(!queryClicked)
  }

  // The main body of the app. Contains all the text labels, inputs, and buttons
  // Page structure should be clear from the code: some headers,
  // then an input form with a textbox and a submission button,
  // and then an element containing everything we return upon submission,
  // which is defined above.
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
          <button id="submitBtn" type="submit">Get Results</button>
        </form>
        {returnVisible && <ReturnComponents />}
      </div>
    </div>
  );
}

export default App;

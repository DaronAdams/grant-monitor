import { useEffect, useState } from 'react';
import axios from "axios";
import { grantListEndpoint } from '../constants/endpoints';

const Test = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
    // Make a GET request using the Axios instance
    axios
      .get(grantListEndpoint)
      .then((response) => {
        // Set the fetched data in the state
        setData(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  }, []); // The empty dependency array ensures the effect runs once on component mount

    
    return (
    <div>
      {data ? (
        <div>
          <h1>Fetched Data</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
 
export default Test;
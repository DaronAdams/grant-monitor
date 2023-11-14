/*
* Formats the error messages from the api and returns just the message field
* The response from the api is in the format: {"message":"Email is already registered"}
* @param error - The error object from the api
*/
export const parseErrorsJson = (error: any) => {
  try {
    const response = JSON.parse(error.request.response)
    return response.message;
  } catch (e) {
    console.log('Error parsing JSON')
  }
}

/*
  * Uses the helper function to parse the message into a user friendly format 
  */
export const handleErrors = (error: any) => {
  parseErrorsJson(error);
}
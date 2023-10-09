export const parseErrorsJson = (error: any) => {
    try {
        const response = JSON.parse(error.request.response)
        return response.message;
    } catch (e) {
        console.log('Error parsing JSON')
    }
}
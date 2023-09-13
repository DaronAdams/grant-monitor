
# Development Instructions

Basic structure of react project is as follows:

Index -> App -> Pages -> Components

Inside the index page we wrap the App component in a provider for our Material-UI theme. Inside the App we setup a router to take us to different pages. The pages will consist of the components we create.

For styling we are using material-tailwind components but each of those can be edited to fit our needs using tailwindcss classes. https://tailwindcss.com/docs/installation

I've set an example in the HomePage components but you change the styling to any html element by adding className="write the classes here".


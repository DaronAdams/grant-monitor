
# Development Instructions

Basic structure of react project is as follows:

Index -> App -> Pages -> Components

Inside the index page we wrap the App component in a provider for our Material-UI theme. Inside the App we setup a router to take us to different pages. The pages will consist of the components we create.

For styling we are using material-tailwind components but each of those can be edited to fit our needs using tailwindcss classes. https://tailwindcss.com/docs/installation

I've set an example in the HomePage components but you change the styling to any html element by adding className="write the classes here".

### ESLint
ESLint will make sure we all use the same format when developing. The main things you need to know when using it will be the following commands:
```
npx eslint src/
npx eslist --fix src/
```
The fix command will attempt to format the files for you.

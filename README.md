
# Grant Monitor

Grant Monitor System for COMP4882


## Installation (frontend)

To run the project follow these steps
- Clone the repo
- Install dependencies using npm
- To run the development server run npm start

```bash
  git clone "link from top right of repo here"
  cd frontend
  npm install
  npm start
```

## Installation (backend)
```bash
createdb grant_monitor
dotnet restore
dotnet ef database update
dotnet run
```
Go to http://localhost:5207/swagger to see the API schema.
    

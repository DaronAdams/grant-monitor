# Developer Instructions

### Startup
1. Make sure you have postgresql installed
2. Create database by running ```createdb sampledb```
3. Verify using ```psql -l``` and seeing the database you just made
4. Make sure you're in the GrantMonitor Folder
5. Update your database to the current version ```dotnet ef database update```
6. Run ```psql -d sampledb```
7. Verify you see the Grants table

### Other useful commands
- ```dotnet run``` runs the server
- ```dotnet build``` builds the project [useful for debugging]
- ```dotnet clean``` cleans the bin/out folder [will sometimes fix errors]
- ```dotnet ef migrations add [InsertMigrationName]``` creates a migration
- ```dotnet ef database update``` updates to the current version of the database

### Other Stuff
General backend instructions can be found in the team discord, I just made changes to the specific steps of ken's that needed changed due to this.
```http://localhost:5108/swagger/index.html``` You can use this to test the api
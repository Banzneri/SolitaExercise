# SolitaExercise
A fullstack implementation of Solita Dev Academy pre-assignment exercise  
https://github.com/solita/dev-academy-2022-exercise

## Requirements

- NodeJS
- PostgreSQL

## How to run

- Pull or download project from GitLab
- Create and save .env file in the /server folder with the following content.

    ```
    DB_DATABASE=farm_database
    DB_HOST=localhost
    DB_USER=postgres
    DB_PASSWORD=<your_password>
    DB_PORT=5432
    ```
- Make sure your postgresql service is running
- Navigate to /server folder and run `npm run createDb`. This creates the database and populates it with initial data
- In /server folder, run `npm run dev`
- In /client folder, run `npm start`
- The app should be running at http://localhost:3000


## Endpoints


### Data

| Resource | Endpoint                                                     | Method | Description                                     |
|----------|--------------------------------------------------------------|--------|-------------------------------------------------|
| Data     | /data/farm/{id}                                              | GET    | Get all data from a farm by id                  |
| Data     | /data/farm/{id}/sensor/{sensor}                              | GET    | Get all data from a farm by id and sensor type  |
| Data     | /data/farm/{id}/sensor/{sensor}/average                      | GET    | Get all time average by farm id and sensor type |
| Data     | /data/farm/{id}/sensor/{sensor}/min-max                      | GET    | Get all time min-max by farm id and sensor type |
| Data     | /data/farm/{id}/month/{year}&{month}/                        | GET    | Get all monthly data by farm id                 |
| Data     | /data/farm/{id}/month/{year}&{month}/sensor/{sensor}         | GET    | Get monthly data by farm id and sensor type     |
| Data     | /data/farm/{id}/month/{year}&{month}/sensor/{sensor}/average | GET    | Get monthly average by farm id and sensor type  |
| Data     | /data/farm/{id}/month/{year}&{month}/sensor/{sensor}/min-max | GET    | Get monthly min-max by farm id and sensor type  |

### Farms

| Resource | Endpoint           | Method | Description      |
|----------|--------------------|--------|------------------|
| Farm     | /farms             | GET    | Get all farms    |
| Farm     | /farms/id/{id}     | GET    | Get farm by id   |
| Farm     | /farms/name/{name} | GET    | Get farm by name |

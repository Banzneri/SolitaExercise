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
- In project root folder, run `npm install` to install all packages
- Navigate to /server folder and run `npm run createDb`. This creates the database and populates it with initial data
- In /server folder, run `npm run dev`
- In /client folder, run `npm start`
- The app should be running at http://localhost:3000


## Endpoints


### Data
All data endpoints have optional `page` and `sensor` query parameters. If sensor is omitted, data from all sensors is returned.
If page is omitted, page defaults to 1.

| Resource | Endpoint                             | Method | Description                 |
|----------|--------------------------------------|--------|-----------------------------|
| Data     | /data/farm/{id}                      | GET    | Get data by farm id         |
| Data     | /data/farm/{id}/month/{year}&{month} | GET    | Get monthly data by farm id |

### Aggregate data
All aggregate data endpoints must have a sensor type as a query parameter, e.g. /average?sensor=ph

| Resource       | Endpoint                                     | Method | Description                     |
|----------------|----------------------------------------------|--------|---------------------------------|
| Aggregate data | /data/farm/{id}/average                      | GET    | Get all time average by farm id |
| Aggregate data | /data/farm/{id}/min-max                      | GET    | Get all time min-max by farm id |
| Aggregate data | /data/farm/{id}/month/{year}&{month}/average | GET    | Get monthly average by farm id  |
| Aggregate data | /data/farm/{id}/month/{year}&{month}/min-max | GET    | Get monthly min-max by farm id  |

### Farms

| Resource | Endpoint           | Method | Description      |
|----------|--------------------|--------|------------------|
| Farm     | /farms             | GET    | Get all farms    |
| Farm     | /farms/id/{id}     | GET    | Get farm by id   |
| Farm     | /farms/name/{name} | GET    | Get farm by name |

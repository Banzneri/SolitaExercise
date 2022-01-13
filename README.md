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
- in /client folder, run `npm start`

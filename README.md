# Planned Interview Test

For this test, you will need to retrieve users from 3 different api endpoints. You will then need to order those users by name (firstName + lastName) ascending and if multiple people have the same name, order them by age descending.

So you would have a list like this one

```
Alex B - 32
Marc C - 55
Marc C - 12
Tony Z - 21
```

## Run the project

Make sure you have node 12+ installed

`npm i && npm start`

## Endpoints

- http://localhost/users/kids
- http://localhost/users/adults
- http://localhost/users/seniors

## Tasks

- Retrieve users from the 3 endpoints when clicking the "Retrieve Users" button
- Order the users from the 3 collections by name ascending followed by the age descending
- Implement a filter for the age based on the min and max values of the inputs
- We recommend using the `styled-components` library to style your components

# User contacts list

A Node.js User contacts list Rest API

## Dependencies
* Node 6
* MongoDB

## Running
* Clone this project
* npm install
* Put your mongodb url at src/config/index.json
* npm start

## Using

### Create a new contact
* METHOD: POST
* URL: /users
* Body params: name (string), birthDay (string mm/dd/yyyy)

### Get contact
* METHOD: GET
* URL /users/:userId

### Update user
* METHOD: PUT
* URL /users/:userId
* Body params: name (string), birthDay (string mm/dd/yyyy)

### Delete user
* METHOD: DELETE
* URL /users/:userId

### Add a contact
* METHOD: POST
* URL: /users/:userId/contacts
* Body params: type (string), value (string)

### Update contact
* METHOD: PUT
* URL: /users/:userId/contacts
* Query String: type (type=celular)
* Body params: value (string)

### Delete Contact
* METHOD: DELETE
* Query String: type (type=celular)
* URL: /users/:userId/contacts


## Docker
If you are using docker and have docker-compose installed you can run this project easily.

Try:
* docker-compose build
* docker-compose up


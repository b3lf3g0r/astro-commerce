# Customer Authntication Service

    []: # Path: docs/01_CUSTOMER_AUTH.md

> This API is used to authenticate a customer and get a token to access the other APIs.

## API URL

| METHOD | URL                 | MIDDLEWARE |
| ------ | ------------------- | ---------- |
| POST   | /v1/sign-in         | :question: |
| GET    | /v1/sign-up         | :question: |
| POST   | /v1/forgot-password | :question: |

### _SIGN IN_

> This endpoint signs in an existing user and return an authorization token

```sh
curl -X POST \
  'http://127.0.0.1:5500/v1/sign-in' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "username": "john.doe@gmail.com",
  "password": "Mk327452_"
}'
```

### _SIGN UP_

> This endpoint saves new customer to database and returns an authorization token

```sh
curl -X POST \
  'http://127.0.0.1:5500/v1/sign-up' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "full_names": "John Doe",
  "username": "john.doe@gmail.com",
  "password": "Mk327452_",
  "confirm_password": "Mk327452_"
}'
```

### _FORGOT PASSWORD_

> This endpoint sends an email with instructions to reset password

```sh
curl -X POST \
  'http://127.0.0.1:5500/v1/forgot-password?username=john.doe@gmail.com' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)'
```

# Customer Profile Service

     []: # Path: docs/01_CUSTOMER_PROFILE.md

> This API is used to fetch and update customer information.

## API URL

| METHOD :newspaper: | URL :link:                 | MIDDLEWARE :lock: |
| ------------------ | -------------------------- | ----------------- |
| GET                | /v1/customers              | IsCustomer        |
| PUT                | /v1/customers/:id          | IsCustomer        |
| PUT                | /v1/customers/:id/contact  | IsCustomer        |
| PUT                | /v1/customers/:id/password | IsCustomer        |

## _GET PROFILE_

> This endpoint fetches customer details

```sh
curl -X GET \
  'http://127.0.0.1:5500/v1/customers/640e3bbd95a37e8ddf807298' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'X-Authorization: Access-Token'
```

## _UPDATE FULLNAMES_

> This endpoint updates customer fullnames

```sh
curl -X PUT \
  'http://127.0.0.1:5500/v1/customers/640e3bbd95a37e8ddf807298' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'X-Authorization: Access-Token' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "full_names": "John Doe"
}'
```

## _UPDATE CONTACT_

> This endpoint updates customer username or/and mobile

```sh
curl -X PUT \
  'http://127.0.0.1:5500/v1/customers/640e3bbd95a37e8ddf807298/contact' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'X-Authorization: Access-Token' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "username": "john.doe@gmail.com",
  "mobile": "0783775258"
}'
```

## _UPDATE PASSWORD_

> This endpoint updates customer password

```sh
curl -X PUT \
  'http://127.0.0.1:5500/v1/customers/640e3bbd95a37e8ddf807298/password' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'X-Authorization: Access-Token' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "new_password": "Mk327452_",
  "confirm_password": "Mk327452_"
}'
```

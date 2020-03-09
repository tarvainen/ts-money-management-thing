# MONEY-MANAGEMENT-THING

Demo money management (bank-ish account) management thing. Create an account and
either deposit or withdraw money in or out. Not for any real usage.

## Installation

```
git clone https://github.com/tarvainen/ts-money-management-thing

yarn install
yarn start
```

The server will be started and will be listening on http://localhost:3000

## Usage

After startup you can use following example `curl`
commands to test this out (change the account id yo match yours).

All data will be saved to the `data.json` in the project root.

### Create account

```
curl --request POST \
  --url http://localhost:3000/account \
  --header 'content-type: application/json' \
  --data '{
	"owner": "John Doe"
}'

-->

{
  "id":"e3040018-72a2-457b-b1a7-79b71c7b35c8",
  "owner":"John Doe",
  "balance":0
}
```

### Deposit money

```
curl --request POST \
  --url http://localhost:3000/account/e3040018-72a2-457b-b1a7-79b71c7b35c8/deposit \
  --header 'content-type: application/json' \
  --data '{
	"amount": 80
}'

-->

{
  "id":"e3040018-72a2-457b-b1a7-79b71c7b35c8",
  "owner":"John Doe",
  "balance":80
}
```

### Withdraw money

```
curl --request POST \
  --url http://localhost:3000/account/e3040018-72a2-457b-b1a7-79b71c7b35c8/withdraw \
  --header 'content-type: application/json' \
  --data '{
	"amount": 5
}'

-->

{
  "id":"e3040018-72a2-457b-b1a7-79b71c7b35c8",
  "owner":"John Doe",
  "balance":75
}
```

### Get account state

```
curl --request GET \
  --url http://localhost:3000/account/e3040018-72a2-457b-b1a7-79b71c7b35c8

-->

{
  "id":"e3040018-72a2-457b-b1a7-79b71c7b35c8",
  "ownerName":"John Doe",
  "currentBalance":160,
  "createdAt":"2020-03-09T20:14:52.185Z",
  "lastUpdatedAt":"2020-03-09T20:15:56.146Z"
}
```

## License

MIT

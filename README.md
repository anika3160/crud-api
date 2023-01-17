# CRUD API

## Common:
1. Clone this repository.
2. Paste into console: `git checkout development` and press enter.
3. Paste into console: `npm install` and press enter.
4. Rename `.env.example` to `.env`and put your `PORT`.

## Development: 
5. Paste into console: `npm run start:dev` and press enter.

## Development multi:
5. Paste into console: `npm run start:multi` and press enter.

## Production:
5. Paste into console: `npm run start:prod` and press enter.

## Tests:
5. Paste into console: `npm run test` and press enter.

Users are stored as `objects` that have the following structure:
{
  `id`: unique identifier (`string`, `uuid`) generated on server side,
  `username`: user's name (`string`, **required**),
  `age`: user's age (`number`, **required**),
  `hobbies`: user's hobbies (`array` of `strings` or empty `array` **required**),
}

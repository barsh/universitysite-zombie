# universitysite-zombie

Functional tests for UniversitySite using [Zombie](http://zombie.js.org) (a headless browser)
and [Mocha](https://mochajs.org) (a testing framework).

## Installation

```
git clone https://github.com/barsh/universitysite-zombie
cd universitysite-zombie
npm install
npm install -g mocha
```

## Configuration

Update the `config.js` file as needed.  For example, some of the tests written
for the login page will fail if you don't specify a valid email address and
password for your site.

## Running Tests

Run all tests:

`$ mocha`

Run a specific test:

`$ mocha test/tests/login`

## Debugging Tests

1. Install node-inspector: `npm install node-inspector -g`
2. Run node-inspector: `node-inspector`
3. Navigate to `http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858`
4. Run mocha with debug flag: `mocha test/tests/login --debug-brk`
5. Refresh the browser several times for the break point to kick in

# Garage Kings Sales App

CNA PR2460 Comprehensive Project

## Setup

### Clone the repo

```bash
git clone git@github.com:mafumeade/GarageKingsSales.git
```

### Install NPM packages

```bash
cd GarageKingsSales     # Navigate to project
npm i                   # Install server packages
npm run client-install  # Install client packages
```

### Create keys_dev.js file in `/config`

```javascript
// Use MongoDB Atlas or a similar service to create a development DB and replace the example with your connection string
module.exports = {
  mongoURI: "mongodb://username:password@exampleMongoServer.net",
  secret: "This is a secret",
};
```

## Start App

This script will run both the back and front end servers

Nodemon will restart the app when changes are saved

```bash
npm run dev
```

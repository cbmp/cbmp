## Installation
```
git clone https://github.com/cbmp/cbmp
cd cbmp
npm install -g gatsby-cli
npm install
gatsby develop
```

## Build
```
gatsby build && gatsby serve
```

## Deploy
CBMP automatically deploys to Netlify on push to master, and you can login to Netlify using the CBMP github account.

## Data collection
Data is collected through 2 spreadsheets (1 for software/webapps, 1 for datasets), and processed with the download-stats-scripts repo using 4 scripts. 

Copy both the csvs from the spreadsheets, and the json results from the processing into cbmp/src/data. GraphQL endpoints can be viewed at localhost:8000/__graphql


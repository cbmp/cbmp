## Installation
```
git clone https://github.com/cbmp/cbmp
cd cbmp
npm install
```
## Develop
```
npm run develop
```

## Build
```
npm run build
npm run serve
```

## Deploy
CBMP automatically deploys to Netlify on push to master, and you can login to Netlify using the CBMP github account.

## Recent member publications
The homepage and Publications page show the latest PubMed records fetched from program member ORCID iDs. To add/remove members from this list, edit `scripts/publicationAuthors.js`. Add new members following the format below:
```
{
    name: 'Member Name',
    orcid: '0000-0000-0000-0000'
}
```
The 10 most recent publication records are fetched when `npm run build` is run. These records are written in `src/components/RecentPublications.js`. Recent publications are automatically fetched and updated on the site weekly as scheduled by `.github/workflows/refresh-publications.yml`. This requires a URL saved to this repo as an Actions secret called `NETLIFY_BUILD_HOOK`. Do not commit the Netlify build-hook URL or store it anywhere except as a GitHub Actions secret. If this URL ever needs to be changed, log into Netlify through the CBMP Github account>Projects>cbmp.ca>Project Configuration>Developer Settings>Build Hooks. Once a new URL is generated, replace the original Repository Actions Secret. 


## Data collection
Data is collected through 2 spreadsheets (1 for software/webapps, 1 for datasets), and processed with the download-stats-scripts repo using 4 scripts. 

Copy both the csvs from the spreadsheets, and the json results from the processing into cbmp/src/data. GraphQL endpoints can be viewed at localhost:8000/__graphql


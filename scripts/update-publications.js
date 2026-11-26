const fs = require('fs');
const https = require('https');
const path = require('path');
const authors = require('./publicationAuthors');

const outputPath = path.resolve(__dirname, '../src/data/recentPublications.json');
const orcidPattern = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;
const maxResults = 100;
const displayLimit = 10;

function getJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`PubMed returned HTTP ${response.statusCode}: ${body.slice(0, 300)}`));
          return;
        }

        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error(`PubMed returned invalid JSON: ${error.message}`));
        }
      });
    });

    request.setTimeout(15000, () => {
      request.destroy(new Error('PubMed request timed out after 15 seconds.'));
    });
    request.on('error', reject);
  });
}

function writeFeed(feed) {
  fs.writeFileSync(outputPath, `${JSON.stringify(feed, null, 2)}\n`, 'utf8');
}

async function updatePublications() {
  if (!Array.isArray(authors)) {
    throw new Error('scripts/publicationAuthors.js must export an array.');
  }

  authors.forEach((author) => {
    if (!author || !author.name || !orcidPattern.test(author.orcid || '')) {
      throw new Error('Each publication author must have a name and a valid ORCID iD.');
    }
  });

  if (authors.length === 0) {
    writeFeed({ updatedAt: null, publications: [] });
    console.log('No ORCID iDs configured; generated an empty publication feed.');
    return;
  }

  const query = authors
    .map((author) => `${author.orcid}[auid]`)
    .join(' OR ');
  const searchUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
    + `?db=pubmed&term=${encodeURIComponent(`(${query})`)}`
    + `&retmode=json&retmax=${maxResults}&sort=pub%20date&tool=cbmp_publication_feed`;
  const searchResponse = await getJson(searchUrl);
  const ids = searchResponse.esearchresult && searchResponse.esearchresult.idlist;

  if (!ids || ids.length === 0) {
    writeFeed({ updatedAt: new Date().toISOString(), publications: [] });
    console.log('PubMed returned no publications for the configured ORCID iDs.');
    return;
  }

  const summaryUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
    + `?db=pubmed&id=${ids.join(',')}&retmode=json&tool=cbmp_publication_feed`;
  const summaryResponse = await getJson(summaryUrl);
  const results = summaryResponse.result || {};
  const publications = ids
    .map((id) => results[id])
    .filter((record) => record && record.title)
    .map((record) => ({
      pmid: record.uid,
      title: record.title,
      authors: (record.authors || []).map((author) => author.name),
      journal: record.fulljournalname || record.source || '',
      pubDate: record.pubdate || '',
      sortDate: record.sortpubdate || record.pubdate || '',
      url: `https://pubmed.ncbi.nlm.nih.gov/${record.uid}/`,
    }))
    .sort((a, b) => Date.parse(b.sortDate) - Date.parse(a.sortDate))
    .slice(0, displayLimit)
    .map((publication) => {
      const { sortDate, ...displayPublication } = publication;
      return displayPublication;
    });

  writeFeed({
    updatedAt: new Date().toISOString(),
    publications,
  });
  console.log(`Wrote ${publications.length} recent PubMed publications.`);
}

updatePublications().catch((error) => {
  console.error('Unable to update the PubMed publication feed:', error);
  process.exitCode = 1;
});

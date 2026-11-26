import React from 'react';
import styled from 'styled-components';
import publicationFeed from '../data/recentPublications.json';

const StyledRecentPublications = styled.section`
  width: calc(100% - 60px);
  padding: 20px 30px 20px 30px;
  margin: 30px auto;
  background:var(--contrast-bg);
  border-radius: 30px;
  overflow: hidden
  

  h2 {
    margin-top: 0;
    font-family: 'Rubik', sans-serif;
    font-size: calc(1.3vw + 0.7em);
  }

  .publication {
    padding: 10px 0;
    border-bottom: 1px solid rgba(29, 117, 151, 0.2);
    line-height: 1.2;
  }

  .publication-title {
    font-weight: 700;
  }

  .publication-details
  .feed-updated {
    font-size: 0.9em;
  }

  .feed-updated {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 700px) {
    padding: 24px;
  }
`;
const ItalicLine = styled.span`
  font-style: italic;
`;

const RecentPublications = () => {
  const { publications, updatedAt } = publicationFeed;

  return (
    <StyledRecentPublications aria-labelledby="recent-publications-heading">
      <h2 id="recent-publications-heading">Recent Member Publications</h2>
      {publications.length === 0 ? (
        <p>
          The publication feed will appear here after member ORCID iDs are configured.
        </p>
      ) : (
        <div>
          {publications.map((publication) => (
            <article className="publication" key={publication.pmid}>
              <a
                className="publication-title"
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {publication.title}
              </a>
              <p className="publication-details">
                {publication.authors.join(', ')}
                <ItalicLine> {publication.journal ? ` — ${publication.journal}` : ''} </ItalicLine>
                {publication.pubDate ? `, ${publication.pubDate}` : ''}
              </p>
            </article>
          ))}
        </div>
      )}
      {updatedAt && (
        <p className="feed-updated">
          PubMed data last refreshed:
          {' '}
          {new Date(updatedAt).toLocaleDateString()}
        </p>
      )}
    </StyledRecentPublications>
  );
};

export default RecentPublications;

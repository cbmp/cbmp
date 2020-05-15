const path = require('path');

// https://elcess.us/Integrating-Plotly-with-Gatsby/ for build
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /plotly.js/,
            use: loaders.null(),
          },
          {
            test: /react-circos/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  /* SOFTWARE */
  const softwareTemplate = path.resolve('src/templates/SoftwareTemplate.js');
  const softwareQuery = await graphql(`
    query {
        allSoftwareCsv {
            edges {
                node {
                    name
                    slug
                } 
            }
        }
    }
    `);

  const software = softwareQuery.data.allSoftwareCsv.edges;

  software.forEach((edge) => {
    createPage({
      path: `/software/${edge.node.slug}`,
      component: softwareTemplate,
      context: { slug: edge.node.slug, name: edge.node.name }, // pass as props to component
    });
  });

  /* WEB APPS */
  const webappsTemplate = path.resolve('src/templates/WebappsTemplate.js');
  const webappsQuery = await graphql(`
    query {
        allWebappsCsv {
            edges {
                node {
                    name
                    slug
                } 
            }
        }
    }
    `);

  const webapps = webappsQuery.data.allWebappsCsv.edges;

  webapps.forEach((edge) => {
    createPage({
      path: `/web-apps/${edge.node.slug}`,
      component: webappsTemplate,
      context: { slug: edge.node.slug, name: edge.node.name }, // pass as props to component
    });
  });

  /* DATASETS */
  const datasetsTemplate = path.resolve('src/templates/DatasetsTemplate.js');
  const datasetsQuery = await graphql(`
    query {
        allDatasetsCsv {
            edges {
                node {
                    name
                    slug
                } 
            }
        }
    }
    `);

  const datasets = datasetsQuery.data.allDatasetsCsv.edges;

  datasets.forEach((edge) => {
    createPage({
      path: `/datasets/${edge.node.slug}`,
      component: datasetsTemplate,
      context: { slug: edge.node.slug }, // pass as props to component
    });
  });
};

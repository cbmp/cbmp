const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    /* SOFTWARE */
    const softwareTemplate = path.resolve(`src/templates/SoftwareTemplate.js`)
    const softwareQuery = await graphql(`
    query {
        allSoftwareCsv {
            edges {
                node {
                    name
                    lab
                    slug
                    long_desc
                    version
                    authors
                    keywords
                    licensing
                    citation
                    scholar_link
                    scholar_link_cited
                    major_pubs_cited
                    download_link
                    instruction_link
                    download_stats_link
                } 
            }
        }
    }
    `)

    let software = softwareQuery.data.allSoftwareCsv.edges;

    software.forEach(edge => {
        createPage({
            path: `/software/${edge.node.slug}`,
            component: softwareTemplate,
            context: {slug: edge.node.slug} // pass as props to component
        })
    })

    /* WEB APPS */
    const webappsTemplate = path.resolve(`src/templates/WebappsTemplate.js`)
    const webappsQuery = await graphql(`
    query {
        allWebappsCsv {
            edges {
                node {
                    name
                    lab
                    slug
                    long_desc
                    version
                    authors
                    keywords
                    licensing
                    citation
                    scholar_link
                    scholar_link_cited
                    major_pubs_cited
                    download_link
                    instruction_link
                    download_stats_link
                } 
            }
        }
    }
    `)

    let webapps = webappsQuery.data.allWebappsCsv.edges;

    webapps.forEach(edge => {
        createPage({
            path: `/web-apps/${edge.node.slug}`,
            component: webappsTemplate,
            context: {slug: edge.node.slug} // pass as props to component
        })
    })

    /* DATASETS */
    const datasetsTemplate = path.resolve(`src/templates/DatasetsTemplate.js`)
    const datasetsQuery = await graphql(`
    query {
        allDatasetsCsv {
            edges {
                node {
                    name
                    lab
                    year
                    slug
                    long_desc
                    version
                    authors
                    keywords
                    licensing
                    num_samples
                    technology
                    citation
                    scholar_link
                    scholar_link_cited
                    major_pubs_cited
                    download_link
                    download_stats_link
                } 
            }
        }
    }
    `)

    let datasets = datasetsQuery.data.allDatasetsCsv.edges;

    datasets.forEach(edge => {
        createPage({
            path: `/datasets/${edge.node.slug}`,
            component: datasetsTemplate,
            context: {slug: edge.node.slug} // pass as props to component
        })
    })

}
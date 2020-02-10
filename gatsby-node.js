const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const softwareTemplate = path.resolve(`src/templates/SoftwareTemplate.js`)

    const softwareQuery = await graphql(`
    query SoftwareQuery {
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

}
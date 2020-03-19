import React, {Fragment} from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { StaticQuery, graphql, Link } from "gatsby";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

const StyledDatasets = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items:center;
    flex-direction: column;
    margin-top:80px;
    padding: 30px 0px 80px 0px;
    
    h1 {
        font-size:calc(1.8vw + 0.7em);
        font-family: 'Rubik', sans-serif; 

        span {
            background: var(--main-color);
            color: white;
            font-size: calc(0.5vw + 0.5em);
            padding: 10px 12px;
            border-radius: 50%;
        }
    }
    .container {
        width: 80%;
        // padding-top: 30px;
    }

    
`;

const DatasetsQuery = graphql`
    {
        allDatasetsCsv (
            sort: {
                fields: [name]
                order: ASC
            }
        ){
            edges {
                node {
                    name
                    lab
                    slug
                    short_desc
                    technology
                    keywords
                    num_samples
                    year
                } 
            }
        }
    }
`

const filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    switch (typeof row[id]) {
    case 'object':
        // checks for metastasis label
        if (row[id] && row[id].origin) {
            return String('metastasis').includes(filter.value.toLowerCase());
        }
        // checks for disease name (additional check is to filter out null values)
        return row[id] && row[id].name
            ? String(row[id].name.toLowerCase()).includes(filter.value.toLowerCase())
            : false;
    // handles age filtering
    case 'number':
        return row[id].toString().includes(filter.value);
    case 'string':
        return String(row[id].toLowerCase()).includes(filter.value.toLowerCase());
    default:
        return false;
    }
};

const columns = [{
        Header: 'Name',
        accessor: 'node.name',
        sortable: true,
        Cell: (row) => {
            return (<Link to={`/datasets/${row.original.node.slug}`}>{row.value}</Link>)
        },
    }, 
    {
        Header: 'Number of Samples',
        accessor: 'node.num_samples',
        sortable: true,
    }, 
    {
        Header: 'Year',
        accessor: 'node.year',
        sortable: true,
    },
    {
        Header: 'Technology',
        accessor: 'node.technology',
        sortable: true,
    },
    {
        Header: 'Short Description',
        accessor: 'node.short_desc',
        sortable: true,
    },
    {
        Header: 'Lab',
        accessor: 'node.lab',
        sortable: true,
    }
];

const Datasets = () => (
    <Layout page="Datasets">
        <StyledDatasets>
            <div className="container">
                <StaticQuery
                    query={DatasetsQuery}
                    render={data => (
                        <Fragment>
                            <h1>Datasets <span className="count">{data.allDatasetsCsv.edges.length}</span></h1>
                            <ReactTable
                                data={data.allDatasetsCsv.edges}
                                columns={columns}
                                filterable
                                defaultFilterMethod={filterCaseInsensitive}
                                className="-highlight"
                                showPagination={false}
                                pageSize={data.allDatasetsCsv.edges.length}
                            />
                        </Fragment>
                    )}
                />
            </div>
        </StyledDatasets>
    </Layout>
  
)

export default Datasets;

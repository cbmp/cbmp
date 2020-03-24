import React, { useState, useEffect } from 'react';

// this function is called whenever url changed
const useFetchDownloadStats = (name) => {

    // setting states
    const [biocData, setBiocData] = useState([]);
    const [loading, setLoading] = useState(false);

    // function for converting tsv to json 
    const tsvJSON = (tsv) => {
        const lines = tsv.split('\n');
        const headers = lines.slice(0, 1)[0].split('\t');
        return lines.slice(1, lines.length).map(line => {
          const data = line.split('\t');
          return headers.reduce((obj, nextKey, index) => {
            obj[nextKey] = data[index];
            return obj;
          }, {});
        });
    }

    useEffect(() => {
        setBiocData([]);
        fetch(`https://bioconductor.org/packages/stats/bioc/${name}/${name}_stats.tab`)
            .then((response) => {
                return response.text()
            })
            .then((res) => {
                const data = tsvJSON(res);
                console.log(data);
            });
    }, [name]);

    return {
        biocData, loading
    };
};

export default useFetchDownloadStats;

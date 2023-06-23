import { useState, useEffect } from "react";
import axios from "axios";
//import { RAPID_API_KEY } from '@env';
import { set } from "react-native-reanimated";

const RAPID_API_KEY = '9caef3b9dcmsh7ac363ce6803102p12f445jsna006e4f70293'
const rapidApiKey = RAPID_API_KEY;


function getMethod(method) {
    return `method=${method}`
}

function getParams(params) {
    return `params=${JSON.stringify(params)}`
}

function getEndpoint(method, params) {
    return `${endpoint}${getMethod(method)}&${getParams(params)}`
}

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let method = 'getAll';
    let params = {
        "tab": "jsearch",
        "filter": { "job_country": "US" }
    };

    const options = {
        method: 'GET',
        // url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        url: getEndpoint(method, params),
        // headers: {
        //     'X-RapidAPI-Key': rapidApiKey,
        //     'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        // },
        // params: { ...query }
    };
    //console.log("useFetch | options: " + JSON.stringify(options));
    // FETCH DATA
    const fetchData = async () => {

        setIsLoading(true);

        try {
            const response = await axios.request(options);

            console.log("useFetch | axios options: " + JSON.stringify(options));
            console.log("useFetch | response: " + JSON.stringify(response.data.data));


            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}


export default useFetch;

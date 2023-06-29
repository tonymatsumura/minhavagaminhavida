import { useState, useEffect } from "react";
import axios from "axios";
//import { RAPID_API_KEY } from '@env';
import { set } from "react-native-reanimated";

const RAPID_API_KEY = ''
const rapidApiKey = RAPID_API_KEY;
const endpoint = 'https://script.google.com/macros/s/AKfycbyeIrRvDZgpfBdMwVFG6SEGVYB1U7HLVVenv2mPhcdDMHAGk785e57oa40Xrh00R2USUA/exec?';


function getMethod(method) {
    console.log("getMethod");

    return `method=${method}`
}

function getParams(params) {
    console.log("getParams");

    return `params=${params}`
}

function getEndpoint(method, params) {
    console.log("getEndpoint");

    return `${endpoint}${getMethod(method)}&${getParams(params)}`
}

const useFetch = (endpoint, query) => {
    console.log("useFetch");

    console.log(`useFetch | ${query}`)

    let _query = (JSON.parse(query))['query'];

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let key = Object.keys(_query)[0];
    let value = Object.values(_query)[0];


    let method = 'getAll';
    let params = `{"tab":"jsearch", "filter": { "${key}": "${value}" }}`
    let url = getEndpoint(method, params)
    console.log('useFetch | params: ' + url)

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

    // FETCH DATA
    const fetchData = async () => {

        setIsLoading(true);

        try {
            const response = await axios.request(options);

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
        console.log("useFetch");
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}


export default useFetch;
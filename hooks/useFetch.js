import { useState, useEffect } from "react";
import axios from "axios";
//import { RAPID_API_KEY } from '@env';
import { set } from "react-native-reanimated";

//const RAPID_API_KEY = '9caef3b9dcmsh7ac363ce6803102p12f445jsna006e4f70293'
//const RAPID_API_KEY = '62543c5848msh9d36f1c43e2c897p1edfa2jsn89eae16a798a'
//const rapidApiKey = RAPID_API_KEY;
// method=getAll&params={"tab": "jsearch", "filter":{"job_employment_type":"FULLTIME"}}`,

const endpoint = `https://script.google.com/macros/s/AKfycbyeIrRvDZgpfBdMwVFG6SEGVYB1U7HLVVenv2mPhcdDMHAGk785e57oa40Xrh00R2USUA/exec?`



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
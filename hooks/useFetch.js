import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import { RAPID_API_KEY } from '@env'

const rapidApiKey= "a183a151f0mshae599a5fdc099e6p1c664ejsnc0822a8d416b"

const useFetch = (endpoint, query) => {
    const [data,setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: {
       ...query
      },
    }

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const resp = await axios.request(options);
            setData(resp.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('Error fetching data')
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(()=> {
        fetchData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }


    return { data, isLoading, error, refetch }
    

}

export default useFetch;

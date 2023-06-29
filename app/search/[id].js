//#region Imports
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import axios from 'axios'
import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
//#endregion

const endpoint = 'https://script.google.com/macros/s/AKfycbyeIrRvDZgpfBdMwVFG6SEGVYB1U7HLVVenv2mPhcdDMHAGk785e57oa40Xrh00R2USUA/exec?';

function getMethod(method) {
    console.log("getMethod");

    return `method=${method}`
}

function getParams(params) {
    console.log("getParams");

    return `params=${JSON.stringify(params)}`
}

function getEndpoint(method, params) {
    console.log("JobSearch | getEndpoint");

    return `${endpoint}${getMethod(method)}&${getParams(params)}`
}

const JobSearch = () => {
    const external_params = useSearchParams();
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);

    // Temp Consts
    const [tOptions, setTOptions] = useState({});
    const [tResponse, setTResponse] = useState({});


    const handleSearch = async (params) => {
        setSearchLoader(true);
        setSearchResult([]);

        let method = 'getAll';
        let _params = {
            "tab": "jsearch",
            "filter": { "job_title": params.id }
        };

        let url = getEndpoint(method, params.id);
        console.log("url", url);

        const options = {
            method: 'GET',
            // url: `https://jsearch.p.rapidapi.com/${endpoint}`,
            url: getEndpoint(method, _params),
            // headers: {
            //     'X-RapidAPI-Key': rapidApiKey,
            //     'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            // },
            // params: { ...query }
        };

        try {
            const response = await axios.request(options);
            setTResponse(response)
            setTOptions(external_params)
            setSearchResult(response.data.data);
        } catch (error) {
            //setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            handleSearch(external_params)
        } else if (direction === 'right') {
            setPage(page + 1)
            handleSearch(external_params)
        }
    }

    useEffect(() => {
        handleSearch(external_params)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <NearbyJobCard
                        job={item}
                        handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
                    />
                )}
                keyExtractor={(item) => item.job_id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                            <Text>External params: {tOptions.id}</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default JobSearch
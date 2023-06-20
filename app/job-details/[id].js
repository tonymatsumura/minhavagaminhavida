//#region IMPORT
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { COLORS, icons, SIZES } from '../../constants';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { useFetch } from '../../hooks/useFetch';
//#endregion

// JOB DETAILS SCREEN
const JobDetails = () => {
    const params = useSearchParams();;
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetch('job-details', { job_id: params.id });
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => { }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.goBack()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"

                        />
                    ),
                    headerTitle: "Job Details",
                }}
            />
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something want wrong</Text>
                    ) : data.length === 0 ? (
                        <Text>No data found</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_location}
                            />
                        </View>
                    )}


                </ScrollView>
            </>

        </SafeAreaView >
    )
}

export default JobDetails;
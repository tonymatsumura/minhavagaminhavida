import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularjobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hooks/useFetch'
import { OUTSTR } from '../../../constants/outputStr';

const Popularjobs = () => {

    const router = useRouter();

    const { data, isLoading, error } = useFetch('search', {
        query: 'React developer',
        num_pages: "1",
    })

    const [selectedJob, setSelectedJob] = useState()

    const handleCardPress = (item) => {
        router.push(`/job-details/${item.job_id}`)
        setSelectedJob(item.job_id);
    }

    // RETURN 
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{OUTSTR.popularJobs.headerTitle}</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show All</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ?
                    (
                        <ActivityIndicator size="large" colors={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : (
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <PopularjobCard
                                    item={item}
                                    selectedJob={selectedJob}
                                    handleCardPress={handleCardPress}
                                />
                            )}
                            keyExtractor={(item) => item.job_id}
                            contentContainerStyle={{ columnGap: SIZES.medium }}
                            horizontal
                        />
                    )}
            </View>
        </View>
    )
}

export default Popularjobs;
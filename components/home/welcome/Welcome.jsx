import { useState } from 'react'
import { useRouter } from 'expo-router';
import { icons, SIZES } from '../../../constants';
import { OUTSTR } from '../../../constants/outputStr';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'

import styles from './welcome.style'

const jobTypes = ["Tempo Integral", "Meio Período", "Contrato", "Estágio", "Freelance"]

const Welcome = () => {

    const router = useRouter();
    const [activeJobType, setActiveJobType] = useState('Tempo Integral')

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>{OUTSTR.welcome.greeting}</Text>
                <Text style={styles.welcomeMessage}>{OUTSTR.welcome.searchBoxTitle}</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=""
                        onChange={() => { }}
                        placeholder={OUTSTR.welcome.searchInput}
                    />
                </View>


                <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
                    <Image source={icons.search} resizeMode="contain" style={styles.searchBtnImage} />
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <FlatList
                    data={jobTypes}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={() => {
                                setActiveJobType(item);
                                router.push(`/search/${item}`)
                            }}

                        >
                            <Text style={styles.tabText(activeJobType, item)}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                />

            </View>

        </View>
    )
}

export default Welcome;
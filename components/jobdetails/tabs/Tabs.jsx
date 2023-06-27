//#region Imports
import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './tabs.style'
import { SIZES } from '../../../constants'
//#endregion

const TabButton = ({ name, activeTab, onHandSearchType }) => (
    <TouchableOpacity
        style={styles.btn(name, activeTab)}
        onPress={onHandSearchType}
    >
        <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
)

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    console.log("Tabs")

    return (
        <View style={styles.container}>
            <FlatList
                data={tabs}
                renderItem={({ item }) => (
                    <TabButton
                        name={item}
                        activeTab={activeTab}
                        onHandSearchType={() => setActiveTab(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={{ columnGap: SIZES.small / 2 }}
            />
        </View>
    )
}

export default Tabs
import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({ url }) => {
    console.log("Footer")
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.likeBtn}>
                <Image
                    source={icons.heartOutline}
                    resizeMode='contain'
                    style={styles.likeBtnImage}
                />

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => Linking.openURL(url)}
            >
                <Text style={styles.applyBtnText}>Candidatar-se a vaga</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Footer
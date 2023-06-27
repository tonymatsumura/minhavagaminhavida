import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
    //console.log("ScreenHeaderBtn")
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
            <Image source={iconUrl} resizeMode='cover' style={styles.btnImg(dimension)} />
        </TouchableOpacity>
    )
}

export default ScreenHeaderBtn
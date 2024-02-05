import React, { useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Img from "./Img";
import { appIcons } from "../assets";
import appStyles from "../screens/appStyles";
import { colors } from "../utils";

function EditImagesList(props) {

    const item = props.item;
    const [hideImage, setHideImage] = useState(false);

    const handelClose = () => {
        setHideImage(true);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
        >

            <ImageBackground
                source={item.image}
                style={
                    hideImage
                        ? styles.hide
                        : styles.images
                }
                imageStyle={{ borderRadius: 10 }}
            >
                <TouchableOpacity
                    style={styles.closeIconCont}
                    onPress={handelClose}
                >
                    <Img
                        local
                        src={appIcons.close}
                        style={styles.closeIcon}
                        resizeMode={"contain"}
                        tintColor={colors.white}
                    />
                </TouchableOpacity>
            </ImageBackground>

        </TouchableOpacity >
    );
};

export default EditImagesList;

const styles = StyleSheet.create({
    closeIconCont: {
        position: "absolute",
        width: 15,
        height: 15,
        borderRadius: 100,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        backgroundColor: colors.secondary,
        top: 0,
        right: 1,
        borderColor: colors.white,
        borderWidth: 1
    },

    closeIcon: {
        width: 6,
        height: 6,
    },

    images: {
        width: 80,
        height: 80,
        borderRadius: 10,
        alignItems: "flex-end",
        ...appStyles.justifyCenter,
        marginTop: 10,
        marginHorizontal: 5
    },

    hide: {
        display: "none"
    },
});
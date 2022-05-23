import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: "white"
    },
    textSeparator: {
        borderLeftWidth: 1,
        borderColor: "lightgray",
        height: "70%",
        alignSelf: "center"
    },
    inputContainers: {
        width: "90%",
        marginTop: 20,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 20
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

export default styles;

export default StyleSheet => StyleSheet.extend({
    container: {
        alignItems: 'stretch'
    },

    nearbyTitle: {
        backgroundColor: StyleSheet.black,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    nearbyTitleText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: StyleSheet.white,
        lineHeight: 16,
        letterSpacing: 1
    },

    listIcon: {
        position: 'absolute',
        right: 24,
        top: 0,
        bottom: 0,
        width: 24,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        height: null
    },

    nearbyMapContainer: {
        alignItems: 'stretch'
    },

    map: {
        height: 250
    }
});
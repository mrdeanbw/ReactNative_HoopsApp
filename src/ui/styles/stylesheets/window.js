
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({

    accessoryBarStyle: {
        position: 'absolute',
        zIndex: 1,
        left: 3,
        top: 4,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5
    },

    style: {
        flex: 1
    },

    contentStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: colors.window
    },

    titleBarStyle: {
        backgroundColor: colors.black,
        paddingTop: 20,
        alignItems: 'stretch'
    },

    logoBarStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55
    },

    logoStyle: {
        height: 30,
        width: 200,
        resizeMode: 'contain'
    },



    modeBarStyle: {
        height: 35,
        backgroundColor: colors.pink,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modeTextStyle: {
        color: colors.white,
        lineHeight: 17,
        fontSize: 14
    },

    modeHighlightTextStyle: {
        fontWeight: 'bold'
    },

    modeChevronStyle: {
        position: 'absolute',
        top: -4,
        right: 19,
        width: 20,
        height: 20,
        backgroundColor: colors.pink,
        transform: [{rotate: '45deg'}],
    },

    titleStyle: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleTextStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: 1
    },

    tabBarStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 52,
        borderStyle: 'solid',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#e6eaeb',
        backgroundColor: colors.white,
        paddingLeft: 10,
        paddingRight: 10
    },

    menuContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 50
    },

    menuOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(41,44,52,0.5)',
    },

    menu: {
        position: 'absolute',
        right: -115,
        top: 0,
        bottom: 0,
        width: 115,
        backgroundColor: 'white'
    },

    avatarContainer: {
        height: 160,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },

    avatar: {
        width: 70,
        height: 70,
        backgroundColor: colors.highlightBlack,
        borderRadius: 35,
        overflow: 'hidden'
    },

    avatarImage: {
        flex: 1,
        width: null,
        height: null
    },

    avatarText: {
        color: colors.white,
        fontSize: 13,
        lineHeight: 13,
        letterSpacing: 1,
        marginTop: 10,
        textAlign: 'center'
    },


    menuIcon: {
        overflow: 'visible'
    },

    menuIcons: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-around'
    },

    badge: {
        color: colors.white,
        backgroundColor: 'transparent',
        lineHeight: 11.5,
        fontSize: 11
    },

    badgeContainer: {
        position: 'absolute',
        backgroundColor: colors.pink,
        left: 12,
        top: -7,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modal: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 500
    }
});
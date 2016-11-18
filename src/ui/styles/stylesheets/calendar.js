
import {colors} from '../resources';

export default StyleSheet => StyleSheet.extend({
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F9F9',
    height: 50,
  },

  monthChangeButton: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  monthSelectorText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.black,
    flex: 1,
    textAlign: 'center',
  },

  monthSelectorTextActive: {
    color: colors.pink,
  },

  monthUnderlineContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
    alignItems: 'center',
  },

  monthUnderline: {
    width: 97,
    height: 3,
    backgroundColor: colors.pink,
  },

  arrow: {
    width: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayLabels: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.grey,
    height: 50,
    marginHorizontal: 14,
  },

  dayLabelText: {
    fontSize: 14,
    flex: 1,
    color: colors.grey,
    textAlign: 'center',
  },

  days: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
    paddingVertical: 14,
  },

  weekContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 14,
  },

  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 42,
    height: 42,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.transparent,
  },

  dayContainerToday: {
    borderColor: colors.pink,
  },

  dayContainerSelected: {
    backgroundColor: colors.pink,
    borderColor: colors.pink,
  },

  dayHighlight: colors.transparent,

  day: {
    flex: 0,
    textAlign: 'center',
  },

  daySelected: {
    color: 'white',
  },

  dayOtherMonth: {
    color: colors.grey,
  },

  dayIndicator: {
    position: 'absolute',
    left: 18, // (40/2) - (4/2)
    bottom: 6,
    height: 4,
    width: 4,
    borderRadius: 4,
    backgroundColor: colors.pink,
  },

  dayIndicatorSelected: {
    backgroundColor: colors.white,
  },

  eventsHeader: {
    color: colors.pink,
    fontSize: 14,
    marginHorizontal: 18,
    marginTop: 18,
  },

  eventsContainer: {
  },

  event: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.grey,
    marginHorizontal: 14,
    paddingVertical: 14,
  },

  eventUnderlay: colors.grey,

  eventTime: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  eventTimeText: {
    fontWeight: 'bold',
  },

  eventDetails: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  eventTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  eventAddress: {
    fontSize: 12,
    color: '#606060',
  },

  eventChevron: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

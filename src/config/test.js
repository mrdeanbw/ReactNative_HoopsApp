              <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Text style={[StyleSheet.text, StyleSheet.highlightText, StyleSheet.alignCenter]}>
                  {_('walletInfo1')}
                </Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                  <Text style={[StyleSheet.text, StyleSheet.highlightText, StyleSheet.alignCenter]}>
                    {_('walletInfo2')}
                  </Text>
                  <Icon name="info" />
                </View>

              </View>

              {stripeError && (
                <View style={[infoContainer ,{padding: 15}]}>
                  <Text style={[StyleSheet.text, StyleSheet.highlightText, StyleSheet.alignCenter]}>
                    {stripeError}
                  </Text>
                  <Icon name="info" />
                </View>
              )}

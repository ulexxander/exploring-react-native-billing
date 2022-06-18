/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import * as RNIap from 'react-native-iap';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const monospaceFont = Platform.select({
  ios: 'Courier',
  android: 'monospace',
});

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<
    RNIap.Subscription[] | null
  >(null);

  const [requestedSubscription, setRequestedSubscription] =
    useState<RNIap.SubscriptionPurchase | null>(null);

  const [requestedSubscriptionLoading, setRequestedSubscriptionLoading] =
    useState<boolean>(false);

  const [requestedSubscriptionError, setRequestedSubscriptionError] =
    useState<Error | null>(null);

  useEffect(() => {
    RNIap.initConnection()
      .then(() => {
        console.log('Initialized IAP connection!');
      })
      .then(() => {
        return RNIap.getSubscriptions(['some_feature_subscription']);
      })
      .then(subscriptions => {
        console.log('Subscriptions', subscriptions);
        setSubscriptions(subscriptions);
      })
      .catch(err => {
        console.log('Failed to initialize IAP connection:', err);
      });
  }, []);

  return (
    <View>
      <View>
        <Text style={{fontSize: 24, textAlign: 'center'}}>
          Subscriptions List
        </Text>
        <Text>Subscriptions:</Text>
        <Text style={{fontSize: 12, fontFamily: monospaceFont}}>
          {JSON.stringify(subscriptions, null, 2)}
        </Text>
      </View>
      <View>
        {subscriptions && (
          <Button
            title="Request subscription"
            onPress={() => {
              setRequestedSubscriptionLoading(true);
              RNIap.requestSubscription('some_feature_subscription')
                .then(subscription => {
                  setRequestedSubscription(subscription);
                })
                .catch(err => {
                  setRequestedSubscriptionError(err);
                })
                .finally(() => {
                  setRequestedSubscriptionLoading(false);
                });
            }}></Button>
        )}
        {requestedSubscription && (
          <Text style={{color: 'green'}}>
            Requested subscription:{' '}
            {JSON.stringify(requestedSubscription, null, 2)}
          </Text>
        )}
        {requestedSubscriptionError && (
          <Text style={{color: 'red'}}>
            Error: {requestedSubscriptionError.name}{' '}
            {requestedSubscriptionError.message}
          </Text>
        )}
      </View>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Subscriptions />

          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

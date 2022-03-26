// @ts-ignore
import * as React from 'react';
import { useEffect } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { CalendarManager } from 'react-native-awesome-module';

export default function App() {
  // const [ setResult] = React.useState<number | undefined>();

  // React.useEffect(() => {
  //   multiply(3, 7).then(setResult);
  // }, []);

  const addEvent = () => {
    CalendarManager.addEvent('Birthday Party', {
      location: '4 Privet Drive, Surrey',
      time: new Date().getTime(),
      description: '...',
    });
  };

  const addEventCb = () => {
    console.log(222);
    CalendarManager.findEvents((error: any, events: any) => {
      if (error) {
        console.error(error);
      } else {
        console.error(events);
      }
    });
  };

  const addEventCbAsync = async () => {
    try {
      const events = await CalendarManager.asyncFindEvents();
      console.log('events', events);
    } catch (e) {
      console.error(e);
    }
  };

  const addEventCbAsyncQue = async () => {
    try {
      CalendarManager.doSomethingExpensive(
        'ssss',
        (value: any, value2: any) => {
          console.log('====>多线程返回值1', value);
          console.log('====>多线程返回值2', value2);
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const getConstants = () => {
    console.log(CalendarManager.firstDayOfTheWeek);
  };

  useEffect(() => {
    const subscription = CalendarManager.calendarManagerEmitter.addListener(
      'EventReminder',
      (reminder) => console.log(reminder.name)
    );
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text onPress={addEvent}>手动调用addEvent</Text>
      </View>

      <View>
        <Text onPress={addEventCb}>手动调用addEventCb</Text>
      </View>

      <View>
        <Text onPress={addEventCbAsync}>手动调用addEventCbAsync</Text>
      </View>

      <View>
        <Text onPress={addEventCbAsyncQue}>手动调用多线程</Text>
      </View>

      <View>
        <Text onPress={getConstants}>手动调用获取常量</Text>
      </View>

      <View>
        <Text>监听值</Text>
      </View>
    </View>
  );
  // return (
  //   <MapKitVIew
  //     zoomEnabled={true}
  //     region={{
  //       latitude: 37.48,
  //       longitude: -122.16,
  //       latitudeDelta: 0.1,
  //       longitudeDelta: 0.1,
  //     }}
  //     onRegionChange={(value) => {
  //       console.log(value);
  //       console.log('====================================');
  //     }}
  //     // @ts-ignore
  //     style={{ width: '100%', height: '100%' }}
  //   />
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

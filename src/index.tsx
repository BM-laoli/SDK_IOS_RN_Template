import { NativeModules, Platform, NativeEventEmitter } from 'react-native';
import { requireNativeComponent } from 'react-native';
import React from 'react';

const LINKING_ERROR =
  `The package 'react-native-awesome-module' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const AwesomeModule = NativeModules.AwesomeModule
  ? NativeModules.AwesomeModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
// ===============================================初始化===========================================
/**
   当你启动的example 项目时
    如果是仅仅是修改了 js/ts代码，它会自动的同步到开发环境下的example下
    如果你是修改Native模块之后，若想使用更新你需要怎么做
    1. 在xcode中打开 lib项目的下的ios.project 并且在里面修改
    2.修改完成到 example 的xcode中进行重新 build 构建就好了
    建议修改所有的东西之后 ，在watch 并且 run build 一下    
    */

/**
    当你启动的是外部项目，并且通过 link 链接过去时
    和上面的过程和原理是勒是的
    建议修改所有的东西之后 ，在watch 并且 run build 一下
  */

/**
    如何在外部项目直接链接到本项目模块进行本地开发呢？请参考下面的步骤
    实际上我们尝试过 使用link的方式，但是效果都不是特别的好，故 我们目前采取的做法是
    在外部项目包中直接添加，比如下面的这样子
    // 外部的项目
      "react-native-awesome-module": "/Users/wcmismac020/Desktop/origin/react-native-awesome-module"
   */

export function multiply(a: number, b: number): Promise<number> {
  return AwesomeModule.multiply(a, b);
}

// ===============================================初始化UI组件===========================================
// requireNativeComponent 自动把'RNTMap'解析为'RNTMapManager'
const RNTMap = requireNativeComponent('RNTMap');
// 有时候你的原生组件有一些特殊的属性希望导出，但并不希望它成为公开的接口。

export interface InterMapKitVIewProps {
  zoomEnabled?: boolean;
  region: {
    // 中心点坐标
    latitude: number;
    longitude: number;

    // 最大最小经纬之间的距离
    latitudeDelta: number;
    longitudeDelta: number;
  };
  onRegionChange: (value: any) => void;
}
const MapKitVIew: React.FC<InterMapKitVIewProps> = (props) => {
  return (
    <RNTMap
      // @ts-ignore
      style={{ flex: 1 }}
      {...props}
    />
  );
};
export { MapKitVIew };

// ===============================================功能模块===========================================

export interface InterCalendarManager {
  addEvent: (name: string, options: any) => void;
  findEvents: (cb: (err: any, events: any) => void) => void;
  asyncFindEvents: () => Promise<any>;
  doSomethingExpensive: (
    parmas: any,
    cb: (value1: any, value2: any) => void
  ) => void;
  firstDayOfTheWeek: any;
  calendarManagerEmitter: NativeEventEmitter;
  // 监听事件
}

export const CalendarManager =
  NativeModules.CalendarManager as InterCalendarManager;

// 自主手动调用
// CalendarManager.addEvent('Birthday Party', {
//   location: '4 Privet Drive, Surrey',
//   time: new Date().getTime(),
//   description: '...',
// });

// 正常的回调函数
// CalendarManager.findEvents((error: any, events: any) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.error(events);
//   }
// });

// 异步的回调函数
// async function updateEvents() {
//   try {
//     const events = await CalendarManager.findEvents();
//     console.log('events', events);
//   } catch (e) {
//     console.error(e);
//   }
// }
// updateEvents();

// 异步的回调函数 多线程
// async function updateEventsQue() {
//   try {
//     const events = await CalendarManager.doSomethingExpensive();
//     console.log('events', events);
//   } catch (e) {
//     console.error(e);
//   }
// }
// updateEventsQue();

// 获取常量
// console.log(CalendarManager.firstDayOfTheWeek);

// 主动收集 Native端的事件

CalendarManager.calendarManagerEmitter = new NativeEventEmitter(
  // @ts-ignore
  CalendarManager
);

// const subscription = calendarManagerEmitter.addListener(
//   'EventReminder',
//   (reminder) => console.log(reminder.name)
// );
// // 别忘了取消订阅，通常在componentWillUnmount生命周期方法中实现。
// subscription.remove();

// CalendarManager.m
#import "CalendarManager.h"
#import <React/RCTConvert.h>

static NSString * const kTestNotificationName = @"kTestNotificationName";
static NSString * const TestEventName = @"TestEventName";

//由于实现了这个类 哈，所以
@implementation CalendarManager
{
    bool hasListeners;
//    类似 私有变量
}

// oc类初始化方法
- (instancetype)init {
    if( self = [super init] ){
        [NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(sendEventToJS) userInfo:nil repeats:YES];
    }
    return  self;
}

// To export a module named CalendarManager
RCT_EXPORT_MODULE();

// This would name the module AwesomeCalendarManager instead
// RCT_EXPORT_MODULE(AwesomeCalendarManager);


// 在IOS中 RCT_EXPORT_METHOD 有很多参数 https://reactnative.cn/docs/native-modules-ios
// 自己写一个定时器 手动的去触发 这个 事件 为了让IOS给RN发消息
RCT_EXPORT_METHOD(addEvent:(NSString *)name details:(NSDictionary *)details)
{
  NSString *location = [RCTConvert NSString:details[@"location"]];
  NSDate *time = [RCTConvert NSDate:details[@"time"]];
//
    
}

// 处理回调
RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  
  callback(@"我是一个简单的回调");
}

// 处理异步回调
RCT_REMAP_METHOD(asyncFindEvents,
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@"no_events");
}

// 多线程 （返回的是一个promise）
RCT_EXPORT_METHOD(doSomethingExpensive:(NSString *)param callback:(RCTResponseSenderBlock)callback)
{
    dispatch_sync(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        callback(@[@"1", @"2"]);
    });
}

// 导出常量
- (NSDictionary *)constantsToExport
{
  return @{ @"firstDayOfTheWeek": @"Monday" };
}


// 如果是要求实现 发布订阅 需要这样弄
- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventReminder"];
}

// 在添加第一个监听函数时触发
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
  }
}

//这样发消息也是可以的
- (void)sendEventToJS {
    [self sendEventWithName:@"EventReminder" body:@{@"name": @"2333"}];
}

@end

//
//  RNTMapManager.m
//  AwesomeModule
//
//  Created by wcmismac020 on 2022/3/26.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>
#import "RNTMapView.h"
#import "RCTConvert+Mapkit.h"


// 定义类
@interface RNTMapManager : RCTViewManager
@end

//实现类
@implementation RNTMapManager

//定义宏标记 这个标记 能够在RNJS中使用 const RNTMap = requireNativeComponent('RNTMap');  自动把'RNTMap'解析为'RNTMapManager' RNTMapManager在RN中能够自动管理View的创建和销毁等管理类的功能
RCT_EXPORT_MODULE(RNTMap)

//定义宏标记 这个标记能够定义RNJS中的属性  <MapView zoomEnabled={false} style={{ flex: 1 }} /> 这里你需要注意的js中的类型和oc中的类型转换
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)


/**
 定义宏标记 这个标记更加复杂了
 MKCoordinateRegion是我们自己定义的类型转化函数 在 另一个文件里有具体的实现  RCTConvert_Mapkit_h
 json 代表了未解析的js原始值 null 的时候 就用 MK的OC类型 如果有值就使用MKCoordinateRegion 转换
 */
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}

// 定义宏用来控制事件 交互
RCT_EXPORT_VIEW_PROPERTY(onRegionChange, RCTBubblingEventBlock)



// 如果你学习过js 你应该对这个view方法熟悉，它就像前端的初始化函数 类初始化的时候会加载它，它返回一个View视图，
// 我们没法直接为 MKMapView 添加新的属性，所以我们只能创建一个 MKMapView 的子类用于我们自己的视图中
- (UIView *)view
{
    RNTMapView *map = [RNTMapView new];
      map.delegate = self;
      return map;
}

#pragma mark MKMapViewDelegate
// -mapView:regionDidChangeAnimated: 事件委托 方法
- (void)mapView:(RNTMapView *)mapView regionDidChangeAnimated:(BOOL)animated
{
  if (!mapView.onRegionChange) {
    return;
  }

  MKCoordinateRegion region = mapView.region;
  mapView.onRegionChange(@{
    @"region": @{
      @"latitude": @(region.center.latitude),
      @"longitude": @(region.center.longitude),
      @"latitudeDelta": @(region.span.latitudeDelta),
      @"longitudeDelta": @(region.span.longitudeDelta),
    }
  });
}

@end

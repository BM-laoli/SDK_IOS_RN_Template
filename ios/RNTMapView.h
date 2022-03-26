//
//  RNTMapView.h
//  AwesomeModule
//
//  Created by wcmismac020 on 2022/3/26.
//  Copyright © 2022 Facebook. All rights reserved.
//

#ifndef RNTMapView_h
#define RNTMapView_h


#endif /* RNTMapView_h */

#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

// 类定义 并且返回MKMapView
@interface RNTMapView: MKMapView

//需要注意的是，所有 RCTBubblingEventBlock 必须以 on 开头。然后在 RNTMapManager上声明一个事件处理函数属性，将其作为所暴露出来的所有视图的委托，并调用本地视图的事件处理将事件转发至 JS。
@property (nonatomic, copy) RCTBubblingEventBlock onRegionChange;

@end


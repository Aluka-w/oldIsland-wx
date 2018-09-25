-----小程序笔记

# 逻辑层 (js)

## 生命周期

### app.js   
  
  1. onLounch(只调用一次) -> onShow -> 依次注册好各个页面组件

### page.js

  2. onLoad(首页加载) -> onShow -> onReady

## setData更改data值

1. 用例: 
```js
  //异步操作
  this.setData({
    // 数组或者对象的属性, 必须字符串才生效, 要不然直接报错
    'object.text': '新值',
    'array[0].text': '新值'
  }, () => [
    // 更新完数据的回调
  ])
```

## 导航

1. navigateTo 只能导航到本页面的子组件内

  1. 例子的完整路径: `pages/home/tip/tip`

  1. 声明式:  `<navigator open-type="navigateTo" url='tip/tip'> 跳转页面 </navigator>`

  2. 编程式:  `wx.navigateTo({ url: 'tip/tip'})`

2. 类似的有: 

  1. 页面重定向: `wx.redirectTo` 和 `<navigator open-type="redirectTo"/>` 页面会销毁

  2. 页面返回: `wx.navigateBack` 和 `<navigator open-type="navigateBack">` 页面会销毁

  3. tab栏切换 `wx.switchTab` 和 `<navigator open-type="switchTab"/>` 

  4. 重启本页面 `wx.reLaunch` 和 `<navigator open-type="reLaunch"/>` 页面会销毁 

3. Tip

  1. navigateTo, redirectTo 只能打开非 tabBar 页面
  2. switchTab 只能打开 tabBar 页面
  3. reLaunch 可以打开任意页面

## 模块化

1. `getApp()` 获取全局的数据, 全局的数据可以在`APP()`中设置

2. commonjs规范 

  1. 导出: module.exports.sayHi = sayHi / exports.sayHi = sayHi
  2. 导入: var sayHi = require('sayHi')

## API
1. 事件监听 API:  `wx.onSocketOpen(Fn)` 回调函数, 返回值为回调函数的参数
```js
  wx.onSocketOpen(function (res) {
    console.log(res.direction)
  })
```

2. 同步 API: `wx.setStorageSync` 返回值是return出来, 有错会抛出

3. 异步 API: `wx.login` 接受参数

```js
  wx.login({
  success(res) {
    console.log(res.code)
  },
  fail() {

  }
})
```

# 视图层

## WXML

### <block/> 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。

### 数据绑定: `<view> {{message}} </view>`

  1. Mustache 语法

  2. 组件属性(需要在双引号之内), boolean 也需要`"{{true}}"`

  3. 花括号和引号之间如果有空格，将最终被解析成为字符串

  4. 拓展运算符

```js
  <template is="objectCombine" data="{{...obj1, ...obj2, e: 5}}"></template>
  Page({
    data: {
      obj1: { a: 1, b: 2 },
      obj2: { c: 3, d: 4 }
    }
  })
  // 最后是 {a: 1, b: 2, c: 3, d: 4, e: 5}
```

### 列表渲染: `<view wx:for="{{array}}" wx:for-index="idx" wx:key="idx"> {{item}} </view>`

  1. 默认直接用index 和 item

  2. 别名: wx:for-index='idx' 就是把index改成了idx

  3. wx:for="array" 遍历一个字符串, 解析出来 a, r, r, a, y

  4. 花括号和引号之间如果有空格，将最终被解析成为字符串 `wx:for="{{array}} "` => `wx:for="{{array + ''}}"`

  5. key值的`*this`代表item本身当key值 

### 条件渲染: `<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>`

  1. wx:if 和 wx:hidden   就相当于  v-if 和 v-show


### 模板

  1. 模板定义代码片段, 然后需要的地方引用, name属性代表模板

  2. 声明: `<template name="msgItem"><view>{{item}}</view></view></template>`

  3. 引用: 使用is关键字data为数据: `<template is="msgItem" data="{{...item}}"/>`

### 事件: `<view bindtap="add"> {{count}} </view>`

  1. bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡(catch事件单单只触发本身)

  2. 捕获

  3. 事件对象: 

      dataset: 里面可以以data-开头，多个单词由连字符-链接，不能有大写, 传递数据

### 引用

  1. WXML 提供两种文件引用方式import和include
    1. import

      1. `<import src="a.wxml"/>`

      2. import的作用域: 只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template 
    
    2. include

      1. include 可以将目标文件除了 `<template/>` `<wxs/>` 外的整个代码引入，相当于是拷贝到 include 位置

## WXSS

  1. rpx（responsive pixel）: 可以根据屏幕宽度进行自适应, 如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素
    
    iphone6 上才是二倍的换算

  2. 样式导入: @import语句可以导入外联样式表，@import后跟需要导入的外联样式表的相对路径

  3. 适配思路: rpx和px的抉择: font-size(px)

  4. 全局样式: 在app.wxss中定义, 组件有部分样式是不能继承全局样式: 比如font, color可以被继承, 其他不能9

    `page{font-size: 24rpx}`, 因为小程序自动在每一页加page为最外层标签

# WXS

  1. 例子

```js
  <wxs module="m1">
    var msg = "hello world";

    module.exports.message = msg;
  </wxs>

  <view> {{m1.message}} </view>
```

  2. 概念: 编写在 wxml 文件中的 <wxs> 标签内，或以 .wxs 为后缀名的文件内

  3. wxml中引用: 引用.wxs的文件的相对路径  `<wxs src="./../tools.wxs" module="tools" />`, 使用 `<view>{{tools.msg}}</view>`

  4. wxs中引用: 使用 require 函数


# 组件

## 内置组件

## 自定义组件

### 声明自定义组件

  1. 自定义组件放在components文件夹下 -> 创建的时候是创建的components而不是page -> 区别就是app.json中是找不到路径的 -> 否则引用组件时候是找不到的

  2. wxss:
  
    1. 在组件wxss中不应使用ID选择器、属性选择器和标签名选择器
  
  3. js:

    1. Component构造器: 相当于页面的Page({})

    2. properties => 相当于Vue的props

  4. wxml: 

  5. json: 

    1. `"component": true`  // 表示是组件


### 使用自定义组件的组件

  1. 在json文件中声明

  ```json
    {
  "usingComponents": {
      "你自定义的组件名": "组件的位置, 可以绝对路径也可以相对路径",
      "component-tag-name": "path/to/the/custom/component"
    }
  }
  ```
  2. 使用: 直接使用json中命名的名称

### 组件传值

  1. 


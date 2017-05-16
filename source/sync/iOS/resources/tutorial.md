
title: 实战教程
---

本文档将给出一些详尽的示例教程。

如需了解创建应用、读写数据等基础操作，请参考文档 [快速入门](/sync/iOS/quickstart.html)。


## 示例说明

本教程以弹幕为例，讲解如何通过 Wilddog Sync 实现多端实时互动。百余行代码即可完全实现该功能，可见 Sync 的简单与强大。

示例的最终的展示效果如下： 
![](/images/ios-danmu.png)

## 具体步骤

### 1. 安装 SDK 

SDK 的安装方式有两种，你可以任选其一

- **使用 CocoaPods**

要将 Wilddog SDK 导入到你的工程中，推荐使用 [CocoaPods](https://cocoapods.org/)，如果没用过 CocoaPods，请先访问 [CocoaPods getting started](https://guides.cocoapods.org/using/getting-started.html)。 

打开工程目录，新建一个 Podfile 文件

	$ cd your-project-directory
	$ pod init
	$ open -a Xcode Podfile # opens your Podfile in XCode

然后在 Podfile 文件中添加以下语句

	pod 'Wilddog'

最后安装 SDK

	$ pod install
	$ open your-project.xcworkspace

</br>
- **手动集成**
</br>
1. 下载 Sync SDK <a href="https://cdn.wilddog.com/sdk/ios/0.5.17/WilddogVideo-0.5.17.zip" id="sync_ios_d" target='_blank'>点此下载</a>。   
2. 下载 Core SDK <a href="https://cdn.wilddog.com/sdk/ios/2.0.8/WilddogCore.framework-2.0.8.zip" id="sync_core_d" target='_blank'>点此下载</a>。  
3. 把 WilddogSync.framework 和 WilddogCore.framework 拖到工程目录中。  
4. 选中 Copy items if needed 、Create Groups，点击 Finish。  
5. 点击工程文件 -> TARGETS -> General，在 Linked Frameworks and Libraries 选项中点击 '+'，将 JavaScriptCore.framework、 libsqlite3 加入列表中。

### 2. 初始化

```objectivec
//初始化 WDGApp,建议自己创建一个应用，把 danmu 换成你自己的 appID
WDGOptions *option = [[WDGOptions allosc] initWithSyncURL:@"https://danmu.wilddogio.com"];
[WDGApp configureWithOptions:option];

// 创建 WDGSyncReference 实例。 
_wilddog = [[WDGSync sync] referenceWithPath:@"message"];

```

### 3. 发送弹幕
使用写入数据的 API [childByAutoId](/sync/iOS/guide/save-data.html#追加子节点)，它用来在当前节点下生成随机子节点，以保证 key 的不重复和有序。


```objectivec
// 获取输入框的数据，将数据写入到云端 message 节点下，`childByAutoId` 将生成子节点的唯一 key
- (BOOL)textFieldShouldReturn:(UITextField*)aTextField
{    
    [[self.wilddog childByAutoId] setValue:aTextField.text];
    
    [aTextField setText:@""];
    
    return NO;
}

```
数据库中的数据结构如下图所示：
![](/images/data.jpg)

### 4. 设置监听
```objectivec
- (void)viewDidLoad 
{
    [super viewDidLoad];
    
    //初始化 WDGApp
    WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:kWilddogUrl];
    [WDGApp configureWithOptions:option];
    //获取一个指向根节点的 WDGSyncReference 实例
    _wilddog = [[WDGSync sync] reference];
    
    _snaps = [[NSMutableArray alloc] init];
    _originFrame = self.view.frame;
    
    // 设置监听
    // 绑定 WEventTypeChildAdded 事件，当 message 节点下有子节点新增时，就会触发回调，回调的 snapshot 对象包含了新增的数据
    [self.wilddog observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
        
        [self sendLabel:snapshot];
        [self.snaps addObject:snapshot];
        
    }];
    
    //添加定时器
    [NSTimer scheduledTimerWithTimeInterval:.5 target:self selector:@selector(timer) userInfo:nil repeats:YES];
}
```

### 5. 取数据
```objectivec
//随机取出弹幕数据
- (void)timer
{
    if (_snaps.count < 2) {
        return;
    }
    int index = arc4random()%(self.snaps.count-1);
    WDGDataSnapshot *snapshot = [self.snaps objectAtIndex:index];
    [self sendLabel:snapshot];
}

```

### 6. 在屏幕显示
`WDataSnapshot` 是 Sync 的一个快照，包含着正在监听的节点下，从云端取下来的数据。

```objectivec
//设置随机颜色，并显示在屏幕上
- (UILabel *)sendLabel:(WDGDataSnapshot *)snapshot
{
    float top = (arc4random()% (int)self.view.frame.size.height)-100;
    UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(self.view.frame.size.width, top, 100, 30)];
    label.textColor = [UIColor colorWithRed:arc4random()%255/255.f green:arc4random()%255/255.f blue:arc4random()%255/255.f alpha:1];
    label.text = snapshot.value;
    [UIView animateWithDuration:7 animations:^{
        label.frame = CGRectMake(-label.frame.size.width, top, 100, 30);
    }completion:^(BOOL finished){
        [label removeFromSuperview];
    }];
    [self.view addSubview:label];
    return label;
}
```



## 获取示例源码

点此获取完整的[示例源码](https://github.com/WildDogTeam/demo-ios-danmu)。




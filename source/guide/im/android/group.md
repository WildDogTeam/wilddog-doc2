title: 讨论组管理
---

本篇文章主要介绍讨论组的创建和应用。



## 创建讨论组
Wilddog IM SDK 不严格区分单聊和讨论组，创建会话时，当会话成员为 2 个时，则为单聊。当大于 2 个时则自动升级为讨论组，可通过 `-newConversationWithMembers:completion:` 来创建讨论组，目前创建的讨论组是根据成员来确定唯一性。例如，创建一个讨论组：

```
//创建会话，传入的数组中默认包含登录用户ID
[[WDGIMClient defaultClient] newConversationWithMembers:@[@"UserID1",@"UserID2",@"UserID3"] completion:^(WDGIMConversation * _Nullable conversation, NSError *__autoreleasing  _Nullable * _Nullable error) {
    //conversation 是创建成功的会话对象
}];
```

### 邀请用户加入讨论组

WDGIMConversation 的接口 `-addMembers:completion:` 可以拉用户进入讨论组，讨论组内任何人都可以邀请用户，且无需同意。例如：

```
// 邀请用户入讨论组
[conversation addMembers:@[@"UserID4",@"UserID5"] completion:^(NSError * _Nullable error) {
        
}];
```
 
### 删除讨论组成员

WDGIMConversation 的接口 `-removeMembers:completion:` 可以删除讨论组成员，只有群主可以删除讨论组成员，群主为创建会话的用户。另外用户自己可以删除自己，意思就是退出讨论组。例如：

```
// 删除讨论组成员
[conversation removeMembers:@[@"UserID4",@"UserID5"] completion:^(NSError * _Nullable error) {
        
}];
```

### 获取讨论组成员列表

用 `members` 属性可以获取讨论组成员列表，任何讨论组成员都有权限调用此方法。例如：

```
NSArray *members = conversation.members;
```

### 获取讨论组变更消息

当讨论组内有成员变更时，通过 WDGIMClient 的协议方法可以监听获取讨论组变更消息。例如：

```objc
- (void)wilddogClient:(WDGIMClient *)client didGroupInfoChange:(NSArray<WDGIMMessageGroupTips *> *)groupTips
{
    for (WDGIMMessageGroupTips *tip in groupTips) {
        switch (tip.groupTipType) {
                
                //用户加入讨论组通知
            case WDGIMGroupTipsTypeJoin:
                break;
                
                //用户退出讨论组通知
            case WDGIMGroupTipsTypeQuit:
                break;
                
                //用户被踢出讨论组通知
            case WDGIMGroupTipsTypeRemove:
                break;
                
            default:
                break;
        }
    }
}	
```

 
 
title: 讨论组管理
---

本篇文档介绍讨论组的创建和权限管理。

## 创建讨论组
Wilddog IM SDK 不严格区分单聊和讨论组，创建会话时，当会话成员为 2 个时，则为单聊。当大于 2 个时则自动升级为讨论组。
`-newConversationWithMembers:completion:` 用于创建讨论组。
例如，创建一个讨论组：

```
// 创建会话，传入的数组中默认包含登录用户 ID
[[WDGIM im] newConversationWithMembers:@[@"UserID1",@"UserID2",@"UserID3"]
                                             completion:^(WDGIMConversation * _Nullable conversation, NSError *__autoreleasing  _Nullable * _Nullable error) {
                                                 //conversation 是创建成功的会话对象
}];
```

## 邀请用户加入讨论组

`WDGIMConversation` 的接口 `-addMembers:completion:` 用于拉用户进入讨论组。
讨论组内任何人都可以邀请用户加入，且无需对方同意。
例如，邀请两个用户进入讨论组：

```
// 邀请用户入讨论组
[conversation addMembers:@[@"UserID4",@"UserID5"] completion:^(NSError * _Nullable error) {
        
}];
```
 
## 删除讨论组成员

`WDGIMConversation` 的接口 `-removeMembers:completion:` 用于删除讨论组成员。
只有创建讨论组的用户可以删除其他讨论组成员。用户在讨论组中删除自己可以退出讨论组。
例如，删除两个讨论组成员：
```
// 删除讨论组成员
[conversation removeMembers:@[@"UserID4",@"UserID5"] completion:^(NSError * _Nullable error) {
        
}];
```

## 获取讨论组成员列表

`members` 属性用于获取讨论组成员列表：

```
NSArray *members = conversation.members;
```
<blockquote class="notice">
  <p><strong>提示：</strong></p>
  任何讨论组成员都有权限调用此方法。
</blockquote>


## 获取讨论组变更消息

当讨论组内有成员变更时，通过 `WDGIM` 的协议方法可以监听获取讨论组变更消息：

```objc
- (void)wilddogIM:(WDGIM *)im didGroupInfoChange:(NSArray<WDGIMMessageGroupTips *> *)groupTips
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

 
 
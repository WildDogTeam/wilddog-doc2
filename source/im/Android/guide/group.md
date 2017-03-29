title: 讨论组管理
---

本篇文档介绍讨论组的创建和权限管理。



## 创建讨论组
Wilddog IM SDK 不严格区分单聊和讨论组，创建会话时，当会话成员为 1 个时，则为单聊。当大于 1 个时则自动升级为讨论组。
`newConversation(List<String> members,CompletionListener completionListener)` 用于创建讨论组。
例如，创建一个讨论组：

```java
//创建会话，传入的数组中默认包含登录用户ID
List<String> ids = new ArrayList<>();
ids.add("uid1");
ids.add("uid2");
ids.add("uid3");
WilddogIM.newConversation(ids, new WilddogIMClient.CompletionListener() {
     @Override
     public void onComplete(WilddogIMError error, Conversation wilddogConversation) {
          if(error==null){
           }else {
           }
      }
});

```

### 邀请用户加入讨论组

`Conversation` 的接口 `addMember(List<String> members)` 用于拉用户进入讨论组。
讨论组内任何人都可以邀请用户加入，且无需对方同意。
例如，邀请两个用户进入讨论组：

```java
// 邀请用户入讨论组
List<String> members = new ArrayList<>();
ids.add("uid4");
ids.add("uid5");
conversation.addMember(members);
```
 
### 删除讨论组成员

`Conversation` 的接口 `removeMember(List<String> members)` 用于删除讨论组成员。
只有创建讨论组的用户可以删除其他讨论组成员。用户在讨论组中删除自己可以退出讨论组。
例如，删除两个讨论组成员：
```java
// 删除讨论组成员
List<String> removeList = new ArrayList<>();
ids.add("uid4");
ids.add("uid5");
 conversation.removeMember(removeList);
```

### 获取讨论组成员列表

`getMembers()` 方法用于获取讨论组成员列表：
```java
List<String> members=getMembers();
```
<blockquote class="notice">
  <p><strong>提示：</strong></p>
  任何讨论组成员都有权限调用此方法。
</blockquote>


### 获取讨论组变更消息

当讨论组内有成员变更时，通过 `WilddogIM` 的协议方法可以监听获取讨论组变更消息：

```java
client.addGroupChangeListener(
      new WilddogIM.WilddogIMGroupChangeListener() {
               @Override
               public void memberJoined(String groupId, String owner, List<String> joinedUsers) {
               Log.d("groupMemberChange","memberJoined");
               }

               @Override
               public void memberQuit(String groupId, String quitUser) {
               Log.d("groupMemberChange","memberQuit");
               }

               @Override
               public void memberRemoved(String groupId, List<String> removeUsers) {
               Log.d("groupMemberChange","memberRemoved");
               }
});
```

 
 
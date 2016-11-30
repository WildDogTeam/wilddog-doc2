title: WilddogIMClient.WilddogIMGroupChangeListener
---
群成员变化的回调。

## 方法

### void memberJoined(groupId,owner, joinedUsers)

**定义**

```java
 void memberJoined(String groupId, String owner, List<String> joinedUsers);
```

**说明**

成员加入的接口回调。


**参数**


参数名 | 描述
--- | ---
groupId | 有成员加入的会话的id
owner | 会话成员添加的操作者。
joinedUsers | 会话成员被添加的成员uid的列表。

</br>

--- 

### void memberQuit(groupId,quitUser);

**定义**

```java
void memberQuit(String groupId,String quitUser);
```

**说明**

成员退出的接口回调。


**参数**


参数名 | 描述
--- | ---
groupId | 有成员退出的会话的id
quitUser | 退出成员Id。

</br>

--- 
### void memberRemoved(groupId,removeUsers);

**定义**

```java
void memberRemoved(String groupId ,List<String> removeUsers);
```

**说明**

成员被移除的回调接口。


**参数**


参数名 | 描述
--- | ---
groupId | 有成员被移除的会话的id
removeUsers | 被移除的成员列表。

</br>

--- 
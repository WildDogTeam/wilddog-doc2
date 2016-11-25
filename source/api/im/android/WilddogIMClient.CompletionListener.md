title: WilddogIMClient.CompletionListener
---
创建会话的回调。

## 方法

### onComplete(error,wilddogConversation)

**定义**

```java
void onComplete(WilddogIMError error, Conversation wilddogConversation);
```

**说明**

成功可以获取到创建的Conversation对象，失败获取错误信息。


**参数**


参数名 | 描述
--- | ---
error | 创建会话失败的错误信息
wilddogConversation | 创建成功的Conversation对象。

</br>

--- 
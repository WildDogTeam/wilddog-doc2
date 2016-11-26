title: 消息收发
---

本篇文档介绍 Wilddog IM SDK 的消息收发和会话操作。


## 发送消息

发送消息前需要先创建会话和消息体。

###  创建会话

会话是指面向一个人或者一个群组的对话，发消息时需要先获取会话。
使用 `newConversation(List<String> members,CompletionListener completionListener)` 方法获取会话，比如创建一个单聊会话：

```java
List<String> ids = new ArrayList<>();
ids.add("uid1");
WilddogIMClient.newConversation(ids, new WilddogIMClient.CompletionListener() {
     @Override
     public void onComplete(WilddogIMError error, Conversation wilddogConversation) {
          if(error==null){
          // 创建会话失败
           }else {
         // 创建会话成功
           }
      }
});

```

### 创建文本消息

`Message.newMessage（String text）` 方法用于创建文本消息：

```java
TextMessage textMessage = Message.newMessage("Hi,Wilddog!");
```

### 创建图片消息

`Message.newMessage( int messageType,String path)` 方法用于创建图片消息：

```java
// 创建图片消息
String path = "imagePath";
ImageMessage imageMessage = Message.newMessage( MessageType.IMAGE, path);
```

### 创建语音消息

`Message.newMessage(int duration,byte[] fileData);` 方法用于创建语音消息：

```java
// 创建语音消息
int duration ="语音消息时间长度";
byte[] fileData = "生成语音二进制数据";
VoiceMessage voiceMessage = Message.newMessage(duration,fileData);
```

### 发送消息：

`sendMessage(Message message, final WildValueCallBack callBack)` 方法用于发送一条消息：

```java
// 回调中可以获取消息的发送状态
TextMessage textMessage = Message.newMessage("Hi,Wilddog!");
 conversation.sendMessage(textMessage, new WildValueCallBack<String>() {
            @Override
            public void onSuccess(String s) {
                Log.d(TAG,"发送成功");
            }

            @Override
            public void onFailed(int code, String des) {
             Log.d("result",des);

            }
        });

```

## 接收消息

新消息通知会在 `onNewMessage（）` 方法中回调给用户。


#### 注册监听

在 SDK 初始化时设置消息接收代理：

```java 
client.addMessageListener(listener);
```
	
#### 消息解析

`WilddogIMClient.WilddogIMMessageListener` 的 `onNewMessage（）` 方法用于获取 messages 中所有新的聊天消息：


```java
private WilddogIMClient.WilddogIMMessageListener listener=new WilddogIMClient.WilddogIMMessageListener() {
    @Override
    public void onNewMessage(List<com.wilddog.wildim.message.Message> messages) {
        for(com.wilddog.wildim.message.Message wildMessage:messages){
            switch (message.getMessageType()) {

            case TEXT:
            //文本消息
            TextMessage textMessage = (TextMessage)message;

            case IMAGE:
            //图片消息
            ImageMessage imageMessage = (ImageMessage)message;

            case VOICE:
            //语音消息
            VoiceMessage voiceMessage = (VoiceMessage)message;

           }
        }
    }
};
```

### 消息删除

`delete()` 方法用于删除本地消息：

```java
   message.delete();
```


## 消息属性

### 消息状态

Message 的 status（） 方法用于获取当前消息的状态，如发送中、发送成功和发送失败等。

三种状态在 MessageStatus 枚举中：


```java
public class  MessageStatus {

    public static final String SENDING="1";
    public static final String SUCCESS="2";
    public static final String FAILED="3";
}

```

### 消息时间

 `getSendAt（）` 方法用于获取到消息的发送时间：


```java
  long sendAt = textMessage.getSendAt();
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  该时间是服务器时间，而非本地时间。
</blockquote>


### 消息 ID

消息 ID 是由服务器统一生成的有序 ID:

```java
	String messageId = textMessage.getMessageId();
```
	
### 消息发送者

```java
	String senderId = textMessage.getSender();
```

#### 消息删除

删除消息只支持本地消息删除，调用 `delete()` 方法来删除。

```java
   textMessage.delete()
```

##  会话操作

### 获取所有会话

`getConversations()` 方法用于获取本地所有会话列表:

```java
	List<Conversation> conversations = client.getConversations();
```


### 获取会话本地消息

`Conversation` 中的 `getMessagesFromLast( lastMessage,limit)` 方法用于获取本地历史消息，并可以实现分页拉取(从后往前获取)：

```java
  List<Message> messages = conversation.getMessagesFromLast( lastMessage,20);
```

### 删除会话

`Conversation` 中的 `delete()` 方法用于删除会话：
```java
	 conversation.delete();
```
 <blockquote class="notice">
  <p><strong>提示：</strong></p>
  删除会话的同时，默认会删除本地会话的相关消息。
</blockquote>
 
title: 消息收发
---

本篇文章主要介绍 Wilddog IM SDK 的消息收发和会话操作。


## 发送消息

1.会话获取

会话是指面向一个人或者一个群组的对话，发消息时首先需要先获取会话，会话的获取通过 `-newConversationWithMembers:completion` 方法来实现，比如创建一个单聊会话：

```java
[[WDGIMClient defaultClient] newConversationWithMembers:@[@"WilddogUserId"] completion:^(WDGIMConversation * _Nullable conversation, NSError *__autoreleasing  _Nullable * _Nullable error) {
   //...
}];

```

2.创建文本消息

WDGIMConversation 会话创建成功后，可以通过 `-sendMessage:completion:` 方法来发送消息。例如，发送一个文本消息：

```java
TextMessage textMessage = Message.newMessage("Hi,Wilddog!");
```

3.创建图片消息

图片消息由 WDGIMMessageImage 定义，它是 WDGIMMessage 的一个子类。
 
```java
// 创建图片消息
String path = "imagePath";
ImageMessage imageMessage = Message.newMessage( MessageType.IMAGE, path);
```

 创建语音消息

语音消息由 WDGIMMessageVoice 定义，它是 WDGIMMessage 的一个子类。
 
```java
// 创建语音消息
int duration ="语音消息时间长度";
byte[] fileData = "生成语音二进制数据";
VoiceMessage voiceMessage = new VoiceMessage(duration,fileData);
```

#### 发送消息：

结合以上方法，就可以发送信息：

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

接收消息需要调用 WilddogIMClient 中的代理方法 `addMessageListener（）` ，如果用户是登录状态，SDK 会通过此回调方法收到新消息。

#### 注册监听

设置代理之后，用实例方法注册监听

```java 
client.addMessageListener(listener);
```
	
#### 消息解析

实现 WilddogIMClient.WilddogIMMessageListener  的 `onNewMessage（）` 方法，从 messages 集合中能获取所有的新的聊天消息。

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

## 消息属性

1.消息状态

通过 Message 的 `status（）` 方法可以获取当前消息的状态，如发送中、发送成功、发送失败和删除，对于删除的消息，需要 UI 判断状态并隐藏。

四种状态在 MessageStatus 类中：

```java
public class  MessageStatus {

    public static final String SENDING="1";
    public static final String SUCCESS="2";
    public static final String FAILED="3";
    public static final String DELETED="0";
}

```

2.消息时间

通过 Message的`getSendAt（）` 方法可以获取到消息的发送时间。该时间是服务器时间，而非本地时间。

```java
   textMessage.getSendAt()
```

#### 消息 ID

消息 ID 是由服务器统一生成的有序 ID。
```java
	textMessage.getMessageId()
```
	
#### 消息发送者
```java
	String senderId = textMessage.getSender()
```	
#### 消息删除

删除消息只支持本地消息删除，调用 `delete()` 方法来删除。

```java
   textMessage.delete()
```

##  会话操作

#### 获取所有会话

调用 `getConversations()` 方法可以获取本地所有会话列表，例如：
```java
	List<Conversation> conversations = client.getConversations();
```	
#### 获取会话本地消息

通过 Conversation 中的 `getMessagesFromLast()` 方法可以获取本地历史消息，可以实现分页拉取。此方法为同步方法，例如:
```java
  List<Message> messages = conversation.getMessagesFromLast( lastMessage,20)
```	
#### 删除会话

通过 Conversation 中的 `delete()` 方法删除会话。删除会话的同时，默认会删除本地会话的相关消息。
```java
	 conversation.delete();
```
 
 
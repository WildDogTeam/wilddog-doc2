title: MeetingCastStateListener
---

<span id="MeetingCastStateListener" />

会话直播状态监听。

## 方法

### onCastUp(String, Map<String,String >)




**定义**   

void onCastUp(String castUid, Map<String,String > urlMap)

**说明**

启用直播功能后,成功发布直播流后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|castUid|String,当前正在直播的流的发布者 Widdog ID|
|urlMap|Map<String,String>,直播地址,包含 rtmp 和 hls 两种类型的直播地址,rtmp地址 key 值为 "rtmp", hls地址 key 值为 "hls"|


<span id="onCastUp" />
**示例**

```java
	meetingCastAddon = client.getMeetingCastAddon(mConversation, new MeetingCastStateListener() {
        @Override
        public void onCastUp(String castUid, Map<String, String> urlMap) {

        }

        @Override
        public void onCastChange(String castUid) {

        }

        @Override
        public void onCastDown() {

        }

        @Override
        public void onError(String message) {

        }
    });
```

**** 

### onCastChange(String)



**定义**   

void void onCastChange(String castUid)


**说明**
开始直播后,切换直播中的视频流操作后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|castUid|String,当前正在直播的流的发布者 Widdog ID|


**示例**

参照[onCastUp 示例](/api/video/android/meeting-cast-listener.html#onCastUp)

**** 

### onCastDown()



**定义**   

void onCastDown()

**说明**

结束直播后触发。

**示例**

参照[onCastUp 示例](/api/video/android/meeting-cast-listener.html#onCastUp)

**** 

### onError(String)



**定义**   

void onError(String message)

**说明**

直播操作出现错误时调用。

**参数**

| 参数名 | 描述 |
|---|---|
|message|String,直播操作发生错误的详细信息|



**示例**

参照[onCastUp 示例](/api/video/android/meeting-cast-listener.html#onCastUp)

****

title: WilddogVideoClient
---

每个 WilddogVideo SDK 客户端全局只存在唯一单例 `WilddogVideoClient` 对象。根据不同的场景，用户可以使用 `connectToConference()` 方法进行多对多视频会议。

## 方法

### start()

**定义**   

```java
void start()
```

**说明**

开始使用 `WilddogVideoClient` 对象，在每次调用 `WilddogVideo.getClient()` 方法获取到 `WilddogVideoClient` 对象后，需要调用 `start()` 方法。

**示例**

```java
    //获取client对象
    client = video.getClient();
    client.start();
```

</br>

---


### connectToConference(String, ConnectOptions, Conference.Listener)

**定义**   

```java
public Conference connectToConference(String conferenceId, ConnectOptions options, Conference.Listener listener)
```

**说明**

加入会议，异步返回会议对象，在 'Conference.Listener' 回调中返回会议状态。

**参数**

| 参数名 | 描述 |
|---|---|
|conferenceId|要加入的 Conference ID ,唯一标识加入的会议|
|options|[ConnectOptions](/conference/Android/api/connect-options.html) 对象,提供邀请加入会议相关参数|
|listener|[Conference.Listener](/conference/Android/api/conference-listener.html) 视频会议回调，返回会议相关状态，在回调方法中处理会议连接/连接失败/断连/用户加入/用户离开等事件|

**返回值**

[Conference](/conference/Android/api/conference.html)

**示例**

```java
	ConnectOptions options = new ConnectOptions(localStream, <用户自定义数据>);
	Conference conference = client.connectToConference(conferenceId, options, new Conference.Listener() {
            @Override
            public void onConnected(Conference conference) {
                Log.e(TAG, "onConnected:" + conference);
            }

            @Override
            public void onConnectFailed(Conference conference, VideoException exception) {
                Log.e(TAG, "onConnectFailed:" + exception);
            }

            @Override
            public void onDisconnected(Conference conference, VideoException exception) {
                Log.e(TAG, "onDisconnected:" + exception);
            }

            @Override
            public void onParticipantConnected(Conference conference, final Participant participant) {
                Log.e(TAG, "onParticipantConnected:" + participant.getParticipantId());
            }

            @Override
            public void onParticipantDisconnected(Conference conference, Participant participant) {
                Log.e(TAG, "onParticipantDisconnected:" + participant.getParticipantId());
            }
        });

```

</br>
---

### dispose()

**定义**   

```java
public void dispose()
```

**说明**

释放 WilddogVideoClient 持有的资源。


**示例**

```java
        client.dispose();

```


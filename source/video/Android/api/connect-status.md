title: ConnectStatus
---

视频通话和视频会议状态枚举,表示当前通话或会议状态。

## 常量

### ConnectStatus

**定义**

```java
enum  ConnectStatus {CONNECTING, CONNECTED, DISCONNECTED }

```

**说明**

视频通话和视频会议状态枚举,表示当前通话或会议状态。，共有三种状态 `CONNECTING`，`CONNECTED`，`DISCONNECTED`。

**参数**

参数名 | 描述
--- | ---
CONNECTING | 建立新通话或会议时，状态为 `CONNECTING`。
CONNECTED | 当本地参与者与远端成功建立连接时，状态转为 `CONNECTED`。
DISCONNECTED | 本地参与者与远端参与者的连接断开时，状态转为 `DISCONNECTED`。


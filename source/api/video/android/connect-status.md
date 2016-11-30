title: ConnectStatus
---

会话状态枚举,表示当前会话状态。

## 常量

### ConnectStatus

**定义**

```java
enum  ConnectStatus {CONNECTING, CONNECTED, DISCONNECTED }

```

**说明**

会话状态枚举,表示当前会话状态，共有三种状态 `CONNECTING`，`CONNECTED`，`DISCONNECTED`。

**参数**

参数名 | 描述
--- | ---
CONNECTING | 建立新会话时，会话的状态为 `CONNECTING`。
CONNECTED | 当本地参与者与远端成功建立连接时，会话状态转为 `CONNECTED`。
DISCONNECTED | 本地参与者与远端参与者的连接断开时，会话状态转为 `DISCONNECTED`。


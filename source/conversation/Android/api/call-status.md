title: CallStatus
---

视频通话状态枚举,表示当前呼叫状态。

## 常量

### CallStatus

**定义**

```java
enum  CallStatus {ACCEPTED, REJECTED, BUSY,TIMEOUT }

```

**说明**

视频通话呼叫状态的枚举,有以下四种状态`ACCEPTED`,`REJECTED`,`BUSY`,`TIMEOUT`。

**参数**

参数名 | 描述
--- | ---
ACCEPTED | 当对方接受时,状态为 `ACCEPTED`。
REJECTED | 当对方拒绝接受时,状态转为 `REJECTED`。
BUSY | 当对方已经在呼叫中或者视频通话中,状态转为 `BUSY`。
TIMEOUT | 当呼叫对方超时,状态转为 `TIMEOUT`。


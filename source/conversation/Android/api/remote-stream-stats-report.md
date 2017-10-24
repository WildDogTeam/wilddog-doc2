title: RemoteStreamStatsReport
------------------------------

对端视频流统计信息。



## 属性

### getUserId()

**定义**   

```java
String getUserId()
```
**说明**
统计信息对应的用户 ID。

**返回值**

用户 ID。

</br>

---

### getWidth()

**定义**   

```java
int getWidth()
```
**说明**
视频的宽度，以像素为单位。在一对一视频通话过程中此数据会根据视频画面大小的自适应调整而改变。

**返回值**

视频画面宽度。

</br>

---

### getHeight()

**定义**   

```java
int getHeight()
```
**说明**
视频的高度，以像素为单位。在一对一视频通话过程中此数据会根据视频画面大小的自适应调整而改变。

**返回值**

视频画面高度。

</br>

---

### getFps()

**定义**   

```java
int getFps()
```
**说明**
视频帧率，在传输过程中帧率会根据采集情况/当前网络情况等不断变化。

**返回值**

视频帧率。

</br>

---

### getBytesReceived()

**定义**   

```java
long getBytesReceived()
```


**返回值**

已接收的对端视频流字节数。

</br>

---

### getBitsReceivedRate()

**定义**   

```java
int getBitsReceivedRate()
```
**说明**
对端视频流的接收速率，以 kbps 为单位。

**返回值**

对端视频流发送速率。

</br>

---

### getDelay()

**定义**   

```java
int getDelay()
```
**说明**
对端视频的延迟，以毫秒为单位。。

**返回值**

对端视频延迟时间。

title: LocalStreamStatsReport
-----------------------------

本地视频流统计信息。



## 属性

### getWidth()

**定义**   

```java
int getWidth()
```
**说明**
视频的宽度，以像素为单位。

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
视频的高度，以像素为单位。

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

### getBytesSent()

**定义**   

```java
long getBytesSent()
```


**返回值**

本地视频流已发送的字节数。

</br>

---

### getBitsSentRate()

**定义**   

```java
public int getBitsSentRate()
```
**说明**
本地视频流的发送速率，以 kbps 为单位。

**返回值**

本地视频流发送速率。



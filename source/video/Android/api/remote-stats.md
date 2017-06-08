title: LocalStats
---

对端视频流统计信息。



## 属性

### getId()

**定义**   

```java
public String getId()
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
public int getWidth()
```
**说明**
视频的宽度，以像素为单位。在视频通话过程中此数据会根据视频画面大小的自适应调整而改变。

**返回值**

视频画面宽度。

</br>

---

### getHeight()

**定义**   

```java
public int getHeight()
```
**说明**
视频的高度，以像素为单位。在视频通话过程中此数据会根据视频画面大小的自适应调整而改变。

**返回值**

视频画面高度。

</br>

---

### getFps()

**定义**   

```java
public int getFps()
```
**说明**
视频帧率，在传输过程中帧率会根据采集情况/当前网络情况等不断变化。

**返回值**

视频帧率。

</br>

---

### getRxBytes()

**定义**   

```java
public long getRxBytes()
```


**返回值**

已接收的对端视频流字节数。

</br>

---

### getRxBitRate()

**定义**   

```java
public int getRxBitRate()
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
public int getDelay()
```
**说明**
对端视频的延迟，以毫秒为单位。。

**返回值**

对端视频延迟时间。

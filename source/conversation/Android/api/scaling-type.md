title: ScalingType 
---

视频在UI控件上显示的样式。

## 常量

### ScalingType

**定义**

```java
enum ScalingType { SCALE_ASPECT_FIT, SCALE_ASPECT_FILL, SCALE_ASPECT_BALANCED;}

```

**说明**

视频在UI控件上显示的样式,有以下三种状态`SCALE_ASPECT_FIT`,`SCALE_ASPECT_FILL`,`SCALE_ASPECT_BALANCED`。

**参数**

参数名 | 描述
--- | ---
SCALE_ASPECT_FIT | 在保持纵横比的前提下，缩放图片，使视频在容器内都显示出来。
SCALE_ASPECT_FILL | 在保持纵横比的前提下，缩放图片，使视频充满容器。
SCALE_ASPECT_BALANCED | 平衡调整,使视频在容器中显示出来。



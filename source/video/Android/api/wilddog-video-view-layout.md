title: WilddogVideoViewLayout
---

视频流展示控件容器，继承Android.ViewGroup。
使用时将 `WilddogVideoView` 包裹在 `WilddogVideoViewLayout` 中，可以实现多窗口显示多个视频流功能。

**示例**

在Activity的布局文件中：

```
<RelativeLayout
        android:id="@+id/views"
        android:layout_width="match_parent"
        android:layout_height="320dp">
        <com.wilddog.video.WilddogVideoViewLayout
            android:id="@+id/local_video_layout"
            android:layout_width="match_parent"
            android:layout_height="match_parent">

            <com.wilddog.video.WilddogVideoView
                android:id="@+id/local_video_view"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>

        </com.wilddog.video.WilddogVideoViewLayout>

</RelativeLayout>
```


## 方法

### setPosition(int，int，int，int)

**定义**   

```java
public void setPosition(int xPercent, int yPercent, int widthPercent, int heightPercent)
```

**说明**

设置控件的位置与大小。

**参数**

| 参数名 | 描述 |
|---|---|
|xPercent|控件左上角横坐标起始位置，数值为 1-100 的正整数，代表起始位置与父控件宽度的百分比|
|yPercent|控件左上角纵标起始位置，数值为 1-100 的正整数，代表起始位置与父控件高度的百分比|
|widthPercent|控件宽度，数值为 1-100 的正整数，代表宽度与父控件宽度的百分比|
|heightPercent|控件高度，数值为 1-100 的正整数，代表高度与父控件高度百分比|


**示例**

```java
    //父控件左上角为原点，设置控件的位置起始坐标为(0,0),控件宽占父控件的50%，高占父控件50%
    localRenderLayout.setPosition(0,0, 50, 50);

```

</br>

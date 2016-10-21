
title: wilddog.video.Addons
---

提供野狗实时视频服务所有插件的初始化接口。

## 方法

### initMeetingCast

**定义**

```js
initMeetingCast(conversation)
```

**说明**

初始化一个 MeetingCast 插件。该插件可用于直播 Conversation 中的任意一个参与者的媒体流。可以随时切换参与者或关闭直播。

**参数**

| 参数名 | 说明 |
|---|---|
| conversation | [wilddog.video.Conversation](/api/video/web/conversation.html) 类型。需要使用 MeetingCast 服务的 `wilddog.video.Conversation` 类型对象。 |

**返回**

`Promise.`<[wilddog.video.addons.MeetingCast](/api/video/web/meetingCast.html)>

**示例**

```js
//获取 MeetingCast 对象
var meetingCast = client.addons.initMeetingCast(conversation);
```


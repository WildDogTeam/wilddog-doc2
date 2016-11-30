
title: 错误码
---

| 错误码 | 错误信息 |描述 |
| --- | ----- | ------ |
| 40001 | VIDEO_INVALID_ARGUMENT | 输入参数无效。 |
| 40002 | VIDEO_DEVICE_NOT_AVAILABLE | 获取设备失败（权限不足）。 |
| 40100 | VIDEO_CLIENT_REGISTRATION_FAILED | Client初始化失败，Video 功能未开启。 |
| 40101 | VIDEO_INVALID_AUTH_ARGUMENT | Client初始化失败，Auth token 过期。 |
| 40102 | VIDEO_INVALID_SYNC_ARGUMENT | Client初始化失败，Sync 对象无效。 |
| 40103 | VIDEO_INVALID_STREAM_STATE | 媒体流无效。 |
| 40104 | VIDEO_INVALID_CONVERSATION_MODE | 无法使用该模式，未开启该模式。 |
| 40200 | VIDEO_TOO_MANY_PARTICIPANTS | 会议人数超过上限。 |
| 40201 | VIDEO_CONVERSATION_INVITATION_FAILED | 视频通话邀请发起失败。 |
| 40202 | VIDEO_CONVERSATION_INVITATION_REJECTED | 视频通话邀请被拒绝。 |
| 40203 | VIDEO_CONVERSATION_INVITATION_IGNORED | 被邀请者未处理邀请。 |
| 40204 | VIDEO_PARTICIPANT_CONNECTION_FAILED | 无法与参与者建立连接。 |
| 40205 |	VIDEO_TOO_MANY_ACTIVE_CONVERSATIONS | 视频通话或视频会议数超过上限。 |
| 40310 | VIDEO_MEETINGCAST_REGISTRATION_FAILED | MeetingCast 初始化失败，未在控制面板中开启功能。 |
| 40311 | VIDEO_MEETINGCAST_START_FAILED | MeetingCast 操作冲突，当前已经开启 MeetingCast 。 |
| 40312 | VIDEO_MEETINGCAST_SWITCH_FAILED | MeetingCast 切换参与者失败，未开启 MeetingCast 或切换失败。 |
| 40313 | VIDEO_MEETINGCAST_STOP_FAILED | MeetingCast 关闭直播失败，未开启 MeetingCast 或关闭失败。 |

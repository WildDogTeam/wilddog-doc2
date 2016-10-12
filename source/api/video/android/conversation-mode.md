title: ConversationMode
---

<span id="ConversationMode" />


会话模式类型枚举,目前支持两种类型的会话：P2P,SERVER_BASED。

## Constants

### P2P

基础会话类型,采用 P2P(point to point) 连接方式。
P2P模式不支持直播流操作。

**** 

### SERVER_BASED

采用 P2S（point to server) 连接方式,视频流通过中转服务器中转,使用此模式需要在控制面板中开启视频中转功能。
SERVER_BASED模式支持直播流操作。

**** 

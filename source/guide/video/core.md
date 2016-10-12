
title: 基础概念
---

## Client

Client 可以发起或加入 Conversation，和其他 Client 进行视频通话。

## Conversation

Conversation 即一对一或多人会话，Participant（参与者）可在会话中分享音视频数据。

Conversation 分为 P2P 和 Server-based 两种类型：

*    P2P : 使用点对点的传输方式，音视频数据直接在客户端之间传输，能极大的降低带宽成本，支持超高清设备，并保证通话的隐私安全。但 P2P 模式对客户端的带宽要求较高，建议一个会话内不要超过 4 个客户端。

*    Server-based : 使用服务器中转的传输方式，音视频数据通过服务器中转进行传输。独有的视频直播推流功能，多种编解码格式间的转换，以及支持更多终端设备同时通信，保证了更稳定的音视频能力。

## Participant

Participant，即会话中的其他参与者（其他 Clients）。同一个会话的 Clients 间可以互相分享视频和音频流。

## Local Stream

本地媒体流。开发者可以管理本地媒体流。

## Remote Stream

其他客户端的媒体流。开发者可以控制其他客户端在本地的音视频效果。例如，本地可以静音其他客户端的媒体流，但这并不会影响其他客户端音视频数据的传输。

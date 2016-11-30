title: 视频通话
---

本篇文档介绍在开发视频通话时的主要环节，包括创建视频通话、管理其他参与者和加入视频通话相关。

## 创建视频通话

创建视频通话包括配置和预览本地媒体流、发起视频通话。

### 配置和预览本地媒体流

本地媒体流 ([LocalStream](/api/video/ios/Classes/WDGVideoLocalStream.html)) 包括音频和视频，发起视频通话前需要配置其属性，视频通话创建成功后该媒体流会发给其他参与者。

例如，创建一个只有视频且分辨率为 640X480 的流，并展示到页面上：

```objectivec

```


配置成功后，可以在加入视频通话前预览本地画面。

例如，创建一个同时有音频和视频的本地媒体流并展示出来：

```objectivec

```

### 发起视频通话

只有另一个 [Client](/api/video/web/wilddogVideoClient.html) 接受了一方的邀请，通话才能建立成功。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  视频通话使用实时数据库中的 `/wilddogVideo` 节点进行信令交互，为避免影响视频通话功能的使用，请勿操作该节点。
</blockquote>


例如，发起一对一视频通话：

```objectivec

```

## 管理其他参与者

管理其他参与者包括处理其他参与者的连接事件和播放其他参与者的媒体流。


### 处理其他参与者的连接事件

通过监听其他参与者加入或离开的事件，来获得其状态通知。

例如，打印加入、离开及加入失败的日志：

```objectivec

```

### 播放其他参与者的媒体流

通过展示其他参与者的视频流来观看其视频画面。

例如，当监听到参与者加入会话时展示参与者的媒体流：

```objectivec

```

## 加入会话相关

加入会话相关包括接受或拒绝邀请、离开视频通话。

### 接受或拒绝邀请

初始化 Client 之后，监听邀请事件接收另一个 Client 发起的会话邀请，收到邀请后可以选择接受或拒绝邀请。

例如，收到邀请后，接受邀请：

```objectivec

```

### 离开会话

离开一个正在进行的会话并释放媒体资源。可以直接释放媒体资源或通过监听离开会话事件在成功离开会话后释放媒体资源。

例如，断开会话并释放不使用的资源：

```objectivec

```

## 数据安全性

### 保护信令交互的安全

视频通话使用实时数据库中的 `/wilddogVideo` 节点进行信令交互，为保护数据安全，可以针对该节点配置规则表达式。

规则表达式设置页面如下：

<img src="/images/video_guide_rule.png" alt="video_guide_rule">

例如，对 `wilddogVideo` 节点配置规则表达式，保证信令只被交互双方读写：

```json
{
  "rules": {
    "wilddogVideo": {
      "conversations": {
        "$cid": {
          "users": {
            ".read": "auth != null",
            "$user": {
              ".write": "$user == auth.uid"
            }
          },
          "messages": {
            "$signalMail": {
              ".write": "$signalMail.startsWith(auth.uid)",
              ".read": "$signalMail.endsWith(auth.uid)"
            }
          }
        }
      },
      "invitations": {
        "$user": {
          ".read": "auth.uid == $user",
          "$invite": {
            ".write": "$invite.startsWith(auth.uid)||$invite.endsWith(auth.uid)",
            ".read": "$invite.startsWith(auth.uid)||$invite.endsWith(auth.uid)"
          }
        }
      }
    }
  }
}
```

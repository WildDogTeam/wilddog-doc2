title: 媒体插播
---


多人视频通话支持用户上传本地音视频文件至野狗通信云的音视频服务器，我们会对上传的音视频文件进行转码。转码完成后的文件则可以进行插播。

我们提供了插播相关的REST API, 共五个接口

  - 文件上传
  - 文件查询
  - 文件删除
  - 发起插播
  - 控制插播，可控制插播的播放\暂停\重播\结束

通过调用rest api，用户可以上传、查询、删除自己的文件，针对上传成功的文件发起插播，插播过程中可以控制插播，包括暂停、继续、重播、关闭。




## 文件上传

**URL**

```
https://bt-sh-api.wilddog.com/v2/file
```

**HTTP 请求方式**  

```
POST
```

**返回数据格式**

```
JSON
```

**请求参数**

| 参数     | 类型     | 必填   | 说明                 |
| ------ | ------ | ---- | ------------------ |
| appId  | string | 是    | 文件所属app的ID         |
| userId | string | 是    | 文件所属用户的ID          |
| alias  | string | 否    | 用户给文件起的别名          |
| file   | file   | 是    | 上传的文件              |
| token  | string | 是    | 合法的wilddog idToken |

**返回参数**

| 参数      | 类型     | 必填   | 说明               |
| ------- | ------ | ---- | ---------------- |
| code    | int    | 是    | 状态码，0表示成功，非0表示失败 |
| id      | long   | 否    | 成功上传的文件的id       |
| message | string | 否    | 错误描述信息           |




## 文件查询

**URL**

```
https://bt-sh-api.wilddog.com/v2/file
```

**HTTP 请求方式** 

```
GET
```

**返回数据格式**

```
JSON
```

**请求参数**

| 参数     | 类型     | 必填   | 说明                 |
| ------ | ------ | ---- | ------------------ |
| appId  | string | 是    | 文件所属app的ID         |
| userId | string | 是    | 文件所属用户的ID          |
| token  | string | 是    | 合法的wilddog idToken |

**返回参数**

| 参数         | 类型     | 必填   | 说明                                      |
| ---------- | ------ | ---- | --------------------------------------- |
| appId      | string | 是    | 文件所属app                                 |
| id         | long   | 是    | 文件ID                                    |
| name       | string | 是    | 文件名                                     |
| alias      | string | 否    | 文件别名                                    |
| size       | int    | 是    | 文件大小                                    |
| status     | int    | 是    | 文件状态（1表示上传成功， 2表示转码中， 3表示转码成功， 4表示转码失败），只有转码成功的文件可以进行插播 |
| userId     | string | 是    | 文件所属用户Id                                |
| createTime | int    | 是    | 文件上传时间戳                                 |

**返回举例**

```
[
    {
        "appId": "wildrtc",
        "createTime": 1513674993000,
        "id": 8,
        "name": "5.mkv",
        "size": 36393863,
        "status": 1,
        "userId": "zidane"
    }
]
```



## 文件删除

**URL**

```
https://bt-sh-api.wilddog.com/v2/file
```

**HTTP 请求方式** 

```
DELETE
```

**返回数据格式**

```
JSON
```

**请求参数**

| 参数     | 类型     | 必填   | 说明                 |
| ------ | ------ | ---- | ------------------ |
| appId  | string | 是    | 文件所属app的ID         |
| userId | string | 否    | 文件所属用户的ID          |
| id     | long   | 否    | 文件ID               |
| token  | string | 是    | 合法的wilddog idToken |

**返回参数**

| 参数      | 类型     | 必填   | 说明               |
| ------- | ------ | ---- | ---------------- |
| code    | int    | 是    | 状态码，0表示成功，非0表示失败 |
| message | string | 否    | 错误描述信息           |




## 发起插播

**URL**

```
https://bt-sh-api.wilddog.com/v2/externalInput/start
```

**HTTP 请求方式** 

```
POST
```

**返回数据格式**

```
JSON
```

**请求参数**

| 参数     | 类型     | 必填   | 说明                                  |
| ------ | ------ | ---- | ----------------------------------- |
| appId  | string | 是    | 视频会议用户appId                         |
| roomId | string | 是    | 要发起插播的视频会议房间Id                      |
| fileId | long   | 是    | 文件Id                                |
| token  | string | 是    | 合法的wilddog idToken                  |
| codec  | string | 否    | 为插播的视频指定编码，视频：h264、vp8，音频：opus、pcmu |

**返回参数**

| 参数       | 类型     | 必填   | 说明               |
| -------- | ------ | ---- | ---------------- |
| code     | int    | 是    | 状态码，0表示成功，非0表示失败 |
| streamId | string | 否    | 插播成功的插播流Id       |




## 控制插播

**URL**

```
https://bt-sh-api.wilddog.com/v2/externalInput/control
```

**HTTP 请求方式** 

```
POST
```

**返回数据格式**

```
JSON
```

**请求参数**

| 参数       | 类型     | 必填   | 说明                              |
| -------- | ------ | ---- | ------------------------------- |
| appId    | string | 是    | 视频会议用户appId                     |
| roomId   | string | 是    | 要发起插播的视频会议房间ID                  |
| type     | string | 是    | 控制类型：pause、continue、replay、stop |
| streamId | string | 是    | 控制目标插播流的ID                      |
| token    | string | 是    | 合法的wilddog idToken              |

**返回参数**

| 参数   | 类型   | 必填   | 说明               |
| ---- | ---- | ---- | ---------------- |
| code | int  | 是    | 状态码，0表示成功，非0表示失败 |
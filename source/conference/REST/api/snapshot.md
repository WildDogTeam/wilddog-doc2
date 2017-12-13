title: 云端截图
---


云端截图功能，常用于多人视频通话的房间抽检。每请求一次云端截图接口，云端便会对指定房间中的所有视频进行截图操作，每个视频生成一张图片，并返回 url 供图片下载。生成的图片将在野狗通信云暂存 15 天，请及时将云端的图片同步到你的存储服务器，以免遗失带来的不便。

云端截图功能，请求参数中包含 `adminToken` ，仅限于拥有管理员权限的用户进行调用，请参考身份认证中的 [adminToken]( https://docs.wilddog.com/auth/Server/server.html#生成-Custom-Token) 的生成方式。




**URL**

```
https://bt-sh-api.wilddog.com/v2/snapshot
```

**HTTP 请求方式**  

```
GET    
```

**接口频率限制**  

```
每30秒允许请求一次   
```

**返回数据格式**

```
JSON
```



**请求参数**

|参数           |类型           |必选       |说明|
|--------------|--------------|----------|---|
|appId         |string        |是        |使用音视频通信的VideoAppID|
|roomId        |string        |是        |多人视频通话中的roomID,房间号|
|token         |string        |是        |使用野狗身份认证的 [adminToken]( https://docs.wilddog.com/auth/Server/server.html#生成-Custom-Token)|




**请求示例**

```
curl 'https://bt-sh-api.wilddog.com/v2/snapshot?appId=<appId>&roomId=<roomId>&token=<adminToken>'
```

**响应示例**

```
{
    "code": 0,
    "url": [
        "http://bt-sh-download.wdstatic.cn/snapshot/20171204/wildrtc/112233@wildrtc_326450126607370500_1512371299144.jpg",
        "http://bt-sh-download.wdstatic.cn/snapshot/20171204/wildrtc/112233@wildrtc_326450126607370500_1512371299144.jpg"
    ]
}
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <li>图片文件名生成规则为：roomId@appId_streamId_ts.jpg，ts 为收到截图请求时的时间戳，精确到毫秒。</li>
  <li>截图接口与实际的截图操作是异步的，接口返回 url 时，并不能保证截图已经生成，请在获取到 url 后再延迟一段时间下载。</li>
</blockquote>




**错误码**

| 错误码 | 简称 | 错误详情 |
| ------------- | -------------- | ------------ |
|41200  |Server internal error   |服务端错误      |
|41201	|Invalid parameter	     |参数不合法      |
|41202	|Invalid token	         |token 不合法    |
|41203	|Room not exist	         |指定的 room 不存在|
|41204	|No stream in this room	 |指定的 room 中不存在视频流|
|41205	|Frequency exceeded	     |请求频率超限，30s 内只能请求一次|
|41206	|Server internal error   |查询 room 信息时 RPC 超时|
|41207	|Server internal error   |发起 snapshot 请求时 RPC 超时|


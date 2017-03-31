<<<<<<< HEAD:source/sync/REST/api/Error.md

title: 错误码
---

## HTTP状态码

##### 说明

Wilddog 的 REST API 将在以下情况返回错误码：

| HTTP状态码              | HTTP状态码描述                        |
| :--------------------- | :---------------------- |
| 400 Bad Request        | 不能解析 PUT 或 POST 数据          |
| 400 Bad Request        | 丢失 PUT 或 POST 数据            |
| 400 Bad Request        | PUT 或 POST 数据过长            |
| 400 Bad Request        | REST API 调用路径中包含非法的子节点名字 |
| 403 Forbidden          | 请求违反规则表达式               |
| 404 Not Found          | 通过 HTTP 请求而不是 HTTPS 请求      |
| 417 Expectation Failed | REST API 调用没有指定 Wilddog 名字 |



## 错误信息

##### 说明

Wilddog 的 REST API 将在业务错误时返回值中返回错误信息：

##### 示例

```
{
  "errcode":20402,
  "message":"Data requested exceeds the maximum size that can be accessed with a single query request",
  "error":"单次请求数据量过大"
}
or
{
  "errcode":20602,
  "message":"The rule has a invalid format",
  "code":20102,
  "error":"规则表达式格式不正确"
}

```


<blockquote class="warning">
<p><strong>注意：</strong></p>

`errcode`为标准的错误码，`message`为标准的描述信息；`code`和`error`为旧版的错误码和描述信息，未来会被废弃。

</blockquote>

| 错误码   | 错误信息 |描述   |
| :-- | :--------------------------- | :------------------------------ |
|20101| Please use domain | 请使用域名 |
|20102| The url requested must end with '.json' | URL以.json结尾 |
|20103| The app requested does not exist | App 不存在 |
|20104| The app is out of service | 当前App已停止服务 |
|20105| Quota limit exceeded. Please contact support@wilddog.com | 资源超限 |
|20201| Invalid parameters | 参数错误 |
|20202| The data of request is invalid | 数据格式不正确 |
|20203| The depth of path requested exceeded the depth limitation(32) | 路径不合法，超过最大深度32层 |
|20204| Invalid key name exceeded max length limitation(768 bytes) | 节点名称不合法，超过最大长度768字节 |
|20205| Invalid key name including illeagle characters | 节点名称不合法，包含非法字符 |
|20206| Key name must not be null | 节点名称不能为空 |
|20207| Patch and Post Method can't handle path end with '.priority'| 路径不合法 |
|20301| The orderBy parameter is invalid | orderBy参数不合法 |
|20302| Parameter shallow and orderBy are mutual exclusive | 不支持shallow与orderBy共同使用 |
|20303| Parameter count and orderBy are mutual exclusive | 不支持count与limitTo共同使用 |
|20304| Lack of orderBy parameter | 缺少orderBy参数 |
|20305| Use equalTo instead of startAt or endAt when value is boolean | value值为布尔类型时，请使用equalTo代替startAt和endAt |
|20306| Parameter startAt and endAt should have same type | startAt与endAt参数类型不一致 |
|20307| Parameter limitToFirst and limitToLast are mutual exclusive | limitToFirst与limitToLast只能使用一个 |
|20308| Parameter limitToFirst or limitToLast must be integer | limitToFirst, limitToLast参数必须是整数 |
|20309| Add '.indexOn' in relevant path in Rule | 请在规则表达式中的相关路径下，增加.indexOn规则 |
|20310| The type of range parameters of orderByKey must be string | 查询条件必须是字符串 |
|20311| Constraint index field must be a JSON primitive when use OrderBy | 查询条件必须是原始json格式 |
|20312| The type of priority is not correct | priority 类型不正确 |
|20313| The priority can't be set as boolean | priority不能设置为boolean型 |
|20314| Value of '.sv' must be 'timestamp' | .sv 的值只能为字符串 timestamp |
|20401| This client does not have permission to perform this operation | 没有操作权限 |
|20402| Data requested exceeds the maximum size that can be accessed with a single query request | 单次请求数据量过大 |
|20403| Size of the leaf node exceeds the limitation (1M bytes) | 写入数据中叶子节点数据量过大 |
|20404| Data of single write operation exceeded limitation of 4M bytes | 单次写入数据量超过4M字节的限制 |
|20505| Unkown error occured about the token | token出现未知错误 |
|20506| Token payload exception | token payload 异常 |
|20507| The custom token is null | custom token不能为空 |
|20510| The token is invalid | token不合法 |
|20601| Single node can't has multi wildcards | 某节点下不能有多个通配符 |
|20602| The rule has a invalid format | 规则表达式格式不正确 |
|20901| Server error| 服务端错误 |



 

##### 常见错误信息列举如下：

| 错误信息描述  |  错误产生原因 |  推荐解决方案 |
| :--------------- | :-------------------------------- | :--------------------------------------- |
| 单次请求数据量过大        | 用户对相应节点导出的数据超过了REST API允许导出的数据量范围 | 用户将问题通过提交工单的方式进行反馈,会有专员为用户提取数据           |
| 写入数据中叶子节点数据量过大   | 用户写入的数据中存在节点超过了每个节点允许的最大数据量       | 用户若存在节点数据大于节点最大数据允许范围,则需要重新设计数据结构        |
| orderBy 参数不合法     | 用户 orderBy 参数不符合 orederBy 的参数的规范      | 用户确认 orderBy 中的参数信息是否有异常字符.eg:若 orderBy 参数中若有$符号,则参数必须为 $key 、$priority 、 $value 这三种情况的一种 |
| 路径不合法，超过最大深度32层  | 用户的数据节点深度超过最大深度32层                | 用户的数据节点深度不能超过32层,若超过32层,则需重新设计数据结构       |
| 单次写入数据量超过4M字节的限制 | 单次写入数据量超过4M字节的限制                  | 用户将写操作的数据通过数据拆分的形式进行分批操作                 |

=======

title: 错误码
---

## HTTP状态码

##### 说明

Wilddog 的 REST API 将在以下情况返回错误码：

| HTTP状态码              | HTTP状态码描述                        |
| :--------------------- | :---------------------- |
| 400 Bad Request        | 不能解析 PUT 或 POST 数据          |
| 400 Bad Request        | 丢失 PUT 或 POST 数据            |
| 400 Bad Request        | PUT 或 POST 数据过长            |
| 400 Bad Request        | REST API 调用路径中包含非法的子节点名字 |
| 403 Forbidden          | 请求违反规则表达式               |
| 404 Not Found          | 通过 HTTP 请求而不是 HTTPS 请求      |
| 417 Expectation Failed | REST API 调用没有指定 Wilddog 名字 |




## 错误信息

##### 说明

Wilddog 的 REST API 将在业务错误时返回值中返回错误信息：

##### 示例

```
{
  "errcode":20402,
  "message":"Data requested exceeds the maximum size that can be accessed with a single query request",
  "error":"单次请求数据量过大"
}
or
{
  "errcode":20602,
  "message":"The rule has a invalid format",
  "code":20102,
  "error":"规则表达式格式不正确"
}

```


<blockquote class="warning">
<p><strong>注意：</strong></p>

`errcode`为标准的错误码，`message`为标准的描述信息；`code`和`error`为旧版的错误码和描述信息，未来会被废弃。

</blockquote>

| 错误码   | 错误信息 |描述   |
| :-- | :--------------------------- | :------------------------------ |
|20101| Please use domain | 请使用域名 |
|20102| The url requested must end with '.json' | URL以.json结尾 |
|20103| The app requested does not exist | App 不存在 |
|20104| The app is out of service | 当前App已停止服务 |
|20105| Quota limit exceeded. Please contact support@wilddog.com | 资源超限 |
|20201| Invalid parameters | 参数错误 |
|20202| The data of request is invalid | 数据格式不正确 |
|20203| The depth of path requested exceeded the depth limitation(32) | 路径不合法，超过最大深度32层 |
|20204| Invalid key name exceeded max length limitation(768 bytes) | 节点名称不合法，超过最大长度768字节 |
|20205| Invalid key name including illeagle characters | 节点名称不合法，包含非法字符 |
|20206| Key name must not be null | 节点名称不能为空 |
|20207| Patch and Post Method can't handle path end with '.priority'| 路径不合法 |
|20301| The orderBy parameter is invalid | orderBy参数不合法 |
|20302| Parameter shallow and orderBy are mutual exclusive | 不支持shallow与orderBy共同使用 |
|20303| Parameter count and orderBy are mutual exclusive | 不支持count与limitTo共同使用 |
|20304| Lack of orderBy parameter | 缺少orderBy参数 |
|20305| Use equalTo instead of startAt or endAt when value is boolean | value值为布尔类型时，请使用equalTo代替startAt和endAt |
|20306| Parameter startAt and endAt should have same type | startAt与endAt参数类型不一致 |
|20307| Parameter limitToFirst and limitToLast are mutual exclusive | limitToFirst与limitToLast只能使用一个 |
|20308| Parameter limitToFirst or limitToLast must be integer | limitToFirst, limitToLast参数必须是整数 |
|20309| Add '.indexOn' in relevant path in Rule | 请在规则表达式中的相关路径下，增加.indexOn规则 |
|20310| The type of range parameters of orderByKey must be string | 查询条件必须是字符串 |
|20311| Constraint index field must be a JSON primitive when use OrderBy | 查询条件必须是原始json格式 |
|20312| The type of priority is not correct | priority 类型不正确 |
|20313| The priority can't be set as boolean | priority不能设置为boolean型 |
|20314| Value of '.sv' must be 'timestamp' | .sv 的值只能为字符串 timestamp |
|20315|Could not set priority on non-existent node|不能给不存在的节点设置 priority|
|20401| This client does not have permission to perform this operation | 没有操作权限 |
|20402| Data requested exceeds the maximum size that can be accessed with a single query request | 单次请求数据量过大 |
|20403| Size of the leaf node exceeds the limitation (1M bytes) | 写入数据中叶子节点数据量过大 |
|20404| Data of single write operation exceeded limitation of 4M bytes | 单次写入数据量超过4M字节的限制 |
|20505| Unkown error occured about the token | token出现未知错误 |
|20506| Token payload exception | token payload 异常 |
|20507| The custom token is null | custom token不能为空 |
|20510| The token is invalid | token不合法 |
|20601| Single node can't has multi wildcards | 某节点下不能有多个通配符 |
|20602| The rule has a invalid format | 规则表达式格式不正确 |
|20901| Server error| 服务端错误 |



 

##### 常见错误信息列举如下：

| 错误信息描述  |  错误产生原因 |  推荐解决方案 |
| :--------------- | :-------------------------------- | :--------------------------------------- |
| 单次请求数据量过大        | 用户对相应节点导出的数据超过了REST API允许导出的数据量范围 | 用户将问题通过提交工单的方式进行反馈,会有专员为用户提取数据           |
| 写入数据中叶子节点数据量过大   | 用户写入的数据中存在节点超过了每个节点允许的最大数据量       | 用户若存在节点数据大于节点最大数据允许范围,则需要重新设计数据结构        |
| orderBy 参数不合法     | 用户 orderBy 参数不符合 orederBy 的参数的规范      | 用户确认 orderBy 中的参数信息是否有异常字符.eg:若 orderBy 参数中若有$符号,则参数必须为 $key 、$priority 、 $value 这三种情况的一种 |
| 路径不合法，超过最大深度32层  | 用户的数据节点深度超过最大深度32层                | 用户的数据节点深度不能超过32层,若超过32层,则需重新设计数据结构       |
| 单次写入数据量超过4M字节的限制 | 单次写入数据量超过4M字节的限制                  | 用户将写操作的数据通过数据拆分的形式进行分批操作                 |

>>>>>>> 81f7501ff8cbdf1b4decc8787a2efb2fdb226b57:source/api/sync/rest/Error.md

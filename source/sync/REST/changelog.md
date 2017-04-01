
title: 更新日志
---

## REST

### V2.3.6 - 2017.03.28
<span class="changelog fix">修复</span>

- 为不存在的 path 设置 priority 时，返回错误信息

### V2.3.5 - 2017.02.16
<span class="changelog add">新增</span>

- 错误码升级
<span class="changelog fix">修复</span>

- 升级 sync-core-client(原cloud-core-client)，解决死锁问题

### V2.3.4 - 2017.01.23
<span class="changelog fix">修复</span>

- 修复path带有$， 无法匹配rule规则表达式的bug

### V2.3.3 - 2017.01.13
<span class="changelog fix">修复</span>

- POST、PUT、PATCH 处理 body 为空问题

### V2.3.2 - 2017.01.12
<span class="changelog feature">改进</span>

- 限流 RPC 接口修改

### V2.3.0 - 2016.12.08
<span class="changelog add">新增</span>

- 支持多路径更新
<span class="changelog feature">改进</span>
- 使用 ICE 进行 RPC 调用
<span class="changelog fix">修复</span>
- 更新 priority 时，检查数据合法性

### V2.1.4 - 2016.09.06
<span class="changelog feature">改进</span>

- wilddog-auth-lib升级


title: 为什么使用 VideoSDK 在 `localhost` 时，虽然没有 `https` 证书也可以获得本地的图像和麦克风，但在网站上却不行？
tags:
- 实时视频通话
---
因为 Chrome 默认 localhost 是安全域名。但当有网站的时候，就需要 `https`证书来保证该域名是安全的。

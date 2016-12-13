title:  代码片段
---

通知类短信发送 Demo 及查询短信发送状态 Demo ：

```
private static String secret = "<YOUR_SECRET>";
private static String sendUrl = "http://api.wilddog.com/sms/v1/{appId}/send";
private static String queryUrl = "http://api.wilddog.com/sms/v1/{appId}/status";
    
    // 发送短信方法
    public static void send() {
        long timestamp = System.currentTimeMillis();
        Map<String, String> params = new HashMap<String, String>();
         // 设置请求参数
        params.put("templateId", "6");
        params.put("mobiles", "[18888880000]");
        params.put("timestamp", String.valueOf(timestamp));
        params.put("params", "[6666666]");
        Map<String, Object> sortedMap = new TreeMap<String, Object>(new Comparator<String>() {
            public int compare(String arg0, String arg1) {
                // 忽略大小写
                return arg0.compareToIgnoreCase(arg1);
            }
        });
        // 请求参数排序
        sortedMap.putAll(params);
        // 计算签名
        StringBuilder sb = new StringBuilder();
        FormBody.Builder formBody = new FormBody.Builder();
        for (String s : sortedMap.keySet()) {
            System.out.println(s + "  " + sortedMap.get(s));
            formBody.add(s, sortedMap.get(s) + "");
            sb.append(String.format("%s=%s&", s, sortedMap.get(s)));
        }
        sb.append(secret);
        String sig = DigestUtils.sha256Hex(sb.toString());
        // 追加签名参数
        RequestBody body = formBody.add("signature", sig).build();
        Request request = new Request.Builder().url(sendUrl).post(body).build();
        try {
            Response response = OkHttpUtils.getOkHttpClient().newCall(request).execute();
            System.out.println(response);
            System.out.println(response.body().string());
            System.out.println(response.body().toString());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    // 发送状态查询
    public static void query() {
        // 短信发送后批次号
        String sendId = "xxxxxxxx";
        Map<String, String> params = new HashMap<String, String>();
        params.put("sendId", sendId);
        Map<String, Object> sortedMap = new TreeMap<String, Object>(new Comparator<String>() {
            public int compare(String arg0, String arg1) {
                // 忽略大小写
                return arg0.compareToIgnoreCase(arg1);
            }
        });
        sortedMap.putAll(params);
        // 计算签名
        StringBuilder sb = new StringBuilder();
        for (String s : sortedMap.keySet()) {
            sb.append(String.format("%s=%s&", s, sortedMap.get(s)));
        }
        sb.append(secret);
        String sig = DigestUtils.sha256Hex(sb.toString());
        Request request = new Request.Builder().url(queryUrl + "?sendId=" + sendId + "&signature=" + sig).get().build();
        try {
            Response response = OkHttpUtils.getOkHttpClient().newCall(request).execute();
            System.out.println(response);
            System.out.println(response.body().string());
            System.out.println(response.body().toString());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
// 示例代码用到的 OkHttpUtils 工具类
public class OkHttpUtils {

    private static OkHttpClient client = null;

    public static OkHttpClient getOkHttpClient() {
        if (client == null) {
            synchronized (OkHttpUtils.class) {
                if (client == null) {
                    initClient();
                }
            }
        }
        return client;
    }

    private static void initClient() {
        Dispatcher dispatcher = new Dispatcher();
        dispatcher.setMaxRequests(100);
        dispatcher.setMaxRequestsPerHost(100);

        SSLContext sslContext;
        try {
            sslContext = SSLContext.getInstance("SSL");
            
            X509TrustManager x509TrustManager = new X509TrustManager() {
                @Override
                public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType)
                                throws CertificateException {}

                @Override
                public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType)
                                throws CertificateException {}

                @Override
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return new java.security.cert.X509Certificate[] {};
                }
            };
            final TrustManager[] trustAllCerts = new TrustManager[] {x509TrustManager};
            sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
            // Create an ssl socket factory with our all-trusting manager
            final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();

            OkHttpClient.Builder builder = new OkHttpClient.Builder();

            builder.sslSocketFactory(sslSocketFactory, x509TrustManager);
            client = builder.dispatcher(dispatcher).build();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
      
```




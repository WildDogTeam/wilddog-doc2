发送通知类短信 Demo

以下为 Java 端示例代码

```
import java.io.IOException;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;
import okhttp3.Dispatcher;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.apache.commons.codec.digest.DigestUtils;
public class Example {
    
    private static final String APPID = "XXXXX";
    private static final String SECRET = "<YOUR_SECRET>";
    
    private static final String BASE_URL = "https://api.wilddog.com/sms/v1/" + APPID;
    private static final String SEND_URL = BASE_URL + "/notify/send";
    private static OkHttpClient client = null;
    static{
        Dispatcher dispatcher = new Dispatcher();
        dispatcher.setMaxRequests(100);
        dispatcher.setMaxRequestsPerHost(100);
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        client = builder.dispatcher(dispatcher).build();
    }

    // 发送短信通知
    public static void send(String templateId, String mobiles, String parameters) {
        long timestamp = System.currentTimeMillis();
        Map<String, String> params = new HashMap<String, String>();
        // 设置请求参数
        params.put("templateId", templateId);
        params.put("mobiles", mobiles);
        params.put("timestamp", String.valueOf(timestamp));
        params.put("params", parameters);
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
        sb.append(SECRET);
        String sig = DigestUtils.sha256Hex(sb.toString());
        // 追加签名参数
        RequestBody body = formBody.add("signature", sig).build();
        Request request = new Request.Builder().url(SEND_URL).post(body).build();
        try {
            Response response = client.newCall(request).execute();
            System.out.println(response);
            System.out.println(response.body().string());
            System.out.println(response.body().toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
   
    public static void main(String[] args) {
        
        
        //发送通知类短信
        String templateId = "100001";
        String mobiles = "[13452366225]";
        String params = "["王小豆","个人版套版套餐"]";
        Example.send(templateId, mobiles, params);
    }
}

```
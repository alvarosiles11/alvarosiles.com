package Servisofts;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;

import org.json.JSONObject;

import com.google.gson.*;

public class SLog {

    private static JSONObject data = new JSONObject();

    private static ArrayList<String> keys =  new ArrayList<>();
    public static void put(String key, Object obj) {
        String[] keys = key.split("\\.");
        JSONObject temp = data;
        if (keys.length > 1) {
            String k = "";
            for (int i = 0; i < keys.length - 1; i++) {
                k = keys[i];
                if (!temp.has(k)) {
                    temp.put(k, new JSONObject());
                }
                temp = temp.getJSONObject(k);
            }
        }
        temp.put(keys[keys.length - 1], obj);

        write();

    }

    public static void remove(String key) {
        data.remove(key);
        write();
    }

    private static void write() {
        try {

            data.put("- SLog", "RealTime Log from server Servisofts");
            data.put("- Fecha", SUtil.now());

            String jsonString = data.toString(4);
            JsonParser jsonParser = new JsonParser();
            JsonElement jsonElement = jsonParser.parse(jsonString);

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String prettyJsonString = gson.toJson(jsonElement);
            Files.write(Paths.get("SLog.json"), prettyJsonString.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

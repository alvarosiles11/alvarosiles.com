package Servisofts;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class SUtil {
    private static final DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");

    public static String now() {
        return formatter.format(new Date());
    }
    public static Date parseTimestamp(String timestamp) throws ParseException {
        return formatter.parse(timestamp);
    }

    public static String uuid() {
        return UUID.randomUUID().toString();
    }
}

package Servisofts;

import java.sql.SQLException;
import org.json.JSONArray;
import org.json.JSONObject;

public class SPG {

    public static JSONArray all_array(String table, String... wheres) throws SQLException {
        String consulta = String.join("\n", "",
                "SELECT ",
                "array_to_json(array_agg(sq1.*)) as json",
                "FROM (",
                "SELECT * FROM " + table,
                buildWheres(wheres),
                ") sq1",
                "LIMIT 1",
                "");
        return SPGConect.ejecutarConsultaArray(consulta);
    }

    public static JSONObject all_object(String table, String identifier, String... wheres) throws SQLException {
        String consulta = String.join("\n", "",
                "SELECT ",
                "jsonb_object_agg(sq1." + identifier + ",to_json(sq1.*)) as json",
                "FROM (",
                "SELECT * FROM " + table,
                buildWheres(wheres),
                ") sq1",
                "LIMIT 1",
                "");
        return SPGConect.ejecutarConsultaObject(consulta);
    }

    public static JSONObject single_object(String table, String... wheres) throws SQLException {
        String consulta = String.join("\n", "",
                "SELECT ",
                "to_json(sq1.*) as json",
                "FROM (",
                "SELECT * FROM " + table,
                buildWheres(wheres),
                ") sq1",
                "LIMIT 1",
                "");
        return SPGConect.ejecutarConsultaObject(consulta);
    }

    private static String buildWheres(String[] wheres) {
        if (wheres.length <= 0)
            return "";
        String where = "";
        for (int i = 0; i < wheres.length; i++) {
            String whe = wheres[i];
            if (i == 0) {
                where = where + " WHERE ";
            } else {
                where = where + " AND ";
            }
            where = where + " " + whe;
        }
        return where;
    }

    // public static void main(String[] args) {
    // try {
    // Servisofts.initSPGConect();
    // System.out.println(SPG.all_array("tipo_viaje", "estado = 1"));
    // System.out.println(SPG.all_object("tipo_viaje", "key", "estado = 1"));
    // System.out.println(SPG.single_object(
    // "tipo_viaje",
    // "estado = 1",
    // "key = 'mensajeria-sobre'"));
    // } catch (Exception e) {
    // e.printStackTrace();
    // }
    // }
}

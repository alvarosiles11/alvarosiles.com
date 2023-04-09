package Controller;

import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

import Servisofts.SPG;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import Servisofts.http.Response;
import Servisofts.http.annotation.*;

@RestController
@RequestMapping("/restaurante")
public class restauranteController {

    public static String TABLE = "restaurante";

    // @GetMapping("/")
    // public JSONArray getAll() throws SQLException {
    // return SPG.all_array(TABLE);
    // }

    @GetMapping("/buscar")
    public JSONArray buscar(@RequestParam(value = "nombre") String nombre) throws SQLException {
        return SPG.all_array(TABLE, "UPPER(nombre) like UPPER('%" + nombre + "%')");
    }

    @PostMapping("/registro")
    public String register(@RequestBody String request) {
        JSONObject obj = new JSONObject(request);
        obj.put("key", SUtil.uuid());
        obj.put("fecha_on", SUtil.now());
        return obj.toString();
    }

}

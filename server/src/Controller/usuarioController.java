package Controller;

import java.io.Console;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

import Servisofts.SPG;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import Servisofts.http.annotation.GetMapping;
import Servisofts.http.annotation.PostMapping;
import Servisofts.http.annotation.PutMapping;
import Servisofts.http.annotation.RequestBody;
import Servisofts.http.annotation.RequestMapping;
import Servisofts.http.annotation.RequestParam;
import Servisofts.http.annotation.RestController;

@RestController
@RequestMapping("/usuario")

public class usuarioController {
    public static final String TABLE = "usuario";

    @GetMapping("/")
    public JSONArray getAll() throws SQLException {
        return SPG.all_array(TABLE);
    }

    @GetMapping("/bykey")
    public JSONArray byKey(@RequestParam(value = "key") String key) throws SQLException {
        return SPG.all_array(TABLE, "UPPER(key) like UPPER('%" + key + "%')");
    }

    @GetMapping("/buscar")
    public JSONArray buscar(@RequestParam(value = "nombre") String nombre) throws SQLException {
        return SPG.all_array(TABLE, "UPPER(nombre) like UPPER('%" + nombre + "%')");
    }

    @PostMapping("/registro")
    public static void register(@RequestBody String request) {
        try {
            JSONObject obj = new JSONObject(request);
            obj.put("key", SUtil.uuid());
            obj.put("fecha_on", SUtil.now());
            obj.put("estado", 1);
            SPGConect.insertArray(TABLE, new JSONArray().put(obj));
            System.out.println("insert: " + obj.toString());
        } catch (Exception e) {
            System.out.println("salto");
            e.printStackTrace();
        }
    }

    @PutMapping("/editar")
    public static void editar(@RequestBody String request) {
        try {
            JSONObject obj = new JSONObject(request);
            obj.put("fecha_on", SUtil.now());
            obj.put("estado", 1);
            SPGConect.editObject(TABLE, obj);
            System.out.println("update: " + obj.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PutMapping("/eliminar")
    public static void eliminar(@RequestBody String request) {
        try {
            JSONObject obj = new JSONObject(request);
            obj.put("fecha_on", SUtil.now());
            obj.put("estado", 0);
            SPGConect.editObject(TABLE, obj);
            System.out.println("delete: " + obj.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // @GetMapping("/")
    // public JSONArray test() {
    // try {
    // JSONArray arr = SPGConect.ejecutarConsultaArray("select
    // array_to_json(array_agg(usuario.*)) as json from usuario");
    // return arr;
    // } catch (Exception e) {
    // return null;
    // }
    // }

}

package Controller;

import org.json.JSONArray;

import Servisofts.SPGConect;
import Servisofts.http.annotation.GetMapping;
import Servisofts.http.annotation.RequestMapping;
import Servisofts.http.annotation.RestController;

@RestController
@RequestMapping("/usuario")

public class usuarioController {

    @GetMapping("/")
    public JSONArray test() {
        try {
            JSONArray arr = SPGConect
                    .ejecutarConsultaArray("select array_to_json(array_agg(usuario.*)) as json from usuario");
            return arr;
            // return arr.toString();
        } catch (Exception e) {
            return null;
        }

    }
    
    
}

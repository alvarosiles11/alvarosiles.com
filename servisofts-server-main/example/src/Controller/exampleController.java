package Controller;

import org.json.JSONArray;

import Servisofts.SPGConect;
import Servisofts.http.Response;
import Servisofts.http.annotation.GetMapping;
import Servisofts.http.annotation.PostMapping;
import Servisofts.http.annotation.RequestMapping;
import Servisofts.http.annotation.RestController;

@RestController
@RequestMapping("/example")
public class exampleController {

    @GetMapping("/")
    public JSONArray test() {
        try {
            JSONArray arr = SPGConect
                    .ejecutarConsultaArray("select array_to_json(array_agg(billetera.*)) as json from billetera");
            return arr;
            // return arr.toString();
        } catch (Exception e) {
            return null;
        }

    }
}

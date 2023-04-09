import java.util.ArrayList;
import java.util.List;
import Model.Aeronave;
import Http.HttpStatus;
import Http.Exception.HttpException;
import Http.annotation.*;

@RestController
@RequestMapping("/aeronave")
public class AeronaveApi {

    @GetMapping("/")
    public List<Aeronave> getAll() {
        List<Aeronave> aeronaves = new ArrayList<>();
        aeronaves.add(new Aeronave("2"));
        aeronaves.add(new Aeronave("1"));
        return aeronaves;
    }

    @GetMapping("/{key}")
    public Aeronave getByKey(@PathVariable String key) throws HttpException {
        if (key.equals("1")) {
            throw new HttpException(HttpStatus.CONFLICT, "Not found");
        }
        System.out.println("entro getByKey");
        return new Aeronave(key);
    }

    @PostMapping("/registro")
    public Aeronave register(@RequestBody Aeronave aeronave) {
        return aeronave;
    }

    @PutMapping("/{key}")
    public Aeronave edit(@RequestBody Aeronave aeronave, @PathVariable String key) {
        return aeronave;
    }

    @DeleteMapping("/{key}")
    public void delete(@PathVariable String key) {
        System.out.println("entro delete");
    }
}

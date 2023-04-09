# servisofts-java-service

Para crear un sevidor java 11 con servisofts nesecitamos crear un app vacio de java y luego importar la libreria servisofts-java-service.

```bash
wget https://repo.servisofts.com/home/servisofts/libs/java/servisofts-java-service.jar
mv ./servisofts-java-service.jar ./lib/servisofts-java-service.jar
```

Deberiamos quedar con la siguiente estructura de carpetas:


En el archivo /src/App.java
```java
import Servisofts.Servisofts;

public class App {
    public static void main(String[] args) {
        Servisofts.DEBUG = true; // Para activar y desactivar los logs del sistema
        
    }
}

```


## Datos
- Si la respuesta entra en el manejadorCliente con el dato "sendAll"  se realiza la accion ( SServerAbstract.sendAllServer())
- Si la respuesta entra en el manejadorCliente con el dato "sendUsers"  se realiza la accion ( SServerAbstract.sendAllServer())
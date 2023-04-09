package ServerHttp;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.RequestContext;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.jboss.com.sun.net.httpserver.HttpExchange;

import Servisofts.SConfig;

public class Upload {
    public static void handleRequest(HttpExchange t) throws IOException {
        try{
            DiskFileItemFactory d = new DiskFileItemFactory();
            ServletFileUpload up = new ServletFileUpload(d);
            List<FileItem> items = up.parseRequest(new RequestContext() {
    
                @Override
                public String getCharacterEncoding() {
                    return "UTF-8";
                }
    
                @Override
                public int getContentLength() {
                    return Integer.parseInt(t.getRequestHeaders().getFirst("Content-Length"));
                }
    
                @Override
                public String getContentType() {
                    return t.getRequestHeaders().getFirst("Content-type");
                }
    
                @Override
                public InputStream getInputStream() throws IOException {
                    return t.getRequestBody();
                }

                
            });

            t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            t.getResponseHeaders().add("Content-type", "text/plain");

            
            
            File file;
            String ruta;
            String nombre;
            String [] paths;
            for (FileItem fi : items) {
                ruta="";
                nombre="";
                paths = t.getRequestURI().getPath().split("/");
                for (int i = 0; i < paths.length; i++) {
                    if(i>1){
                        if(i==paths.length-1){
                            nombre = paths[i];
                        }else
                            ruta+=paths[i]+"/";
                    }
                }
                ruta = ruta.substring(0, ruta.length()-1);
                file = new File (SConfig.getJSON("files").getString("url")+ruta);
                if(!file.exists()){
                    file.mkdirs();
                }
                file = new File(SConfig.getJSON("files").getString("url")+ruta+"/"+nombre);
                copyInputStreamToFile(fi.getInputStream(), file);
            }
            
            t.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private static void copyInputStreamToFile(InputStream inputStream, File file) throws IOException {
        // append = false
        try (FileOutputStream outputStream = new FileOutputStream(file, false)) {
            int read;
            byte[] bytes = new byte[8192];
            while ((read = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }
            System.out.println("Imagen insertada con exito: " + file.getAbsolutePath());
            outputStream.close();
        }
    }


}

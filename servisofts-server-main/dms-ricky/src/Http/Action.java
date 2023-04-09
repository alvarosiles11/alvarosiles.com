package Http;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;

import org.jboss.com.sun.net.httpserver.HttpExchange;

import Http.Exception.HttpCodeException;
import Http.Exception.HttpException;
import Http.annotation.DeleteMapping;
import Http.annotation.GetMapping;
import Http.annotation.PathVariable;
import Http.annotation.PostMapping;
import Http.annotation.PutMapping;
import Http.annotation.RequestBody;

public class Action {
    enum ActionType {
        GET,
        POST,
        PUT,
        DELETE
    }

    private ActionType type;
    private Method method;
    private String route;
    private ArrayList<String> params;

    public Action(Method method) throws HttpCodeException {
        this.method = method;
        Annotation annotation = method.getAnnotation(GetMapping.class);
        if (annotation instanceof GetMapping) {
            GetMapping customAnnotation = (GetMapping) annotation;
            this.route = createRoute(customAnnotation.value());
            this.type = ActionType.GET;
            return;
        }
        annotation = method.getAnnotation(PostMapping.class);
        if (annotation instanceof PostMapping) {
            PostMapping customAnnotation = (PostMapping) annotation;
            this.route = createRoute(customAnnotation.value());
            this.type = ActionType.POST;
            return;
        }
        annotation = method.getAnnotation(PutMapping.class);
        if (annotation instanceof PutMapping) {
            PutMapping customAnnotation = (PutMapping) annotation;
            this.route = createRoute(customAnnotation.value());
            this.type = ActionType.PUT;
            return;
        }
        annotation = method.getAnnotation(DeleteMapping.class);
        if (annotation instanceof DeleteMapping) {
            DeleteMapping customAnnotation = (DeleteMapping) annotation;
            this.route = createRoute(customAnnotation.value());
            this.type = ActionType.DELETE;
            return;
        }
        throw new HttpCodeException("El metodo no tiene la anotacion GetMapping o PostMapping");
    }

    private static final Pattern p = Pattern.compile("\\{(.*?)\\}");

    public String createRoute(String route) {
        Matcher m = p.matcher(route);
        this.params = new ArrayList<>();
        while (m.find()) {
            String param = m.group(1);
            this.params.add(param);
        }
        return route;
    }

    public boolean equal(String method, String _route) {
        if (this.type != ActionType.valueOf(method)) {
            return false;
        }
        if (this.params.size() > 0) {
            String[] r_route = _route.split("/");
            String[] m_route = this.route.split("/");
            if (r_route.length != m_route.length) {
                return false;
            }
            for (int i = 0; i < m_route.length; i++) {
                if (m_route[i].startsWith("{") && m_route[i].endsWith("}")) {
                    continue;
                }
                if (!m_route[i].equals(r_route[i])) {
                    return false;
                }
            }
        } else {
            if (!this.route.equals(_route)) {
                return false;
            }
        }

        return true;
    }

    public void onMessage(HttpExchange t, Response response, String path, String data, Object instance) {

        Parameter[] parameters = this.method.getParameters();
        // Class[] paramTypes = this.method.getParameterTypes();
        ArrayList<Object> values = new ArrayList<Object>();
        int i_p_v = -1;

        String[] arrp = this.route.split("/");
        ArrayList<String> lis = new ArrayList<>();
        for (String s : arrp) {
            lis.add(s);
        }

        for (Parameter parameter : parameters) {
            Object value = null;
            Annotation annotation = parameter.getAnnotation(PathVariable.class);
            if (annotation instanceof PathVariable) {
                i_p_v++;

                int i = lis.indexOf("{" + this.params.get(i_p_v) + "}");
                if (i == -1) {
                    throw new RuntimeException("No se encontro el parametro " + this.params.get(i_p_v));
                }
                value = path.split("/")[i];
                values.add(parseValue(value, parameter.getType()));
                continue;
            }
            annotation = parameter.getAnnotation(RequestBody.class);
            if (annotation instanceof RequestBody) {
                values.add(parseValue(data, parameter.getType()));
                continue;
            }

            values.add(null);
        }

        try {
            Object resp = invoke(instance, values.toArray());
            response.setCode(HttpStatus.OK);
            response.setBody(resp.toString());
        } catch (Exception e) {
            if (e.getCause() instanceof HttpException) {
                HttpException ex = (HttpException) e.getCause();
                response.setCode(ex.getCode());
                response.setBody(ex.getMessage());
            } else {
                response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
                response.setBody(e.getMessage());
            }
        }

    }

    public Object invoke(Object instance, Object... arg)
            throws HttpException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        return this.method.invoke(instance, arg);

    }

    // public void onMessage(HttpExchange t, Response response, String path, String
    // data, Object instance) {

    // Class[] paramTypes = this.method.getParameterTypes();

    // ArrayList<Object> values = new ArrayList<Object>();
    // if (params.size() > 0) {
    // String[] r_route = path.split("/");
    // String[] m_route = this.route.split("/");

    // for (int i = 0; i < m_route.length; i++) {
    // if (m_route[i].startsWith("{") && m_route[i].endsWith("}")) {
    // values.add(parseValue(r_route[i], paramTypes[values.size()]));
    // }
    // }
    // if (values.size() != params.size()) {
    // response.setCode(Response.BAD_REQUEST);
    // response.setBody("Error en la cantidad de parametros");
    // return;
    // }
    // }
    // if (values.size() < paramTypes.length) {
    // for (int i = values.size(); i < paramTypes.length; i++) {
    // values.add(parseValue(data, paramTypes[i]));
    // }
    // }

    // try {
    // Object resp = this.method.invoke(instance, values.toArray());
    // if (resp == null) {
    // response.setCode(Response.OK);
    // response.setBody("");
    // return;
    // } else {
    // response.setBody(resp.toString());
    // return;
    // }
    // } catch (Exception e) {
    // response.setCode(Response.INTERNAL_SERVER_ERROR);
    // response.setBody(e.getLocalizedMessage());
    // return;
    // }

    // }

    public Object parseValue(Object value, Class<?> type) {
        if (type == String.class) {
            return value.toString();
        }
        if (type == int.class) {
            return Integer.parseInt(value.toString());
        }
        if (type == long.class) {
            return Long.parseLong(value.toString());
        }
        if (type == double.class) {
            return Double.parseDouble(value.toString());
        }
        if (type == boolean.class) {
            return Boolean.parseBoolean(value.toString());
        }
        return new Gson().fromJson(value.toString(), type);
    }

    public Method getMethod() {
        return method;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public void setMethod(Method method) {
        this.method = method;
    }

    public ActionType getType() {
        return type;
    }

    public void setType(ActionType type) {
        this.type = type;
    }

}

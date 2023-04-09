package Servisofts.http;

// import Servisofts.JSON;
import Servisofts.http.Exception.HttpCodeException;
import Servisofts.http.Exception.HttpException;
import Servisofts.http.annotation.DeleteMapping;
import Servisofts.http.annotation.GetMapping;
import Servisofts.http.annotation.PathVariable;
import Servisofts.http.annotation.PostMapping;
import Servisofts.http.annotation.PutMapping;
import Servisofts.http.annotation.RequestBody;
import Servisofts.http.annotation.RequestParam;

// import Servisofts.mediator.Request;
// import Servisofts.swagger.parts.Path;
import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.jboss.com.sun.net.httpserver.HttpExchange;

public class Action {

  enum ActionType {
    GET,
    POST,
    PUT,
    DELETE,
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
    throw new HttpCodeException(
        "El metodo no tiene la anotacion GetMapping o PostMapping");
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

  // instance es el Controller
  public void onMessage(
      HttpExchange t,
      Response response,
      String path,
      String data,
      Object instance)
      throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, HttpException {
    Parameter[] parameters = this.method.getParameters();
    Map<String, String> path_params = queryToMap(t.getRequestURI().getQuery());
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
          throw new RuntimeException(
              "No se encontro el parametro " + this.params.get(i_p_v));
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
      annotation = parameter.getAnnotation(RequestParam.class);
      if (annotation instanceof RequestParam) {
        RequestParam anot = (RequestParam) annotation;
        String name = anot.value();
        boolean required = anot.required();

        if (path_params.containsKey(name)) {
          values.add(parseValue(path_params.get(name), parameter.getType()));
        } else {
          if (required == true) {
            throw new HttpException(Status.BAD_REQUEST, "Parameter " + name + ":"+parameter.getType().getName()+" is required.");
          }
          values.add(parseValue(null, parameter.getType()));

        }

        continue;
      }

      values.add(null);
    }

    // try {
    Object resp;
    resp = invoke(instance, values.toArray());
    response.setCode(Status.OK);
    // if (resp instanceof Servisofts.mediator.Response) {
    // Servisofts.mediator.Response r = (Servisofts.mediator.Response) resp;
    // r.status = response.getCode();
    // response.setBody(r.toString());
    // } else {
    response.setBody(resp.toString());
    // }
  }

  public Object invoke(Object instance, Object... arg)
      throws HttpException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
    if (this.method == null) {
      return null;
    }
    if (!this.method.trySetAccessible()) {
      return null;
    }
    return this.method.invoke(instance, arg);
  }

  public Map<String, String> queryToMap(String query) {
    if (query == null) {
      return null;
    }
    Map<String, String> result = new HashMap<>();
    for (String param : query.split("&")) {
      String[] entry = param.split("=");
      if (entry.length > 1) {
        result.put(entry[0], entry[1]);
      } else {
        result.put(entry[0], "");
      }
    }
    return result;
  }

  public Object parseValue(Object value, Class<?> type) {

    if (type == String.class) {
      if (value == null)
        return "";
      return value.toString();
    }
    if (type == int.class) {
      if (value == null)
        value = 0;
      return Integer.parseInt(value.toString());
    }
    if (type == long.class) {
      if (value == null)
        value = 0;
      return Long.parseLong(value.toString());
    }
    if (type == double.class) {
      if (value == null)
        value = 0;
      return Double.parseDouble(value.toString());
    }
    if (type == boolean.class) {
      if (value == null)
        value = false;
      return Boolean.parseBoolean(value.toString());
    }
    if (type == Date.class) {
      return new Date(Long.parseLong(value.toString()));
    }
    if (type == BigDecimal.class) {
      return new BigDecimal(value.toString());
    }
    if (type == BigInteger.class) {
      return new BigInteger(value.toString());
    }
    if (type == byte[].class) {
      return value.toString().getBytes();
    }
    if (type == Byte.class) {
      return Byte.parseByte(value.toString());
    }
    // Class[] i = type.getInterfaces();
    // if (i.length > 0) {
    // if (i[0].getName().equals(Request.class.getName())) {
    // return createRequest(type, value);
    // }
    // }
    // return JSON.getInstance().fromJson(value.toString(), type);
    return value.toString();
  }

  public Object createRequest(Class type, Object value) {
    Object instance;
    try {
      Constructor[] constructors = type.getConstructors();
      for (Constructor constructor : constructors) {
        ArrayList<Object> values = new ArrayList<>();
        Class[] paramTypes = constructor.getParameterTypes();
        for (Class paramt : paramTypes) {
          // values.add(JSON.getInstance().fromJson(value.toString(), paramt));
        }
        instance = constructor.newInstance(values.toArray());
        return instance;
      }
      instance = type.getConstructor().newInstance();
    } catch (
        InstantiationException
        | IllegalAccessException
        | IllegalArgumentException
        | InvocationTargetException
        | NoSuchMethodException
        | SecurityException e) {
      e.printStackTrace();
    }
    return null;
  }

  public String getMethodSwagger() {
    return type.name().toLowerCase();
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

  // public Path getPathSwagger(Controller controller, String tag) {
  // String path = controller.getRoute() + getRoute();
  // Path po = new Path(path, getMethodSwagger());
  // String name = getMethod().getName();

  // Parameter[] parameters = this.method.getParameters();
  // int cant_params = 0;
  // for (Parameter parameter : parameters) {
  // Annotation annotation = parameter.getAnnotation(PathVariable.class);
  // if (annotation instanceof PathVariable) {
  // Servisofts.swagger.parts.Parameter pars = new
  // Servisofts.swagger.parts.Parameter(
  // this.params.get(cant_params),
  // "path",
  // true
  // );
  // cant_params++;
  // po.addParameter(pars);
  // }
  // annotation = parameter.getAnnotation(RequestBody.class);
  // if (annotation instanceof RequestBody) {
  // po.setRequestBody(new Servisofts.swagger.parts.RequestBody());
  // }
  // }
  // po.setOperationId(tag + "_" + name);
  // po.setSummary(tag + " " + name);
  // po.addTag(tag);
  // return po;
  // }
}

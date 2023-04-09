package Servisofts;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.SecureRandom;
import java.security.Security;
import java.security.SignatureException;
import java.security.cert.Certificate;
import java.security.cert.CertificateEncodingException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.interfaces.RSAPrivateCrtKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.naming.ldap.LdapName;
import javax.naming.ldap.Rdn;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;

import org.bouncycastle.asn1.ASN1ObjectIdentifier;
import org.bouncycastle.crypto.digests.SHA256Digest;
import org.bouncycastle.jce.X509Principal;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.util.encoders.Base64;
import org.bouncycastle.util.encoders.Hex;
import org.bouncycastle.util.io.pem.PemGenerationException;
import org.bouncycastle.util.io.pem.PemObject;
import org.bouncycastle.util.io.pem.PemObjectGenerator;
import org.bouncycastle.x509.X509V3CertificateGenerator;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SSL {

    public static KeyStore getKeyStore() {
        String path = SConfig.getJSON("ssl").getString("nombre_jks") + ".jks";
        String pass = SConfig.getJSON("ssl").getString("pass_jks");
        try {
            File file = new File(path);
            KeyStore keyStore = KeyStore.getInstance("JKS");
            if (!file.exists()) {
                keyStore.load(null, pass.toCharArray());
                keyStore.store(new FileOutputStream(file), pass.toCharArray());
            }

            keyStore.load(new FileInputStream(file), pass.toCharArray());
            return keyStore;
        } catch (Exception e) {
            return null;
        }

    }

    public static SSLContext getSSLContext() {
        try {
            String pass = SConfig.getJSON().getJSONObject("ssl").getString("pass_jks");
            KeyStore ks = getKeyStore();
            KeyManagerFactory kmf = KeyManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            kmf.init(ks, pass.toCharArray());
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            tmf.init(ks);
            TrustManager[] trustManagers = tmf.getTrustManagers();
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(kmf.getKeyManagers(), trustManagers, null);
            return sc;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public static boolean readPem(String path, String nombre) {
        // before decoding we need to get rod off the prefix and suffix
        try {
            FileReader file;
            file = new FileReader(path);
            int valor = file.read();
            String SConfigJson = "";
            while (valor != -1) {
                SConfigJson = SConfigJson + String.valueOf(((char) valor));
                valor = file.read();
            }
            file.close();
            String cert_begin = "-----BEGIN CERTIFICATE-----";
            String end_cert = "-----END CERTIFICATE-----";
            byte[] decoded = Base64.decode(SConfigJson.replaceAll(cert_begin, "").replaceAll(end_cert, ""));
            X509Certificate cert = (X509Certificate) CertificateFactory.getInstance("X.509")
                    .generateCertificate(new ByteArrayInputStream(decoded));

            registerPem(nombre, cert);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static boolean registerPem(String nombre, X509Certificate cert) {
        String path = SConfig.getJSON().getJSONObject("ssl").getString("nombre_jks") + ".jks";
        String pass = SConfig.getJSON().getJSONObject("ssl").getString("pass_jks");
        try {

            KeyStore keyStore = getKeyStore();
            keyStore.deleteEntry(nombre);
            keyStore.setCertificateEntry(nombre, cert);
            keyStore.store(new FileOutputStream(path), pass.toCharArray());
            // SConsole.warning("New certificate SSL ( OU=" + nombre + " ) is register on the " + path + " JKS!");
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public static boolean defaultCert(String nombre, X509Certificate cert) {
        String path = SConfig.getJSON().getJSONObject("ssl").getString("nombre_jks") + ".jks";
        String pass = SConfig.getJSON().getJSONObject("ssl").getString("pass_jks");
        try {

            KeyStore keyStore = getKeyStore();
            keyStore.setCertificateEntry(nombre, cert);
            keyStore.store(new FileOutputStream(path), pass.toCharArray());
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public static void verificarCertificados(JSONArray json) {
        try {
            JSONObject obj;
            KeyStore keystore = getKeyStore();
            X509Certificate cert;
            JSONObject cert_;
            for (int i = 0; i < json.length(); i++) {
                cert_ = new JSONObject();
                obj = json.getJSONObject(i);
                cert = (X509Certificate) keystore.getCertificate(obj.getString("nombre"));
                if (cert == null) {
                    cert_.put("existe", false);
                } else {
                    cert_.put("existe", true);
                    cert_.put("vence", cert.getNotAfter());
                    cert_.put("detalle", cert.getSubjectX500Principal().toString());
                    // cert_.put("pem", getPem(cert).toCharArray());
                    cert_.put("fingerp", fingerprint(cert));
                }
                json.getJSONObject(i).put("certificado", cert_);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static JSONObject verificarCertificado(String nombre) {
        try {
            KeyStore keystore = getKeyStore();
            X509Certificate cert;
            JSONObject cert_ = new JSONObject();
            cert = (X509Certificate) keystore.getCertificate(nombre);
            if (cert == null) {
                cert_.put("existe", false);
            } else {
                cert_.put("OU", nombre);
                cert_.put("existe", true);
                cert_.put("vence", cert.getNotAfter());
                cert_.put("pem", getPem(cert));
                cert_.put("detalle", getPem(cert));
                cert_.put("fingerp", fingerprint(cert));
            }
            return cert_;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getPem(X509Certificate certificate) {
        try {
            // String cert_begin = "-----BEGIN CERTIFICATE-----";
            // String end_cert = "-----END CERTIFICATE-----";
            byte[] derCert = certificate.getEncoded();
            String pemCertPre = new String(Base64.encode(derCert));
            // String pemCert = cert_begin + pemCertPre + end_cert;
            return pemCertPre;
        } catch (Exception e) {
            return null;
        }
    }

    public static boolean eliminarCertificado(String alias) {
        try {
            KeyStore keystore = getKeyStore();
            keystore.deleteEntry(alias);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static X509Certificate getCert(String nombre) {
        try {
            KeyStore keystore = getKeyStore();
            X509Certificate cert = (X509Certificate) keystore.getCertificate(nombre);
            if (cert == null) {
                return null;
            }
            return cert;
        } catch (Exception e) {
            return null;
        }
    }

    public static void getCert(String nombre, String pem) throws IOException {
        FileWriter fileWriter = new FileWriter(nombre + ".pem");
        fileWriter.write("-----BEGIN CERTIFICATE-----");
        fileWriter.write(System.getProperty("line.separator"));
        fileWriter.write(pem);
        fileWriter.write(System.getProperty("line.separator"));
        fileWriter.write("-----END CERTIFICATE-----");
        fileWriter.flush();
        fileWriter.close();
    }

    public static boolean servicioCert() {
        JSONObject socket_client = SConfig.getJSON("socket_client");
        JSONObject servicio = socket_client.getJSONObject("servicio");
        JSONObject cert = servicio.getJSONObject("cert");
        if (getCert(cert.getString("OU")) != null) {
            SConsole.succes("Certificate SSL ( OU=" + cert.getString("OU") + " ) is ready!");
            return true;
        }

        return readPem(cert.getString("pem"), cert.getString("OU"));
    }

    public static String getFingerPrint(String nombre) {
        try {
            KeyStore keystore = getKeyStore();
            X509Certificate cert = (X509Certificate) keystore.getCertificate(nombre);
            if (cert == null) {
                return null;
            }
            return fingerprint(cert);
        } catch (Exception e) {
            return null;
        }
    }

    public static String fingerprint(X509Certificate c) throws IOException, CertificateEncodingException {
        byte[] der = c.getEncoded();
        byte[] sha1 = sha256DigestOf(der);
        byte[] hexBytes = Hex.encode(sha1);
        String hex = new String(hexBytes, "ASCII").toUpperCase();
        StringBuffer fp = new StringBuffer();
        int i = 0;
        fp.append(hex.substring(i, i + 2));
        while ((i += 2) < hex.length()) {
            fp.append(':');
            fp.append(hex.substring(i, i + 2));
        }
        return fp.toString();
    }

    public static byte[] sha256DigestOf(byte[] input) {
        SHA256Digest d = new SHA256Digest();
        d.update(input, 0, input.length);
        byte[] result = new byte[d.getDigestSize()];
        d.doFinal(result, 0);
        return result;
    }

    public static String getPemNoHeader(X509Certificate certificate) {
        try {
            byte[] derCert = certificate.getEncoded();
            String pemCertPre = new String(Base64.encode(derCert));
            return pemCertPre;
        } catch (Exception e) {
            return null;
        }
    }

    public static boolean defaultCert() throws KeyStoreException, JSONException, CertificateException, IOException {
        try {

            JSONObject ssl = SConfig.getJSON("ssl");
            JSONObject certSConfig = ssl.getJSONObject("cert");
            SConsole.warning("Initilizing certificate ( OU=" + certSConfig.getString("OU") + " )");
            if (getCert(certSConfig.getString("OU")) != null) {
                SConsole.succes("Certificate " + certSConfig.getString("OU") + " ready!");

                return true;
            }
            addBouncyCastleAsSecurityProvider();
            // generate a key pair
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA", "BC");
            keyPairGenerator.initialize(2048, new SecureRandom());
            KeyPair keyPair = keyPairGenerator.generateKeyPair();

            // build a certificate generator
            X509Certificate cert = null;
            X509V3CertificateGenerator gen = new X509V3CertificateGenerator();
            gen.setPublicKey(keyPair.getPublic());
            gen.setSerialNumber(new BigInteger(Long.toString(System.currentTimeMillis() / 1000)));
            Hashtable<ASN1ObjectIdentifier, String> attrs = new Hashtable<ASN1ObjectIdentifier, String>();
            Vector<ASN1ObjectIdentifier> vOrder = new Vector<ASN1ObjectIdentifier>();
            attrs.put(X509Principal.E, certSConfig.getString("E"));
            vOrder.add(0, X509Principal.E);
            attrs.put(X509Principal.CN, certSConfig.getString("CN"));
            vOrder.add(0, X509Principal.CN);
            attrs.put(X509Principal.OU, certSConfig.getString("OU"));
            vOrder.add(0, X509Principal.OU);
            attrs.put(X509Principal.O, certSConfig.getString("O"));
            vOrder.add(0, X509Principal.O);
            attrs.put(X509Principal.L, certSConfig.getString("L"));
            vOrder.add(0, X509Principal.L);
            attrs.put(X509Principal.ST, certSConfig.getString("ST"));
            vOrder.add(0, X509Principal.ST);
            attrs.put(X509Principal.C, certSConfig.getString("C"));
            vOrder.add(0, X509Principal.C);
            gen.setIssuerDN(new X509Principal(vOrder, attrs));
            gen.setSubjectDN(new X509Principal(vOrder, attrs));
            gen.setNotBefore(new Date(System.currentTimeMillis()));
            gen.setNotAfter(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24)));
            gen.setSignatureAlgorithm("SHA256WithRSAEncryption");
            cert = gen.generate(keyPair.getPrivate(), "BC");

            RSAPrivateCrtKey k = (RSAPrivateCrtKey) keyPair.getPrivate();
            KeyStore keystore = getKeyStore();
            keystore.setCertificateEntry(certSConfig.getString("OU"), cert);

            keystore.setKeyEntry(certSConfig.getString("OU"), k, ssl.getString("pass_jks").toCharArray(),
                    new X509Certificate[] { cert });
            FileOutputStream out = new FileOutputStream(ssl.getString("nombre_jks") + ".jks");
            keystore.store(out, ssl.getString("pass_jks").toCharArray());
            out.close();
            FileWriter file;
            File f = new File("./ssl");
            if (!f.exists()) {
                f.mkdir();
            }
            try {
                file = new FileWriter("ssl/" + certSConfig.getString("OU") + ".pem");
                file.write(getPemNoHeader(cert));
                file.flush();
                file.close();
                SConsole.succes("Private Key exported in " + certSConfig.getString("OU") + ".pem");

            } catch (IOException e) {
                SConsole.error("error al escribir pem ");
            }

            String pemCert = "-----SERVISOFTS-" + certSConfig.getString("OU") + "-CERTIFICATE-----"
                    + getPemNoHeader(cert);
            SQR.getQr(pemCert, "ssl/" + certSConfig.getString("OU") + "_pemQR" + ".png");
            // File file = new File("pemCert.png");
            // byte[] bpemCert = Files.readAllBytes(file.toPath());
            // certSConfig.put("cert", new String(Base64.encode(bpemCert)));
            // new Email(certConfig).start();
            // SConsole.warning("New certificate SSL ( OU=" + certSConfig.getString("OU") + " ) generated!");
            getPKey(keyPair, certSConfig.getString("OU"));
            return true;
        } catch (CertificateEncodingException | InvalidKeyException | IllegalStateException | NoSuchProviderException
                | NoSuchAlgorithmException | SignatureException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static String getPKey(KeyPair key, String nombre) {
        try {
            // String cert_begin = "-----BEGIN PRIVATE KEY-----";
            // String end_cert = "-----END PRIVATE KEY-----";
            byte[] derCert = key.getPrivate().getEncoded();
            String pemCertPre = new String(Base64.encode(derCert));
            String pemCert = pemCertPre;
            FileWriter file;
            try {
                file = new FileWriter("ssl/" + nombre + "PK.pem");
                file.write(pemCert);
                file.flush();
                file.close();
                SConsole.succes("Private Key exported in " + nombre + "PK.pem");

            } catch (IOException e) {
                SConsole.error("error al escribir pem ");
            }

            return pemCert;
        } catch (Exception e) {
            return null;
        }
    }

    public static X509Certificate parseX509Certificate(String b64) {
        try {
            byte[] prvBlob = Base64.decode(b64);
            X509Certificate cert = (X509Certificate) CertificateFactory.getInstance("X.509")
                    .generateCertificate(new ByteArrayInputStream(prvBlob));
            return cert;
        } catch (CertificateException e) {
            return null;
        }
    }

    public static PrivateKey parsePrivateKey(String b64) {
        try {
            byte[] prvBlob = Base64.decode(b64);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PrivateKey prv2 = keyFactory.generatePrivate(new PKCS8EncodedKeySpec(prvBlob));
            return prv2;
        } catch (Exception e) {
            return null;
        }
    }

    public static JSONObject registerKeyEntry(String nombre, String pem, String llave) {
        JSONObject obj = new JSONObject();
        try {
            X509Certificate x509Certificate = parseX509Certificate(pem);
            PrivateKey privateKey = parsePrivateKey(llave);
            RSAPrivateCrtKey k = (RSAPrivateCrtKey) privateKey;
            KeyStore keystore = getKeyStore();
            keystore.setCertificateEntry(nombre, x509Certificate);
            X509Certificate x509CertificateSer = (X509Certificate) keystore.getCertificate("servicio");
            keystore.setKeyEntry("servicio", k, SConfig.getJSON("ssl").getString("pass_jks").toCharArray(),
                    new X509Certificate[] { x509CertificateSer, x509Certificate });
            FileOutputStream out = new FileOutputStream(SConfig.getJSON("ssl").getString("nombre_jks") + ".jks");
            keystore.store(out, SConfig.getJSON("ssl").getString("pass_jks").toCharArray());
            out.close();
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
        }
        return obj;
    }

    public static JSONObject registerCertificateEntry(String nombre, String pem) {
        JSONObject obj = new JSONObject();
        try {
            X509Certificate x509Certificate = parseX509Certificate(pem);
            LdapName ldapDN = new LdapName(x509Certificate.getSubjectX500Principal().getName());
            Map<String, String> attrs = new HashMap<String, String>();
            List<String> vOrder = new ArrayList<>();
            for (Rdn rdn : ldapDN.getRdns()) {
                attrs.put(rdn.getType(), rdn.getValue().toString());
                vOrder.add(rdn.getType());
            }
            if (!attrs.get("OU").equals(nombre)) {
                obj.put("estado", "error");
                return obj;
            }
            KeyStore keystore = getKeyStore();
            keystore.setCertificateEntry(nombre, x509Certificate);
            FileOutputStream out = new FileOutputStream(SConfig.getJSON("ssl").getString("nombre_jks") + ".jks");
            keystore.store(out, SConfig.getJSON("ssl").getString("pass_jks").toCharArray());
            out.close();
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
        }
        return obj;
    }

    public static void addBouncyCastleAsSecurityProvider() {
        Security.addProvider(new BouncyCastleProvider());
    }
}
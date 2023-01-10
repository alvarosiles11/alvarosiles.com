import { SSocketProps } from 'servisofts-socket'
import { SThemeThemes } from 'servisofts-component'
const SThemeProps: SThemeThemes = {
    default: {
        barStyle: "dark-content",
        barColor: "#EDEDED",
        primary: "#ffffff",
        secondary: "#000000",
        background: "#ffffff",
        card: "#bbbbbb99",
        info: "#16BF87"

    },
    dark: {
        barStyle: "light-content",
        barColor: "#161718",
        primary: "#000000",
        secondary: "#ffffff",
        background: "#000000",
        card: "#55555566",
        info: "#0097DA"
    }
}

const SocketProps: SSocketProps = {
    name: 'chat',
    // host: 'calistenia.servisofts.com',
    host: '192.168.3.4',
    port: {
        native: 10009,
        web: 20009,
        http: 30009,
    },
    ssl: false,
    cert: "MIIDyDCCArCgAwIBAgIEX/OGyjANBgkqhkiG9w0BAQsFADCBpTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxDTALBgNVBAsMBGNoYXQxHDAaBgNVBAMME2NoYXQuc2Vydmlzb2Z0cy5jb20xJzAlBgkqhkiG9w0BCQEWGHJpY2t5LnBhei5kLjk3QGdtYWlsLmNvbTAeFw0yMTAxMDQyMTIxMTRaFw0yMTAxMDUyMTIxMTVaMIGlMQswCQYDVQQGEwJCTzESMBAGA1UECAwJQXYgQmFuemVyMRMwEQYDVQQHDApTYW50YSBDcnV6MRcwFQYDVQQKDA5TZXJ2aXNvZnRzIFNSTDENMAsGA1UECwwEY2hhdDEcMBoGA1UEAwwTY2hhdC5zZXJ2aXNvZnRzLmNvbTEnMCUGCSqGSIb3DQEJARYYcmlja3kucGF6LmQuOTdAZ21haWwuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApFc6dKPjBPCNetgEAMZ/yPdG8jgxPKoDWWFxBsXS9LPtcOnvmH2d5Yt17fED4rlhGhqiaMBw8EW2YO7sUyyGyhYxrYrN2uXNsNMcLMMH2BB2tBWJI/yII6WPpG2HGW8WT0eJUvnAFRL1F0oEIJ29hp73MI7xqlZLPLqpEXeDXALsbI0tjfGVO3k2JEnNajDn7JLUVrWdCOuZrO8n0bmmvC0w+b8Tmpy3TUnPZBhcDJ0MHB8vUrIPLADS0J083+T1bb7NNlovuHgc+SjlCsJSU5ZTCMgbHpwueilX7ZJtQoNft24uUjANCujDNOq9uqfwwDmSwKUJURhvhuBxhxJFjwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQASpD+P1dPnpv6j9ON+PDpk/y/XMsqIwMHJC5WqeoJQukfRxpQCtG+vUc+alZeob6Z77EO+Lf+FoPjqGzdQTbHU5ytk0df7bz20hH6jh6tgb/TDa/gCsrvxR+IfvzXqj/N4XZOfFFsT6MyDpd5bSGpbIfCEw+ZW1BbW6cd6HhK3WESfHZCW51u8PheDYke1R5Sl/7Tumd4vFbKvKDz/aJLEwOhxHfVZLBwR/RvCLLHKb9HVnJW6ZLEkJr5pZXlnbhM/4Q+IPNnhlbA4x7eIIc8PLX/BCutN/7X1HrSCtVZY2R4Y6Lzm/VvTaBpI7Zv9wr8lhkni4G/nAlfnsb0VO2i6",
    apis: {
        rp: "https://rolespermisos.servisofts.com/images/"
    }
}
export default {
    SocketProps,
    SThemeProps
}
package Servisofts;

import java.util.Date;

public class SConsole {
    private static final String ANSI_BLACK = "\u001B[30m";
    private static final String ANSI_RED = "\u001B[31m";
    private static final String ANSI_GREEN = "\u001B[32m";
    private static final String ANSI_YELLOW = "\u001B[33m";
    private static final String ANSI_BLUE = "\u001B[34m";
    private static final String ANSI_PURPLE = "\u001B[35m";
    private static final String ANSI_CYAN = "\u001B[36m";
    private static final String ANSI_WHITE = "\u001B[37m";

    private static final String ANSI_BLACK_BACKGROUND = "\u001B[40m";
    private static final String ANSI_RED_BACKGROUND = "\u001B[41m";
    private static final String ANSI_GREEN_BACKGROUND = "\u001B[42m";
    private static final String ANSI_YELLOW_BACKGROUND = "\u001B[43m";
    private static final String ANSI_BLUE_BACKGROUND = "\u001B[44m";
    private static final String ANSI_PURPLE_BACKGROUND = "\u001B[45m";
    private static final String ANSI_CYAN_BACKGROUND = "\u001B[46m";
    private static final String ANSI_WHITE_BACKGROUND = "\u001B[47m";

    private static final String ANSI_RESET = "\u001B[0m";

    public static void log(Object... args) {
        System.out.print(ANSI_RESET);
        System.out.print("[" + new Date().toString() + "] ");
        for (int i = 0; i < args.length; i++) {
            System.out.print(args[i] + " ");
        }
        System.out.println(ANSI_RESET);
    }

    public static void succes(Object... args) {
        System.out.print(ANSI_GREEN);
        System.out.print("[" + new Date().toString() + "] ");
        for (int i = 0; i < args.length; i++) {
            System.out.print(args[i] + " ");
        }
        System.out.println(ANSI_RESET);
    }

    public static void warning(Object... args) {
        System.out.print(ANSI_YELLOW);
        System.out.print("[" + new Date().toString() + "] ");
        for (int i = 0; i < args.length; i++) {
            System.out.print(args[i] + " ");
        }
        System.out.println(ANSI_RESET);
    }

    public static void info(Object... args) {
        System.out.print(ANSI_BLUE);
        System.out.print("[" + new Date().toString() + "] ");
        for (int i = 0; i < args.length; i++) {
            System.out.print(args[i] + " ");
        }
        System.out.println(ANSI_RESET);
    }

    public static void error(Object... args) {
        System.out.print(ANSI_RED);
        System.out.print("[" + new Date().toString() + "] ");
        for (int i = 0; i < args.length; i++) {
            System.out.print(args[i] + " ");
        }
        System.out.println(ANSI_RESET);
    }

}

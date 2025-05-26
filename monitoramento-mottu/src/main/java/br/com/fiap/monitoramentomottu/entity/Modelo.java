package br.com.fiap.monitoramentomottu.entity;

public enum Modelo {
    MOTTU_SPORT,
    MOTTU_E,
    MOTTU_POP;
    public static boolean isValid(String modelo) {
        try {
            Modelo.valueOf(modelo);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}

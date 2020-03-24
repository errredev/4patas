export interface AvisoI {
    id?: string;
    uid?: string;
    fecha?: string;
    descripcion?: string;
    nombre: string;
    size: string;
    sexo: string;
    edad: string;
    salud: string;
    favoritos?: number;
    seguimiento?: number;
    mensajes?: number;
    especie: string;
    fotos?: string [];
    direccion?: string;
    region: string;
    comuna: string;
    estatus?: string;
}

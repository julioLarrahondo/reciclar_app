import * as SQLite from 'expo-sqlite';


// Abrir o crear la base de datos
const db = await SQLite.openDatabaseAsync('recyclingApp.db')

// crear las tablas
export const setupDatabase = () => {
  db.withTransactionSync(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario TEXT PRIMARY KEY NOT NULL,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        fecha_nacimiento TEXT,
        edad INTEGER,
        genero TEXT,
        email TEXT NOT NULL,
        ocupacion TEXT,
        telefono TEXT,
        pais TEXT,
        ciudad TEXT,
        fecha_registro TEXT NOT NULL,
        tipo_usuario TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS perfil_usuario (
        id_perfil INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario TEXT NOT NULL,
        nombre_usuario TEXT NOT NULL,
        foto TEXT,
        codigo_qr TEXT,
        mensaje_estado TEXT,
        nivel_usuario TEXT,
        total_puntos INTEGER,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS registro_reciclaje (
        id_registro INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario TEXT NOT NULL,
        id_material INTEGER NOT NULL,
        cantidad REAL NOT NULL,
        fecha TEXT NOT NULL,
        puntos INTEGER,
        foto TEXT,
        codigo_qr TEXT,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        FOREIGN KEY (id_material) REFERENCES materiales(id_material)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS materiales (
        id_material INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_material TEXT NOT NULL,
        unidad_medida TEXT NOT NULL,
        descripcion TEXT,
        foto TEXT
      );
    `);
  }, (error) => {
    console.log("Error al crear las tablas:", error);
  }, () => {
    console.log("Tablas creadas con éxito");
  });
};

export default db;

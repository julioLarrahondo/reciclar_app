import * as SQLite from 'expo-sqlite/next';

// Open or create the database
const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('recyclingApp.db');
};

// Create the tables
export const setupDatabase = async () => {
  const db = await openDatabase();
  
  try {
    await db.execAsync(`
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

      CREATE TABLE IF NOT EXISTS materiales (
        id_material INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_material TEXT NOT NULL,
        unidad_medida TEXT NOT NULL,
        descripcion TEXT,
        foto TEXT
      );
    `);
    
    console.log("Tablas creadas con éxito");
  } catch (error) {
    console.error("Error al crear las tablas:", error);
    throw error;
  } finally {
    await db.closeAsync();
  }
};

export default openDatabase;
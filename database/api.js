import { fetchFromAPI } from './api';
import openDatabase from '../database/database';

export const syncUsersWithDatabase = async () => {
  const db = await openDatabase();
  try {
    // Obtener usuarios desde la API
    const users = await fetchFromAPI('users'); 
    // Insertar usuarios en la tabla 'usuarios'
    for (const user of users) {
      await db.execAsync(
        `INSERT OR REPLACE INTO usuarios (
          id_usuario, nombres, apellidos, fecha_nacimiento, edad, genero, email, ocupacion, telefono, pais, ciudad, fecha_registro, tipo_usuario
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.id_usuario,
          user.nombres,
          user.apellidos,
          user.fecha_nacimiento,
          user.edad,
          user.genero,
          user.email,
          user.ocupacion,
          user.telefono,
          user.pais,
          user.ciudad,
          user.fecha_registro,
          user.tipo_usuario
        ]
      );
    }
    
    console.log("Usuarios sincronizados con éxito");
  } catch (error) {
    console.error("Error al sincronizar usuarios:", error);
    throw error;
  } finally {
    await db.closeAsync();
  }
};


  
const { pool } = require('../config/database');

async function getStats() {
  const [citasHoy, totalPacientes, totalMedicos, especialidades, citasPorEstado] = await Promise.all([
    pool.query(
      `SELECT COUNT(*) FROM citas
       WHERE fecha_hora::date = CURRENT_DATE AND estado != 'cancelada'`
    ),
    pool.query('SELECT COUNT(*) FROM pacientes'),
    pool.query('SELECT COUNT(*) FROM medicos WHERE activo = TRUE'),
    pool.query(
      `SELECT m.especialidad, COUNT(c.id) AS total_citas
       FROM citas c
       JOIN medicos m ON m.id = c.medico_id
       WHERE c.created_at >= NOW() - INTERVAL '30 days'
       GROUP BY m.especialidad
       ORDER BY total_citas DESC
       LIMIT 5`
    ),
    pool.query(
      `SELECT estado, COUNT(*) AS total
       FROM citas
       WHERE created_at >= NOW() - INTERVAL '30 days'
       GROUP BY estado`
    ),
  ]);

  // Citas por día (últimos 7 días)
  const citasSemana = await pool.query(
    `SELECT fecha_hora::date AS fecha, COUNT(*) AS total
     FROM citas
     WHERE fecha_hora >= NOW() - INTERVAL '7 days' AND estado != 'cancelada'
     GROUP BY fecha_hora::date
     ORDER BY fecha`
  );

  return {
    citas_hoy: parseInt(citasHoy.rows[0].count, 10),
    total_pacientes: parseInt(totalPacientes.rows[0].count, 10),
    total_medicos: parseInt(totalMedicos.rows[0].count, 10),
    especialidades_top: especialidades.rows,
    citas_por_estado: citasPorEstado.rows,
    citas_semana: citasSemana.rows,
  };
}

module.exports = { getStats };

// Devuelve una función que recibe cada tecla y responde true al completar el código
export const createCheatDetector = (code = 'IDDQD') => {
  const target = code.toLowerCase()
  let buffer = ''
  return (key: string): boolean => {
    // Shift, Enter, flechas…: no rompen la secuencia
    if (key.length !== 1) return false
    buffer = (buffer + key.toLowerCase()).slice(-target.length)
    return buffer === target
  }
}

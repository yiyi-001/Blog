/**
 * 获取唯一的ID
 * @param length
 * @returns {string}
 */
export function getUid (length = 6) {
  const len = (length < 6) ? 6 : length
  return Math.random().toString(35).slice(2).slice(0, len)
}

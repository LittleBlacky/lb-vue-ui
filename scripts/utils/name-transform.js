// 将驼峰变量名，比如useClickOutside，转变为 use-click-outside 的格式
export function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// 将 use-click-outside 转变为 useClickOutside 的格式
export function kebabToCamel(str) {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

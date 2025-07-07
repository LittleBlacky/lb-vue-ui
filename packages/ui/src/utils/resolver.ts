// my-resolver.ts
import type { ComponentResolverFunction } from 'unplugin-vue-components/types'

export interface LbsolverOptions {
  /**
   * 是否自动导入组件（默认 true）
   */
  autoImportComponent?: boolean
  /**
   * 是否自动导入样式（默认 true）
   */
  autoImportStyle?: boolean | 'css' | 'sass'
  /**
   * 组件库前缀
   */
  prefix?: string
  /**
   * 组件源路径
   */
  libraryName?: string
  /**
   * 样式文件基础路径
   */
  stylePath?: string
}

export const LbResolver = (options: LbsolverOptions = {}): ComponentResolverFunction => {
  const {
    autoImportStyle = true,
    prefix = 'lb', // 组件前缀
    libraryName = '@lb-vue-monorepo/ui', // 组件库名称
    stylePath = `${libraryName}/styles`, //样式文件路径
  } = options;
  return (name: string) => {
    if (prefix && !name.startsWith(prefix)) return undefined
    const componentName = prefix ? name.slice(prefix.length) : name;
    // 返回的解析结果
    const result: {
      type: 'component';
      as?: string;
      name?: string;
      from: string;
      sideEffects?: string | string[];
    } = {
      type: 'component',
      from: libraryName,
      as: componentName,
      name: componentName.toLowerCase()
    };
    // 1. 处理样式导入
    if (autoImportStyle && stylePath) {
      const styleExt =
        autoImportStyle ? 'css' :
          autoImportStyle === 'sass' ? 'scss' : 'css';

      result.sideEffects = [
        `${stylePath}/${componentName.toLowerCase()}.${styleExt}`,
      ];
    }
    return Object.keys(result).length > 0 ? result : undefined;
  };
}

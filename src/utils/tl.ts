export const tl = (
  name: string,
  props?: string | string[] | Record<string, any>,
  ...extra: string[]
) => {
  if (!props) return `{{${name}}}`
  if (typeof props === 'string') {
    return `{{${name}|${props}${extra?.length ? '|' + extra.join('|') : ''}}}`
  }
  if (Array.isArray(props)) {
    return `{{${name}|${props.join('|')}}}`
  }
  if (typeof props === 'object') {
    const keys = Object.keys(props)
    return `{{${name}|${keys.map((key) => `${key}=${props[key]}`).join('|')}}}`
  }
}

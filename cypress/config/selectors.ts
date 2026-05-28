export const dt = (name: string): string => `[data-test="${name}"]`
//export function dt(name: string): string {
//  return `[data-test="${name}"]`
//}

export const dtPrefix = (prefix: string): string => `[data-test^="${prefix}"]`

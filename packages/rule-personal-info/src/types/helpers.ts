export type HofReturnType<T extends (...a: any[]) => (...a: any[]) => any> = ReturnType<ReturnType<T>>

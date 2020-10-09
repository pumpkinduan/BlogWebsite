export type NeverPick<T, U> = {
    [P in Exclude<keyof T, U>]: T[P];
};
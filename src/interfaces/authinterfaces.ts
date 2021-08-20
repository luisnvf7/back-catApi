export interface userInterface {
    id?: string;
    googleId: string;
    displayName: string;
}

export interface doneSerializerFn<T> {
    (error : any, id? : T) : void
}

export interface doneDeserializerFn<T> {
    (error: any, user : T | false | null) : void
}
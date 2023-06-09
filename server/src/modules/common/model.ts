export interface ModificationNote {
    modified_on: Date;
    modified_by?: String | undefined;
    modification_note: String;
}

export const ModificationNote = {
    modified_on: Date,
    modified_by: String,
    modification_note: String
}
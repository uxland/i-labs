export interface IEntity {
    id: string;
}
export interface IEntityDescription {
    id: string;
    description: string;
}
export interface IGridHeaderItem {
    timestamp: string;
    center: string;
    canDownloadPDF?: boolean;
}
export type TPatientGridItems = Array<IPatientGridGroup | IPatientGridItem>;
export interface IPatientGridGroup extends IEntityDescription {
    items?: IPatientGridItem[];
}
export interface IPatientGridItem extends IEntityDescription {
    order: string;
    samples: IPatientGridSample[];
}
export interface IPatientGridSample extends IEntity {
    id: any;
    comment: string;
    value: any;
    timestamp: any;
    owner: IEntityDescription;
    range: IPatientGridSampleRange;
    normality: any;
    unit: string;
    center: string;
    onClickFn: any;
}
export interface IPatientGridSampleRange {
    min: string;
    max: string;
}
export interface ILabVariable extends IEntityDescription {
    order: string;
    samples: ILabVariableSample[];
}
export interface ILabVariableSample {
    id: string;
    value: string;
    unit?: string;
    timestamp: number;
    date?: string | Date;
    owner?: IEntityDescription;
    range?: string;
    normality?: TSampleNormality;
    center?: string;
    petitionId?: string;
    origen?: string;
    variableId?: string;
    variableDescription?: string;
}
export type TSampleNormality = '' | 'N' | 'L' | 'H' | 'LL' | 'HH';

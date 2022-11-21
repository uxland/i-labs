import { LitElement } from 'lit';
import { IPatientGridGroup, IPatientGridItem } from '../interfaces';
export declare class ILabs extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
    labData: IPatientGridGroup[];
    filteredLabData: IPatientGridGroup[];
    alteredResults: boolean;
    _start(): void;
    _copy(): void;
    _groupCheckboxChanged(groupId: string, checked: boolean): void;
    _groupAlteredResultsChanged(checked: boolean): void;
    _itemCheckboxChanged(): void;
    _calculateSelectedItems(): void;
    computeData(): string;
    _isAlteredResult(normality: string): boolean;
    _getStrongItem(item: IPatientGridItem): string;
    _getItem(item: IPatientGridItem): string;
}

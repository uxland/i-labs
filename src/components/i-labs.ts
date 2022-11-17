import {Checkbox} from '@vaadin/checkbox';
import {LitElement, css, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {labData} from '../data/labData';
import {IPatientGridGroup, IPatientGridItem} from '../interfaces';
import styles from './styles.scss';
import {template} from './template';

@customElement('i-labs')
export class ILabs extends LitElement {
  render() {
    return html`${template(this)}`;
  }

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property()
  labData: IPatientGridGroup[] = [];

  @property()
  filteredLabData: IPatientGridGroup[] = [];

  _start() {
    this.labData = labData;
  }

  _groupCheckboxChanged(groupId: string, checked: boolean) {
    this.shadowRoot
      ?.querySelector(`#group-${groupId}`)
      ?.querySelector('.items')
      ?.querySelectorAll('vaadin-checkbox')
      .forEach((c: Checkbox) => (c.checked = !checked));
    this._calculateSelectedItems();
  }

  _itemCheckboxChanged() {
    this._calculateSelectedItems();
  }

  _calculateSelectedItems() {
    setTimeout(() => {
      this.shadowRoot?.querySelectorAll('.group').forEach((groupElement: Element) => {
        const group = this.labData.find(
          (g: IPatientGridGroup) => g.id === groupElement.dataset.group
        );
        const selectedCheckboxes = Array.from(
          groupElement.querySelectorAll('vaadin-checkbox')
        ).filter((c: Checkbox) => c.checked);
        if (selectedCheckboxes.length) {
          const filteredGroup = this.filteredLabData.find(
            filteredGroup => filteredGroup.id === group?.id
          );
          const selectedItems = group?.items?.filter(
            (item: IPatientGridItem) =>
              selectedCheckboxes.findIndex(
                (selectedCheckbox: Checkbox) => selectedCheckbox.id === item.id
              ) != -1
          );
          if (filteredGroup) filteredGroup.items = selectedItems;
          else
            this.filteredLabData.push({
              ...group,
              items: selectedItems,
            } as any);
        } else
          this.filteredLabData = this.filteredLabData.filter(
            (filteredGroup: IPatientGridGroup) => filteredGroup.id !== group.id
          );
      });
      console.log(this.filteredLabData.filter(pg => pg.items?.length > 0));
    }, 300);
  }

  computeData() {
    return this.filteredLabData.reduce((acc, curr) => {
      const str = `<span><b>${curr.description}</b></span></br>${curr.items?.reduce(
        (acc, item: IPatientGridItem) =>
          acc.concat(
            `<span style="color:#29a1a6">${item.description.slice(0, 4)}</span>: ${
              item.samples[0].value
            } ${item.samples[0].unit || ''} `,
            ' | '
          ),
        ''
      )}</br></br>`;
      return acc.concat(str);
    }, '');
  }
}

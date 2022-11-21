import {html} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {IPatientGridGroup, IPatientGridItem} from '../interfaces';
import {ILabs} from './i-labs';
import '@vaadin/checkbox';
import '@vaadin/details';
import '@vaadin/button';
export const template = (props: ILabs) =>
  html`<div class="container">
    <header><h1>iLabs</h1></header>
    <vaadin-button id="start-btn" @click=${props._start} theme="primary"
      >Veure analítica</vaadin-button
    >
    <div class="wrapper">
      <div class="groups">
        <vaadin-checkbox
          ?hidden=${!props.labData?.length}
          id="altered-results"
          label="Resultats alterats"
          .checked=${props.alteredResults}
          @change=${(e: any) => props._groupAlteredResultsChanged(e.currentTarget.checked)}
        ></vaadin-checkbox>
        ${props.labData.map(
          (group: IPatientGridGroup) =>
            html`<div class="group" data-group=${group.id} id="group-${group.id}">
              <div class="name">
                <vaadin-checkbox
                  id="${group.id}"
                  label="${group.description}"
                  @click=${(e: any) =>
                    props._groupCheckboxChanged(group.id, e.currentTarget.checked)}
                ></vaadin-checkbox>
              </div>
              <div class="items">
                ${group.items?.map(
                  (item: IPatientGridItem) =>
                    html`<vaadin-checkbox
                      id="${item.id}"
                      @click=${props._itemCheckboxChanged}
                      label="${item.description}"
                    ></vaadin-checkbox>`
                )}
              </div>
            </div>`
        )}
      </div>
      <div class="wrapper-right" ?hidden=${!props.labData?.length}>
        <div class="final-text" contenteditable="true">${unsafeHTML(props.computeData())}</div>
        <vaadin-button id="copy-btn" @click=${props._copy} theme="primary"
          >Copiar resultats</vaadin-button
        >
      </div>
    </div>
  </div>`;

import {LitElement, css, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
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
  labData: any;

  _start() {}
}

/* declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
} */

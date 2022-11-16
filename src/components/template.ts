import {html} from 'lit-element';
import {ILabs} from './i-labs';
export const template = (props: ILabs) =>
  html`<div class="container">
    <header><h1>iLabs</h1></header>
    <button @click=${props._start}>Veure analítica</button>
  </div>`;

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'FieldFieldCustomizerStrings';
import Field, { IFieldProps } from './components/Field';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFieldFieldCustomizerProperties {
  // This is an example; replace with your own property
  Texto?: string;
}

const LOG_SOURCE: string = 'FieldFieldCustomizer';

export default class FieldFieldCustomizer
  extends BaseFieldCustomizer<IFieldFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated FieldFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "FieldFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.
    // caso 1 un texto
    // const text: string = `${this.properties.Texto}: ${event.fieldValue}`;
    
    
    var text: string='';
    var color: string='';
    switch (event.fieldValue) {
      case "Opcion A":
        text ='Esta es la primera opcion';
        color='rojo';
        break;
      case "Opcion B":
        text ='Esta es la segunda opcion';
        color='verde';
        break;
      case "Opcion C":
        text ='Esta es la tercera opcion';
        color='amarillo';
        break;
        default:
          break;
    }
    event.domElement.innerHTML ='<div>que pasa con esto</div>';
    const field: React.ReactElement<{}> =
      React.createElement(Field, { text, color } as IFieldProps);

    ReactDOM.render(field, event.domElement);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}

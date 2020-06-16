import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';


import styles from './Field.module.scss';
import './Estilos.css';

export interface IFieldProps {
  text: string;
  color: string;
}

const LOG_SOURCE: string = 'Field';

export default class Field extends React.Component<IFieldProps, {}> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: Field mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: Field unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {

    return (
      // <div className={styles.cell}>
   
    <div className={this.props.color}>
        { this.props.text }
     
        </div>
   

    );
  }

}

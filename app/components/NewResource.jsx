import React, { PropTypes } from 'react';
import ResourceTextInput from 'components/ResourceTextInput';
import classNames from 'classnames/bind';
import styles from 'css/components/entrybox';
import { FormGroup , ControlLabel , FormControl, HelpBlock, Button } from 'react-bootstrap'

const cx = classNames.bind(styles);

// Takes callback functions from props and passes it down to ResourceTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move ResourceTextInput up to EntryBox so it's less confusing
export default class NewResource extends React.Component {

  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onSave(event) {
    const { onEntrySave , newResource } = this.props;
    onEntrySave(newResource);
  }

  onChange( field, event) {
    const { onEntryChange } = this.props;
    const value = event.target.value
    onEntryChange(value, field);
  }

  onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.onSave();
    }
  }

  getValidationState(){
    console.log('get validation state');
  }

render(){
  const { newResource, onEntryChange, onEntrySave } = this.props
  return (
    <div className={cx('entrybox')}>
      <h1 className={cx('header')}>Vote for your top hack idea</h1>

      <form>
             <FormGroup
               controlId="new_resource"
               validationState={this.getValidationState()}
             >
               <ControlLabel>Resource Name</ControlLabel>
               <FormControl
                 type="text"
                 data-id='0'
                 placeholder="Not the police..."
               />
               <ControlLabel>Resource Type</ControlLabel>
                 <FormControl data-id='1' componentClass="select" multiple >
                   <option value='crisis'>Crisis Number only</option>
                   <option value='responder'>First Responders</option>
                   <option value='medical'>Medical</option>
                   <option value='fire'>Fire</option>
                   <option value='psych'>Mental Health</option>
                   <option value='conflict'>Conflict Resolution</option>
                   <option value='transport'>Emergency Transportation (no medical professionals)</option>
                   <option value='womens'>Women's Services</option>
                 </FormControl>
               <ControlLabel>Address</ControlLabel>
                 <FormControl
                   type="text"
                   data-id='2'
                   placeholder="492 9th St Oakland Ca"
                   onChange={this.onChange}
                 />
                 <ControlLabel>PhoneNumber</ControlLabel>
                   <FormControl
                     type="text"
                     data-id='3'
                     placeholder="510-629-6644"
                     onChange={this.onChange.bind(this, '3', event)}
                   />
                 <ControlLabel>Website Url</ControlLabel>
                   <FormControl
                     type="text"
                     data-id='4'
                     placeholder="www.dontcallthecops.com"
                     onChange={onEntryChange}
                   />
                 <ControlLabel>ZipCode</ControlLabel>
                   <FormControl
                     type="text"
                     data-id='5'
                     placeholder="94619"
                     onChange={onEntryChange}
                   />
                 <ControlLabel>Description</ControlLabel>
                   <FormControl
                     type="textArea"
                     data-id='6'
                     placeholder="Describe this resource in detail"
                     onChange={onEntryChange}
                   />
                 <ControlLabel>Service Region </ControlLabel>
                   <FormControl
                     type="text"
                     data-id='7'
                     placeholder="Alameda County"
                     onChange={onEntryChange}
                    />
               <FormControl.Feedback />
             </FormGroup>
             <Button type="submit" >Create Resource</Button>
           </form>

    </div>
  );
}
};

NewResource.propTypes = {
  newResource: PropTypes.array,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

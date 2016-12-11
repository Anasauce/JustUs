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
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSave() {
    const { onEntrySave, newResource  } = this.props;
    onEntrySave(newResource);
  }

  onChange(event) {
    const { onEntryChange } = this.props;
    const value = event.target.value
    const field = event.target.id
    onEntryChange(value, field);
  }

  onSubmit(event) {
    console.log(event.type);
    if (event.type === SUBMIT) {
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
               controlId="name"
               validationState={this.getValidationState()}
             >
               <ControlLabel>Resource Name</ControlLabel>
               <FormControl
                 type="text"
                 data-id='0'
                 value={newResource.name}
                 placeholder="Not the police..."
               />
               </FormGroup>
               <FormGroup
                 controlId="resource_type"
                 validationState={this.getValidationState()}
               >
               <ControlLabel>Resource Type</ControlLabel>
                 <FormControl data-id='1' componentClass="select" value={newResource.resource_type} onChange={this.onChange} multiple >
                   <option value='crisis'>Crisis Number only</option>
                   <option value='responder'>First Responders</option>
                   <option value='medical'>Medical</option>
                   <option value='fire'>Fire</option>
                   <option value='psych'>Mental Health</option>
                   <option value='conflict'>Conflict Resolution</option>
                   <option value='transport'>Emergency Transportation (no medical professionals)</option>
                   <option value='womens'>Women's Services</option>
                 </FormControl>
                 </FormGroup>
                 <FormGroup
                   controlId="address"
                   validationState={this.getValidationState()}
                 >
               <ControlLabel>Address</ControlLabel>
                 <FormControl
                   type="text"
                   data-id='2'
                   placeholder="492 9th St Oakland Ca"
                   value={newResource.address}
                   onChange={this.onChange}
                 />
                 </FormGroup>
                 <FormGroup
                   controlId="phone_number"
                   validationState={this.getValidationState()}
                 >
                 <ControlLabel>PhoneNumber</ControlLabel>
                   <FormControl
                     type="text"
                     data-id='3'
                     value={newResource.phone_number}
                     placeholder="510-629-6644"
                     onChange={this.onChange}
                   />
                  </FormGroup>
                  <FormGroup
                    controlId="website_url"
                    validationState={this.getValidationState()}
                  >
                 <ControlLabel>Website Url</ControlLabel>
                   <FormControl
                     type="text"
                     data-id='4'
                     value={newResource.website_url}
                     placeholder="www.dontcallthecops.com"
                     onChange={this.onChange}
                   />
                   </FormGroup>
                   <FormGroup
                     controlId="zipcode"
                     validationState={this.getValidationState()}
                   >
                 <ControlLabel>ZipCode</ControlLabel>
                   <FormControl
                     type="text"
                     data-id='5'
                     value={newResource.zipcode}
                     placeholder="94619"
                     onChange={this.onChange}
                   />
                   </FormGroup>
                   <FormGroup
                     controlId="description"
                     validationState={this.getValidationState()}
                   >
                 <ControlLabel>Description</ControlLabel>
                   <FormControl
                     type="textArea"
                     data-id='6'
                     value={newResource.description}
                     placeholder="Describe this resource in detail"
                     onChange={this.onChange}
                   />
                   </FormGroup>
                   <FormGroup
                     controlId="service_region"
                     validationState={this.getValidationState()}
                   >
                 <ControlLabel>Service Region </ControlLabel>
                   <FormControl
                     type="text"
                     data-id='7'
                     value={newResource.service_region}
                     placeholder="Alameda County"
                     onChange={this.onChange}
                    />
                    </FormGroup>
               <FormControl.Feedback />

             <Button type="submit" onSubmit={this.onSubmit}>Create Resource</Button>
           </form>

    </div>
  );
}
};

NewResource.propTypes = {
  newResource: PropTypes.object,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

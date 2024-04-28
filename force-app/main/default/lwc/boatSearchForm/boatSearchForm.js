import {LightningElement} from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
  selectedBoatTypeId = '';

  // Fires event that the search option has changed.
  // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
  handleSearchOptionChange (event) {
    this.selectedBoatTypeId = event.detail.value;
    const searchEvent = new CustomEvent ({boatTypeId: this.selectedBoatTypeId});
    this.dispatchEvent (searchEvent);
  }
}

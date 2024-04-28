import {LightningElement, wire} from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
  selectedBoatTypeId = '';

  // Private
  error = undefined;

  searchOptions;

  @wire (getBoatTypes)
  boatTypes({error, data}) {
    if (data) {
      console.log ('we have data', data);
      this.searchOptions = data.map (boatType => {
        return {label: boatType.Name, value: boatType.Id};
      });
      this.searchOptions.unshift ({label: 'All Types', value: ''});
    } else if (error) {
      console.log ('we have error = ', error);
      this.searchOptions = undefined;
      this.error = error;
    }
  }

  // Fires event that the search option has changed.
  // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
  handleSearchOptionChange (event) {
    this.selectedBoatTypeId = event.detail.value;
    const searchEvent = new CustomEvent ('search', {
      detail: {boatTypeId: this.selectedBoatTypeId},
    });
    this.dispatchEvent (searchEvent);
  }
}

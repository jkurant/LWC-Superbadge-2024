import {LightningElement} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
export default class BoatSearch extends LightningElement {
  isLoading = false;

  // Handles loading event
  handleLoading () {
    this.isLoading = true;
  }

  // Handles done loading event
  handleDoneLoading () {
    this.isLoading = false;
  }

  // Handles search boat event
  // This custom event comes from the form
  searchBoats (event) {
    // search for the boats based on the details of this event
    const boatTypeId = event.detail.boatTypeId;
    console.log ('searchBoats: boatTypeId = ' + boatTypeId);
    this.template
      .querySelector ('c-boat-search-results')
      .searchBoats (boatTypeId);
  }

  createNewBoat () {
    this[NavigationMixin.Navigate] ({
      type: 'standard__objectPage',
      attributes: {
        objectApiName: 'Boat__c',
        actionName: 'new',
      },
    });
  }
}

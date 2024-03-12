// import { Component } from '@angular/core';
// import { Capacitor } from '@capacitor/core';
// import { startOfDay, endOfDay } from 'date-fns';
// import { CapacitorHealthkit, OtherData, SampleNames } from '@perfood/capacitor-healthkit';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {

//   weight=0;
//   calories=0;

//   constructor() {}

//   async getPermissions(){
//     const  readPermissions = ['calories','steps','weight','activity'];

//     await CapacitorHealthkit.requestAuthorization({
//       all:[],
//       read: readPermissions,
//       write:[],
//     });
//   }

//   async loadEnergyBurned(){
//     const current = new Date();
//     const startDate = startOfDay(current).toISOString();
//     const endDate = endOfDay(current).toISOString();

//     const queryOtions = {
//       sampleName: 'activeEnergyBurned',
//       startDate,
//       endDate,
//       limit:0,
//     };
//     const data = await CapacitorHealthkit.queryHKitSampleType<OtherData>(
//       queryOtions
//     );
   
//     const value = data.resultData.reduce(
//       (value,item) => (value += item.value),
//       0
//     );
//     this.calories=+value.toFixed();
//   }

//   async loadWeight(){
//     const current = new Date();
//     const startDate = startOfDay(current).toISOString();
//     const endDate = endOfDay(current).toISOString();

//     const queryOtions = {
//       sampleName: SampleNames.WEIGHT,
//       startDate,
//       endDate,
//       limit:0,
//     };
//     const data = await CapacitorHealthkit.queryHKitSampleType<OtherData>(
//       queryOtions
//     );
   
//     const value = data.resultData.reduce(
//       (value,item) => (value += item.value),
//       0
//     );
//     this.weight = value;
    
//   }
//   }

import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorHealthkit, OtherData, SampleNames } from '@perfood/capacitor-healthkit';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight = 0;
  calories = 0;

  constructor() {}

  async getPermissions() {
    const readPermissions = ['calories', 'steps', 'weight', 'activity'];

    await CapacitorHealthkit.requestAuthorization({
      all: [],
      read: readPermissions,
      write: [],
    });
  }

  async loadEnergyBurned() {
    const current = new Date();
    const startDate = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0, 0).toISOString();
    const endDate = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59, 999).toISOString();

    const queryOptions = {
      sampleName: 'activeEnergyBurned',
      startDate,
      endDate,
      limit: 0,
    };

    const data = await CapacitorHealthkit.queryHKitSampleType<OtherData>(
      queryOptions
    );

    const value = data.resultData.reduce(
      (value, item) => (value += item.value),
      0
    );
    this.calories = +value.toFixed();
  }

  async loadWeight() {
    const current = new Date();
    const startDate = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0, 0).toISOString();
    const endDate = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59, 999).toISOString();

    const queryOptions = {
      sampleName: SampleNames.WEIGHT,
      startDate,
      endDate,
      limit: 0,
    };

    const data = await CapacitorHealthkit.queryHKitSampleType<OtherData>(
      queryOptions
    );

    const value = data.resultData.reduce(
      (value, item) => (value += item.value),
      0
    );
    this.weight = value;
  }
}

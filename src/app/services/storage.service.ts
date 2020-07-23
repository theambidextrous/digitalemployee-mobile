import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { JsonPipe } from '@angular/common';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  // store
  async store(storageKey: string, value : any){
    const encrptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({
      key: storageKey,
      value: encrptedValue
    })
  }
  // get
  async get(storageKey: string){
    const ret = await Storage.get({key:storageKey});
    if(ret.value){
      return JSON.parse(unescape(atob(ret.value)));
    }else{
      return false;
    }
  }
  // remove from storage
  async removeItem(storageKey:string){
    await Storage.remove({key:storageKey})
  }
  // clear storage
  async clear(){
    await Storage.clear();
  }
}

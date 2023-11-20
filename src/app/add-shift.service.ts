import { Injectable } from '@angular/core';
import { getAuth, user } from '@angular/fire/auth';
import { get } from '@angular/fire/database';
import { Firestore, arrayUnion, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { update } from '@firebase/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddShiftService {


  constructor(private firestore: Firestore) { }

 async addNewShift(shift:any){
    const auth = getAuth();
    return new Observable((observer)=>{
      auth.onAuthStateChanged(async (user)=>{
        try {
          if(!user){
            console.log("No User Found");
          }else{
            const userDocRef = doc(this.firestore , 'users' , user.uid)
            await updateDoc(userDocRef , {
              shifts:arrayUnion(shift)
            })
          }
          observer.next();
        } catch (error) {
          console.log('add shift err')
        }
      })
    })
  }


  async getShiftsFromCurrentUser(sDate, eDate , sName){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
         if(user){
          const userId = user.uid;
          const userDocRef = doc(this.firestore, 'users', userId);
          const userDoc = getDoc(userDocRef);
          const userData = (await userDoc).data();
          if(sDate && eDate){
            const startDate = new Date(sDate);
            const endDate = new Date(eDate);
            const filteredShifts = userData['shifts'].filter((shift) => {
              const shiftDate = new Date(shift.dateShift);
              return shiftDate >= startDate && shiftDate <= endDate
            })
            console.log("am intrat aici 1")
            console.log("shifts by date: " , filteredShifts)
            observer.next(filteredShifts);
          }else if(sName != ''){
            const filteredShifts = userData['shifts'].filter((shift) => {
              return sName == shift.nameShift
            })
            console.log("shifts by name: " , filteredShifts)
            console.log("am intrat aici 2")
            observer.next(filteredShifts);
          }else{
            observer.next(userData['shifts']);
          }
         }else{
          console.log('No user ');
         }
        }catch(err){
          console.log('err', err)
        }
      })
    })
  }

  async deleteShift(id: any){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
         if(user){
          const userId = user.uid;
          const userDocRef = doc(this.firestore, 'users', userId);
          const userDoc = getDoc(userDocRef);
          const userData = (await userDoc).data();

          if(userData['shifts']){
            const shiftIndex = userData['shifts'].findIndex((shift: { id: any; }) => shift.id === id);
            console.log("index: " , shiftIndex)
            userData['shifts'].splice(shiftIndex, 1);
          }

          await updateDoc(userDocRef, {
            shifts: userData['shifts']
          })

          observer.next(userData['shifts'])

         }else{
          console.log('No user ');
         }
        }catch(err){
          console.log('err', err)
        }
      })
    })
  }


  async getShiftById(id: any){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(user){
            const uid = user.uid;
            const userDocRef = doc(this.firestore, 'users', uid);
            const userDoc = getDoc(userDocRef);
            const userData = (await userDoc).data();
            const userShifts = userData['shifts'];
            const userFilteredShift = userShifts.find((el: any) => el.id === id);
            observer.next(userFilteredShift);
          }else{
            console.log('No user')
          }
        }catch(err){
          console.error('Error getting shift by id ', err);
        }
      })
    })
  }

  async updateShift(id: any, updatedData: any){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(user){
            const userId = user.uid;
            const userDocRef = doc(this.firestore, 'users', userId);
            const userDoc = getDoc(userDocRef);
            const userData = (await userDoc).data();
            const userShifts = userData['shifts'];
            const userFilteredShift = userShifts.find((el: any) => el.id === id);
          
            if(userFilteredShift){
              Object.assign(userFilteredShift, updatedData);
              await updateDoc(userDocRef, { shifts: userShifts });
              observer.next(userShifts); 
            }else{
              observer.error('Shift not found');
            }
         }else{
          console.log('No user ');
         }
        }catch(err){
          console.log('err', err)
        }
      })
    })
  }

}

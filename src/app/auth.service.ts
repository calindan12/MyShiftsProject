import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateEmail, updatePassword } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: Firestore ,  private route: Router , private http:HttpClient) { }

  invalidCredentials: boolean = false;

  registered :boolean

  async signUp(email: any , password: any , fname: any , lname: any, age:any , shifts:any){
    try{
      let isAdmin = false;
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(auth , email , password);
      const userUid = userCredentials.user.uid;
      console.log("am intrat aici")

      const userDoc = doc(this.firestore , "users" , userUid)
      await setDoc(userDoc , {
        fname , lname , email , age , password , shifts , isAdmin
      })
      console.log("user" , userDoc)
      this.registered = true;
    }catch(err){
      this.registered = false
      console.log("error")
    }
  }

  async login(email: string , password: string){
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth , email , password)
      this.route.navigate(['/home'])
    } catch (error) {
      this.invalidCredentials = true
      console.log("Error logging into the app ??" , error);
    }
  }

  // async getAllUsersAndShifts(){
  //   const auth = getAuth();
  //   return new Observable((observer) => {
  //    auth.onAuthStateChanged(async (user) => {
  //      try{
  //        if(!user){
  //          console.log('No user is authenticated')
  //        }else{
  //          const userUid = user.uid;
  //          const userDocRef = doc(this.firestore, 'users', userUid);
  //          const userDoc = getDoc(userDocRef);
  //          console.log("id este: " , (await userDoc).id)
  //          const userData = (await userDoc).data();
 
  //          if(userData['isAdmin']){
  //            const userCollection = collection(this.firestore, 'users');
  //            const usersQuery = query(userCollection);
  //            const userDocs = getDocs(usersQuery);
  //            const usersInfo = (await userDocs).docs
  //              .filter((document) => document.id !== userUid)
  //              .map((document) => document.data());
  //           console.log("id este 1: " , usersInfo)
  //            observer.next(usersInfo);
  //          }else{
  //            throw console.error('You are not admin!');
  //          }
  //        }
  //      }catch(err){
  //        console.log('err', err)
  //      }
  //    })
  //   }) 
  //  }

  async getCurrentUser(){ //onAuthStateChanged
    const auth =  getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        if(user){ //avem utilizator logat
          let userRef = doc(this.firestore, 'users', user.uid);
          let userDoc = await getDoc(userRef);

          if(userDoc.exists()){
            const userData = {
              ...user,
              ...userDoc.data()
            }
            console.log("user: " , userData)
            observer.next(userData);
          }
          
        }else{ //nu avem niciun utilizator logat
          observer.next(null);
        }
      })
    })
  }

  isAuthenticated(){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged((user) => {
        observer.next(!!user);
      })
    })
  }

  async getAllUsers(){
    const auth = getAuth();
    return new Observable((observer) => {
     auth.onAuthStateChanged(async (user) => {
       try{
         if(!user){
           console.log('No user is authenticated')
         }else{
           const userUid = user.uid;
           const userDocRef = doc(this.firestore, 'users', userUid);
           const userDoc = getDoc(userDocRef);
           const userData = (await userDoc).data();
 
           if(userData['isAdmin']){
             const userCollection = collection(this.firestore, 'users');
             const usersQuery = query(userCollection);
             const userDocs = getDocs(usersQuery);
             const usersInfo = (await userDocs).docs
               .filter((document) => document.id !== userUid)
               .map((document) => ({
                 ...document.data(),
                 uid: document.id
               }));
             observer.next(usersInfo);
           }else{
             throw console.error('You are not admin!');
           }
         }
       }catch(err){
         console.log('err', err)
       }
     })
    }) 
   }


   getUserWithEmail(email:any){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          const userCollection = collection(this.firestore, 'users');
             const usersQuery = query(userCollection);
             const userDocs = getDocs(usersQuery);
             const usersInfo = (await userDocs).docs
               .filter((document) => document.data()['email'] == email)
               .map((document) => ({
                 ...document.data(),
                 uid: document.id
               }));
              console.log("am ajuns aici: " , usersInfo)
             observer.next(usersInfo);
        }catch(error){
          console.log(error)
        }
      })
    })
   }



   async deleteUserWhenForgetingPassword(userUidToDelete){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
              this.http.get(`https://deleteuser-2hrfdkoeva-uc.a.run.app?userId=${userUidToDelete}`)
              .toPromise()
              .then((deletedUserResponse)=>{
                console.log(deletedUserResponse)
              })
              const userDocToDelete = doc(this.firestore, 'users', userUidToDelete);
              deleteDoc(userDocToDelete);
              console.log("am intrat aici")
            observer.next();
        }catch(err){
          console.log('error deleting user', err)
        }
      })
    })
  }








   async deleteUser(userUidToDelete){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(!user){
            console.log('No user is authenticated!')
          }else{
            const userDocRef = doc(this.firestore, 'users', user.uid);
            const userDoc = getDoc(userDocRef);
            const userData = (await userDoc).data();

            if(!userData['isAdmin']){
              console.log('You are not an admin')
            }
              this.http.get(`https://deleteuser-2hrfdkoeva-uc.a.run.app?userId=${userUidToDelete}`)
              .toPromise()
              .then((deletedUserResponse)=>{
                console.log(deletedUserResponse)
              })
              const userDocToDelete = doc(this.firestore, 'users', userUidToDelete);
              deleteDoc(userDocToDelete);
          

            const usersCollection = collection(this.firestore, 'users');
            const allUsers = getDocs(usersCollection);
            const remainingUsers = (await allUsers).docs
              .filter((el) => el.id !== user.uid)
              .map((el) => ({
                uid: el.id,
                ...el.data()
              }))

            observer.next(remainingUsers);

          }
        }catch(err){
          console.log('error deleting user', err)
        }
      })
    })
  }

   async updateProfile(updatedData: any){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(user){
            const userId = user.uid;

            if(updatedData.email){
              await updateEmail(user, updatedData.email);
            }

            if(updatedData.password){
              await updatePassword(user, updatedData.password);
            }

            const userDocRef = doc(this.firestore, 'users', userId);
            const userDoc = getDoc(userDocRef);
            const userData = (await userDoc).data();

            const updatedUserData = {...userData, ...updatedData};
            console.log(updatedUserData)

            await setDoc(userDocRef, updatedUserData);
            observer.next(updatedUserData);
          }else{
            observer.next(null);
          }
        }catch(err){
          console.log("Error updating profile", err)
        }
      })
    })
  }


  async getUserByUidIfAdmin(uidUser){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(!user){
            console.log('No user is authenticated!')
          }else{
            const userDocRef = doc(this.firestore, 'users', user.uid);
            const userDoc = getDoc(userDocRef);
            const userData = (await userDoc).data();

            if(!userData['isAdmin']){
              console.log('You are not an admin')
            }else{
              const userDocRecord = doc(this.firestore, 'users', uidUser);
              const userDocument = getDoc(userDocRecord);
              const userDataRecord = (await userDocument).data();
              observer.next(userDataRecord)
            }
          }
        }catch(err){
          console.log('no user', err)
        }
      })
    })
  }

  async updateProfileUserIfAdmin(uidUser:any, updatedData:any){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(!user){
            console.log('No user is authenticated!')
          }else{
            const userDocRef = doc(this.firestore, 'users', user.uid);
            const userDoc = getDoc(userDocRef);
            const userData = (await userDoc).data();

            if(!userData['isAdmin']){
              console.log('You are not an admin')
            }

            const url = `https://updateuser-2hrfdkoeva-uc.a.run.app/updateUser?uid=${uidUser}`;
            const body = {uid: uidUser, ...updatedData};

            this.http.post(url, body).subscribe((response: any) => {
              const userDocToUpdate = doc(this.firestore, 'users', uidUser);
              const updatedUserData = {...updatedData}
              updateDoc(userDocToUpdate, updatedUserData);
              observer.next(updatedUserData);
            })  
          }
        }catch(err){
          console.log('no user', err)
        }
      })
    })
  }


  async deleteShiftUserIfAdmin(userUid, shiftId){
    const auth = getAuth();
    console.log("am ajuns aici1" , userUid)

    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(!user){
            console.log('No user is authenticated!')
          }
          console.log("am ajuns aici2")


          const userDocRef = doc(this.firestore, 'users', user.uid);
          const userDoc = getDoc(userDocRef);
          const userData = (await userDoc).data();

          if(!userData['isAdmin']){
            console.log('You are not an admin!')
          }

          console.log("am ajuns aici3")


          const userRecordRef = doc(this.firestore, 'users', userUid);
          const userRecord = getDoc(userRecordRef);
          const userDataRecord = (await userRecord).data();
          if(userDataRecord['shifts']){
            const shiftIndex = userDataRecord['shifts'].findIndex((element) => element.id === shiftId);
            userDataRecord['shifts'].splice(shiftIndex, 1);
          }

          console.log("am ajuns aici4")


          updateDoc(userRecordRef, {
            shifts: userDataRecord['shifts']
          })

          console.log("am ajuns aici5")

          const usersCollection = collection(this.firestore, 'users');
          const userQuery = query(usersCollection);
          const userDocs = getDocs(userQuery);
          console.log("am ajuns aici")
          const usersInfo = (await userDocs).docs
            .filter((document) => document.id !== user.uid)
            .map((document) => ({
              ...document.data(),
              uid: document.id
            }))

          observer.next(usersInfo);
        }catch(err){
          console.log('err', err)
        }
      })
    })
  }



  async deleteUsersShift(userUid, shiftId){
    const auth = getAuth();
    console.log("am ajuns aici1" , userUid)

    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(!user){
            console.log('No user is authenticated!')
          }
          console.log("am ajuns aici2")


          const userDocRef = doc(this.firestore, 'users', user.uid);
          const userDoc = getDoc(userDocRef);
          const userData = (await userDoc).data();

          if(!userData['isAdmin']){
            console.log('You are not an admin!')
          }

          console.log("am ajuns aici3")


          const userRecordRef = doc(this.firestore, 'users', userUid);
          const userRecord = getDoc(userRecordRef);
          const userDataRecord = (await userRecord).data();
          if(userDataRecord['shifts']){
            const shiftIndex = userDataRecord['shifts'].findIndex((element) => element.id === shiftId);
            userDataRecord['shifts'].splice(shiftIndex, 1);
          }

          console.log("am ajuns aici4")


          updateDoc(userRecordRef, {
            shifts: userDataRecord['shifts']
          })

          console.log("am ajuns aici5" , userDataRecord['shifts'])

          // const usersCollection = collection(this.firestore, 'users');
          // const userQuery = query(usersCollection);
          // const userDocs = getDocs(userQuery);
          // console.log("am ajuns aici")
          // const usersInfo = (await userDocs).docs
          //   .filter((document) => document.id == user.uid)
          //   .map((document) => ({
          //     ...document.data(),
          //   }))


          observer.next(userDataRecord['shifts']);
        }catch(err){
          console.log('err', err)
        }
      })
    })
  }






















  async updateShiftIfAdmin(shiftId:any, updatedData: any){
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(!user){
            console.log('No user is authenticated!')
          }

          const userDocRef = doc(this.firestore, 'users', user.uid);
          const userDoc = getDoc(userDocRef);
          const userData = (await userDoc).data();

          if(!userData['isAdmin']){
            console.log('You are not an admin!')
          }

          const usersCollection = collection(this.firestore, 'users');
          const userQuery = query(usersCollection);
          const userDocs = await getDocs(userQuery);
          const usersInfo = userDocs.docs
            .filter((document) => document.id !== user.uid)
            .map((document) => ({
              ...document.data(),
              uid: document.id
            }))

          for(const regularUser of usersInfo){
            if(regularUser['shifts']){
              const shiftToFindIndex = regularUser['shifts'].findIndex((shift) => shift.id === shiftId);
              regularUser['shifts'][shiftToFindIndex] = {...regularUser['shifts'][shiftToFindIndex], ...updatedData};

              const userDocRef = doc(this.firestore, 'users', regularUser.uid);
              updateDoc(userDocRef, {
                shifts: regularUser['shifts']
              })
              observer.next(usersInfo);
            }
          }  
        }catch(err){
          console.log('err', err)
        }
      })
    })
  }



  async getShiftByIdIfAdmin(shiftId: any){
    console.log("am ajuns aici1: ")
    const auth = getAuth();
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        try{
          if(!user){
            console.log('No user is authenticated!')
          }
          console.log("am ajuns aici1: ")


          const userDocRef = doc(this.firestore, 'users', user.uid);
          const userDoc = getDoc(userDocRef);
          const userData = (await userDoc).data();
          console.log("am ajuns aici2: ")


          if(!userData['isAdmin']){
            console.log('You are not an admin!')
          }

          console.log("am ajuns aici3: ")


          const usersCollection = collection(this.firestore, 'users');
          const userQuery = query(usersCollection);
          const userDocs = await getDocs(userQuery);
          const usersInfo = userDocs.docs
            .filter((document) => document.id !== user.uid)
            .map((document) => ({
              ...document.data(),
              uid: document.id
            }))

            console.log("am ajuns aici4: ")


            console.log("user trimis: " , usersInfo)

          for(const regularUser of usersInfo){
            if(regularUser['shifts']){
              const shiftToFind = regularUser['shifts'].find((shift) => shift.id === shiftId);
              observer.next(shiftToFind);
            }
          }
        }catch(err){
          console.log('err', err)
        }
      })
    })
  }


  async getUserShifts(userId){
    let shifts:any[];
    console.log("id: " , userId)
    const auth = getAuth()
    let currentUser;
    return new Observable((observer) => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("No user is authenticated!");
        }else{
          currentUser = user;
          const userDocRef = doc(this.firestore, 'users', user.uid);
          const userDoc = getDoc(userDocRef);
          const userData = (await userDoc).data();
          if(!userData['isAdmin']){
            console.log('You are not an admin!')
          }else{
            try{
              const usersCollection = collection(this.firestore, 'users');
              const userQuery = query(usersCollection);
              const userDocs = await getDocs(userQuery);
              const usersInfo = userDocs.docs
              .filter((document) => document.id === userId)
              .map((document) => ({
                ...document.data(),
                uid: document.id
                }));
                console.log("user info:" , usersInfo)
                // for(let i=0;i<usersInfo.length;i++){
                //   if(usersInfo[i]['shifts']){
                //     console.log("shifturi: " , usersInfo[i]['shifts'])
                //     let shiftToFind = usersInfo[i]['shifts'].find((shift)=>shift.id==shiftId);
                //     console.log("shift" , shiftToFind)
                //     observer.next(shiftToFind);
                    
                //   }
                // }
                shifts = usersInfo.map((document=>{
                  return document['shifts'];
                }))
                observer.next(shifts);
                console.log(shifts)

                console.log("user: " , usersInfo)
            }catch(error){
              console.log('Error getting documents', error);
            }
          }
        }
      })
    })
  }
  




}

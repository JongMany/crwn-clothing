import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyB4WX3ZFKYJ_sP5APaSdyIZ4eoEI616urs",
  authDomain: "crwn-db-8316b.firebaseapp.com",
  projectId: "crwn-db-8316b",
  storageBucket: "crwn-db-8316b.appspot.com",
  messagingSenderId: "364345423577",
  appId: "1:364345423577:web:06e79134e825f7377ff0c8",
  measurementId: "G-G035TNLZKL"
};

const app = firebase.initializeApp(config);


export const createUserProfileDocument = async (userAuth, ...additionalData) => {
  //사용자 객체가 없으면 함수 종료 (로그인한 경우에만 DB에 저장)
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();

  //만약 snapShot이 fireStore에 존재하지 않는 경우 데이터 조각을 만듦
  if (!snapShot.exists) {
    const {
      displayName,
      email
    } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (e) {
      console.log(e);
    }

    //특정한 일을 위해서 userRef를 사용해야할 때가 있음
  }

  // console.log(firestore.collection('users'));
  return userRef;
}


//많은 데이터를 batch를 통해 한번에 실행시키도록
//batch를 사용하지 않으면 대용량 데이터의 실패 지점을 모르기에 예측 불가능해짐. 전체가 업데이트가 안되면 차라리 아예 업데이트가 안되도록
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch()
	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);

	})
  return await batch.commit();
};

//collections의 data는 배열이다. 배열을 객체로 만들기
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc=>{
    const {title, items } = doc.data();
    return {
      routeName : encodeURI(title.toLowerCase()),
      id : doc.id,
      title,
      items
    }
  })
  
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection; //key

    return accumulator;
  } ,{})
}

export const auth = firebase.auth(app);
export const firestore = firebase.firestore();

export const getCurrentUser = () => {
  return new Promise((resolve, reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    },reject);
  });
}


//authentication 라이브러리에서 new GoogleAuthProvider에 액세스할 수 있다.
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
//authentication을 위해서 GoogleAuthProvider를 사용할 때마다 항상 Google 팝업을 실행하길 원한다는 뜻 
GoogleProvider.setCustomParameters({
  prompt: 'select_account'
});
//구글로 로그인할 경우 위에서 설정한 provider를 통해 popup으로 로그인하려고 함
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export default firebase;
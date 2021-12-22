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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore(); 

//authentication 라이브러리에서 new GoogleAuthProvider에 액세스할 수 있다.
const provider = new firebase.auth.GoogleAuthProvider();
//authentication을 위해서 GoogleAuthProvider를 사용할 때마다 항상 Google 팝업을 실행하길 원한다는 뜻 
provider.setCustomParameters({ prompt : 'select_account' });
//구글로 로그인할 경우 위에서 설정한 provider를 통해 popup으로 로그인하려고 함
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
import {takeLatest, all, call, put} from 'redux-saga/effects';
import { auth, createUserProfileDocument, getCurrentUser, GoogleProvider } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.actions';
import UserActionTypes from './user.types';

export function* getSnapshotFromUserAuth(userAuth, additionalData){
  try{
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }))
  }catch(error) {
    yield put(signInFailure(error))
  }
}

//google
export function* signInWithGoogle(){
  try{
    const {user} = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  }catch(error){
    yield put(signInFailure(error))
  }
}

export function* onGoogleSignInStart(){
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle )
}
 
//email
//testing blackberry19@naver.com 111111
export function* signInWithEmail({payload:{email, password}}){
  try {
    const {user} = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* onEmailSignInStart(){
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

//checkUserSession
export function* isUserAuthenticated(){
  try {
    const userAuth = yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  }catch(error){
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession(){
  console.log('onCheckUser');
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated);
}


//SignOut
export function* signOut(){
  try{
    yield auth.signOut();
    yield put(signOutSuccess());
  }catch(error){
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}


//SignUp
export function* signUp({payload: {displayName, email, password}}){

  try {
    const {user} = yield auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
    yield put(signUpSuccess({user, additionalData: {displayName}}));
  }catch(error){
    yield put(signUpFailure(error));
  }
}

export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({payload:{user,additionalData}}){
  yield getSnapshotFromUserAuth(user, additionalData);
}
export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

//saga 모으기
export function* userSagas(){
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ])
}


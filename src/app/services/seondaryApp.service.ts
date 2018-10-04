import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

export const SecondaryApp = firebase.initializeApp (environment.firebase, 'Secondary');

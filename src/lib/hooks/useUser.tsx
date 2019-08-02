import { useEffect, useState, useRef } from 'react';

import { PasteTypes } from '../types';
import { 
  db, 
  auth, 
  FieldValue,
  Collections, 
} from '../services/firebase';

const useUser = () => {
  const [data, setData] = useState(null);
  const unsubSnap = useRef(null);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(user => {
      if (!user) return;
      unsubSnap.current = (
        db.collection('users')
          .doc(user.uid)
          .onSnapshot(snap => {
            const userData: any = snap.data();
            setData({
              ...userData,
              pastes: userData.pastes.map(p => ({
                ...p,
                date: p.date.toDate()
              })).reverse()
            });
          })
      );
    });
    return () => {
      unsubAuth();
      if (unsubSnap.current) {
        unsubSnap.current();
      }
    };
  }, []);

  const addPaste = (text: string) => {
    db.collection(Collections.Users)
      .doc(auth.currentUser.uid)
      .update({
        pastes: FieldValue.arrayUnion({
          text,
          date: new Date(),
          type: PasteTypes.Text,
        })
      });
  };

  const signOut = async () => {
    if (unsubSnap.current) {
      unsubSnap.current();
    }
    await auth.signOut();
    setTimeout(() => {
      setData(null);
    }, 300);
  }

  return {
    signOut,
    addPaste,
    userData: data,
  };
};

export default useUser;
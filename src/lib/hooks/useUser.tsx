import { useEffect, useState } from 'react';

import { PasteTypes } from '../types';
import { 
  db, 
  auth, 
  FieldValue,
  Collections, 
} from '../services/firebase';

const useUser = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let unsubSnapshot = () => {};
    const unsubAuth = auth.onAuthStateChanged(user => {
      if (!user) return;
      unsubSnapshot = (
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
      unsubSnapshot();
      unsubAuth();
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

  return {
    addPaste,
    userData: data,
  };
};

export default useUser;
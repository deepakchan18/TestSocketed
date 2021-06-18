import firebse from 'firebase'

import { USER_STATE_CHANGE } from '../constants/index'

export function fetchUser() {
    return((dispatch) =>{
        firebse.firestore()
            .collection("users")
            .doc(firebse.auth().currentUser.uid)
            .get()
            .then((sanpshot) => {
                if(sanpshot.exists){
                    dispatch({ type: USER_STATE_CHANGE, currentUser: sanpshot.data() })
                }else{
                    console.log('does npt exist')
                }
            })
    })
}
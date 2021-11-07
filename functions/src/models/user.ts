import { firestore } from "firebase-admin";

class User implements Model {

  create({name, nik, phoneNumber, uid}: {
    name: string,
    nik: string,
    phoneNumber: string,
    uid: string,
  }): Promise<firestore.DocumentReference<firestore.DocumentData>> {
    return firestore().collection('user').add({
      name, nik, phoneNumber, uid
    });
  } 

  find(queryFields: {
    [field: string]: any
  }) : Promise<firestore.QuerySnapshot<firestore.DocumentData>> {
    let query = firestore().collection('user').select('uid', 'name', 'phoneNumber');
    Object.keys(queryFields).forEach((field: string) => {
      query = query.where(field, '==', queryFields[field]);
    })
    return query.get();
  }

  async update(uid:string, {name, phoneNumber}: {name:string, phoneNumber: string}): Promise<firestore.WriteResult> {
    const query = await this.find({ uid });
    const userId = query.docs[0]?.id;
    return await firestore().doc(`user/${userId}`).update({name, phoneNumber});
  }
}

export default new User;
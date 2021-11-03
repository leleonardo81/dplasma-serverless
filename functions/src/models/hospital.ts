import { firestore } from "firebase-admin";
import Address from "./address";

class Hospital implements Model {
  create({name, address}: {
    name: string,
    address: Address
  }): Promise<firestore.DocumentReference<firestore.DocumentData>> {
    return firestore().collection('hospital').add({
      name, address
    });
  } 
 
  async find(queryFields: { [field: string]: any; }, querySettings?: { limit: number; offset: number; }) {
    let query = firestore().collection('hospital').select('name', 'address');
    if (querySettings?.limit) query = query.limit(querySettings.limit);
    if (querySettings?.offset) query = query.offset(querySettings.offset);
    Object.keys(queryFields).forEach((field: string) => {
      query = query.where(field, '==', queryFields[field]);
    })
    const res = (await query.get())
    return res.docs.map(rs=>({
      rsid: rs.id,
      ...rs.data()
    }));
  }

  async findById(rsid: string): Promise<any> {
    const res: any = await (await firestore().doc(`hospital/${rsid}`).get()).data();
    return res;
  }
  
}

export default new Hospital;
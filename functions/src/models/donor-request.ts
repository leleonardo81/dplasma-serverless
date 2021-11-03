import { firestore } from "firebase-admin";
interface DonorRequest {
  uid: string;
  rsid: string;
  status: string;
  bloodtype: string;
  age: number;
  description: string;
}

class DonorRequest implements Model {

  create({uid, rsid, status, bloodtype, age, description}: DonorRequest)
  : Promise<firestore.DocumentReference<firestore.DocumentData>> {
    const now = new Date().toISOString();
    return firestore().collection('donor-request').add({
      uid, rsid, status, bloodtype, age, description,
      createdAt: now, updatedAt: now
    });
  } 

  async find(queryFields: {
    [field: string]: any
  }, querySettings?: {
    limit: number, 
    offset: number
  }) {
    let query: firestore.Query<firestore.DocumentData> = firestore().collection('donor-request');
    if (querySettings?.limit) query = query.limit(querySettings.limit);
    if (querySettings?.offset) query = query.offset(querySettings.offset);
    Object.keys(queryFields).forEach((field: string) => {
      query = query.where(field, '==', queryFields[field]);
    })
    const res = await query.get();
    return res.docs.map(dr=>({
      id: dr.id,
      ...dr.data()
    }))
  }

  async findById(id: string): Promise<any> {
    const res: any = await (await firestore().doc(`donor-request/${id}`).get()).data();
    return res;
  }
}

export default new DonorRequest;
interface Model {
  create(data: any): Promise<any>;
  find(queryFields: { [field: string]: any }, querySettings?: {
    limit: number, 
    offset: number
  }): Promise<any>;
};
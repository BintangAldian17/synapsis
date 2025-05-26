export type UserStatistic = {
  totalUser: number;
  totalActive: number;
  totalInActive: number;
  totalMale: number;
  totalFemale: number;
};

export type PostUserQuantity = {
  userName: string;
  postCount: number;
};

export type PostStatistic = {
  totalPost: number;
  postUserQuantity: PostUserQuantity[];
};

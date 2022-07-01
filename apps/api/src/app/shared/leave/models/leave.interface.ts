export interface Leave {
  userId: string;
  fullname: string;
  leave: {
    from: number;
    to: number;
  };
}

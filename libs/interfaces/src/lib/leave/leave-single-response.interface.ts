export interface LeaveSingle {
  id: string;
  fullname: string;
  userId: string;
  leave: {
    from: number;
    to: number;
  };
}

export interface LeavePostRequest {
  userId: string;
  fullname: string;
  leave: {
    from: number;
    to: number;
  };
}

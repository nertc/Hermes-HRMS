export interface LeaveListItem {
  id: number;
  userId: number;
  fullname: string;
  leave: {
    from: Date;
    to: Date;
  };
}

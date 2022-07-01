export interface LeaveListItem {
  id: string;
  userId: string;
  fullname: string;
  leave: {
    from: Date;
    to: Date;
  };
}

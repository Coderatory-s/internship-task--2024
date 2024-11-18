export interface IDecryptedJwt {
    id: string;
    name: string;
    email: string;
    position: string; // 'HR', 'Employee', or any other role
    status: string; // e.g., 'active', 'inactive', etc.
  }
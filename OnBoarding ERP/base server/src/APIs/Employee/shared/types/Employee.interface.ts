export interface IEmployee {
    save(): unknown;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    salary: number;
    // dateOfJoining: Date;
    isActive: boolean;
    password:string;
  }

  
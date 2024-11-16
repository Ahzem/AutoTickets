export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface IStudentOccupation {
  university: string;
  course: string;
  year: string;
}

export interface IEmployeeOccupation {
  company: string;
  position: string;
  experience: string;
}

export interface IOwnerOccupation {
  companyName: string;
  industry: string;
  employeeCount: string;
}

export interface IOccupation {
  student?: IStudentOccupation;
  employee?: IEmployeeOccupation;
  owner?: IOwnerOccupation;
}

export interface UserResponse extends Omit<IUser, 'password'> {
    password?: string;
  }

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactNumber: string;
  type: string;
  gender: string;
  occupation?: IOccupation;
  tShirtSize?: string;
  mealPreferences?: string;
  address?: IAddress;
  createdAt: Date;
}
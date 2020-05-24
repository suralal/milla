import { AuthService } from './auth.services';
import { GetUserDetailsService } from './get-user-details.service';
import { UpdateUserDetailsService } from './update-user-details.service';

export * from './auth.services';
export * from './get-user-details.service';
export * from './update-user-details.service';

export const SERVICES = [
  AuthService,
  GetUserDetailsService,
  UpdateUserDetailsService
];

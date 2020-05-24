import { GetUserDetailsEffect } from './get-user-details.effect';
import { UpdateUserDetailsEffect } from './update-user-details.effect';

export * from './get-user-details.effect';
export * from './update-user-details.effect';
export const AUTH_EFFECTS = [GetUserDetailsEffect, UpdateUserDetailsEffect];

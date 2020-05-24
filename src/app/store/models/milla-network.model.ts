import { MillaGender } from './milla-gender.enum';

export class MillaNetwork {
  id?: string;
  title?: string;
  description?: string;
  language?: string;
  client_age?: number;
  client_gender?: MillaGender;
  image_url?: string;
  thumbnail_url?: string;
  current_user_role?: string;
  nbr_events?: number;
  nbr_online?: number;
}

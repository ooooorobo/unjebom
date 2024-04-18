import { Database } from '~/shared/db/types/database.types';

export type Schedule = {
  date: string;
};

export type Participant = Database['public']['Tables']['participant']['Row'] & { schedule: Schedule };
//          ^?

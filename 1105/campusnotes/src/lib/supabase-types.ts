// Temporary type definitions until Supabase types are generated
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: any;
      notes: any;
      subjects: any;
      tags: any;
      comments: any;
      scraps: any;
      reports: any;
      study_groups: any;
      notifications: any;
      point_history: any;
      request_posts: any;
    };
  };
}

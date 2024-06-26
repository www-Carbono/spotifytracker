export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      checkupdated: {
        Row: {
          artist: string | null
          artistfollowers: string | null
          FollowersDateUpdate: string | null
          id: number
          ListenersDateUpdate: string | null
          monthlylisteners: string | null
          songname: string | null
          songviews: string | null
          ViewsDateUpdate: string | null
        }
        Insert: {
          artist?: string | null
          artistfollowers?: string | null
          FollowersDateUpdate?: string | null
          id?: number
          ListenersDateUpdate?: string | null
          monthlylisteners?: string | null
          songname?: string | null
          songviews?: string | null
          ViewsDateUpdate?: string | null
        }
        Update: {
          artist?: string | null
          artistfollowers?: string | null
          FollowersDateUpdate?: string | null
          id?: number
          ListenersDateUpdate?: string | null
          monthlylisteners?: string | null
          songname?: string | null
          songviews?: string | null
          ViewsDateUpdate?: string | null
        }
        Relationships: []
      }
      followerstracker: {
        Row: {
          artistname: string | null
          coverlink: string | null
          id: string
          monthlylisteners: Json | null
          songlink: string | null
          userId: string | null
        }
        Insert: {
          artistname?: string | null
          coverlink?: string | null
          id?: string
          monthlylisteners?: Json | null
          songlink?: string | null
          userId?: string | null
        }
        Update: {
          artistname?: string | null
          coverlink?: string | null
          id?: string
          monthlylisteners?: Json | null
          songlink?: string | null
          userId?: string | null
        }
        Relationships: []
      }
      monthlylistenerstracker: {
        Row: {
          artistname: string | null
          coverlink: string | null
          id: string
          monthlylisteners: Json | null
          songlink: string | null
          userId: string | null
        }
        Insert: {
          artistname?: string | null
          coverlink?: string | null
          id?: string
          monthlylisteners?: Json | null
          songlink?: string | null
          userId?: string | null
        }
        Update: {
          artistname?: string | null
          coverlink?: string | null
          id?: string
          monthlylisteners?: Json | null
          songlink?: string | null
          userId?: string | null
        }
        Relationships: []
      }
      spotifytracker: {
        Row: {
          artistName: string | null
          coverlink: string | null
          id: string
          songlink: string | null
          songName: string | null
          userId: string | null
          viewsTest: Json
        }
        Insert: {
          artistName?: string | null
          coverlink?: string | null
          id?: string
          songlink?: string | null
          songName?: string | null
          userId?: string | null
          viewsTest: Json
        }
        Update: {
          artistName?: string | null
          coverlink?: string | null
          id?: string
          songlink?: string | null
          songName?: string | null
          userId?: string | null
          viewsTest?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_columns: {
        Args: {
          schema_name_in: string
          table_name_in: string
          column_name_in: string
          type_in: string
          is_array: boolean
        }
        Returns: string
      }
      testing: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never

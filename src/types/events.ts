export interface Event {
  id: number;
  external_id: string;
  category: string;
  created_at: string;
  organizer_company_id: string;
  sell_mode: string;
  slots?: Session[];
}

export interface Session {
  id: number;
  external_id: string;
  uuid: string;
  starts_at: string;
  ends_at: string;
  sell_from: string;
  sell_to: string;
  sold_out: boolean;
  created_at: string;
  zones?: Zone[];
}

export interface Zone {
  id: number;
  external_id: string;
  uuid: string;
  name: string;
  price: string;
  capacity: number;
  numbered: boolean;
  created_at: string;
}

export interface EventsListProps {
  events: Event[];
  loading: boolean;
  error: string | null;
}

export interface DateRangePickerProps {
  onDateChange: (startDate: Date, endDate: Date) => void;
}

export interface EventCardProps {
  event: Event;
}

export interface SessionsListProps {
  slots?: Session[];
}

export interface ZonesListProps {
  zones: Zone[];
}

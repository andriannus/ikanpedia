import { format } from "date-fns";
import { id } from "date-fns/locale";

import { DATE_LONG_FORMAT, DATE_TIME_LONG_ISO_FORMAT } from "./date.constant";

export function transformToDateLongFormat(date: Date): string {
  return format(date, DATE_LONG_FORMAT, {
    locale: id,
  });
}

export function transformToDateTimeLongIsoFormat(date: Date): string {
  return format(date, DATE_TIME_LONG_ISO_FORMAT);
}

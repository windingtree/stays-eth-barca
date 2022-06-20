import { DateTime } from 'luxon';
import { getDayZero } from '../config';

const dayZero = getDayZero();

export const getDate = (days: number) => DateTime.fromMillis(
  DateTime.fromMillis(dayZero * 1000)
    .set({ hour: 1 })
    .toMillis() + days * 86400 * 1000
);

// const target = DateTime.fromISO('2022-07-03').diff(DateTime.fromISO('2022-02-22'), 'days');
// console.log('@@@@@', target.days);
// console.log('#####', DateTime.fromISO('2022-02-22').plus({ days: 134 }).toISO());

// * Hotel Pulitzer	06-07-2022 → 09-07-2022
// * Hotel Roger De Lluria 06-07-2022 → 09-07-2022
// * Hotel Regina 	06-07-2022 → 09-07-2022
// * Le Méridien Barcelona	06-07-2022 → 08-07-2022
// * Sercotel Porta de Barcelona	04-07-2022 → 10-07-2022
// * Sercotel Sant Boi	04-07-2022 → 10-07-2022
// * Sercotel Cornella	04-07-2022 → 10-07-2022
// CoImpact Coliving	03-07-2022 → 08-07-2022

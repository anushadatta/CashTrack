import { TimeagoFormatter, TimeagoIntl } from "ngx-timeago";

export class TimeagoCustomFormatter implements TimeagoFormatter {
    // constructor(private intl: TimeagoIntl) {}

    format(then: number): string {
        const { suffix, value, unit } = defaultFormatter(then);
        return this.parse(value, unit, suffix);
    }

    private parse(value, unit, suffix) {
        if (unit === "second") {
            value = "a few"
        }
        if (value !== 1) {
            unit += "s";
        }
        return value + " " + unit + " " + suffix;
    }
}

/**
 * UTILS
 */
const defaultFormatter = function (
    then: number
): { value: number; unit: Unit; suffix: Suffix } {
    const now = Date.now();
    const seconds = Math.round(Math.abs(now - then) / 1000);
    const suffix: Suffix = then < now ? "ago" : "from now";
    const [value, unit]: [number, Unit] =
        seconds < MINUTE 
            ? [Math.round(seconds), "second"]
            : seconds < HOUR
            ? [Math.round(seconds / MINUTE), "minute"]
            : seconds < DAY
            ? [Math.round(seconds / HOUR), "hour"]
            : seconds < WEEK
            ? [Math.round(seconds / DAY), "day"]
            : seconds < MONTH
            ? [Math.round(seconds / WEEK), "week"]
            : seconds < YEAR
            ? [Math.round(seconds / MONTH), "month"]
            : [Math.round(seconds / YEAR), "year"];

    return { value, unit, suffix };
};

type Suffix = "ago" | "from now";

type Unit = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

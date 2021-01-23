import { Observable, interval } from "rxjs";
import { TimeagoClock } from "ngx-timeago";

/**
 * This class is a custom implementation of the clock counter
 */
export class CustomClock extends TimeagoClock {
    tick(then: number): Observable<number> {
        return interval(1000 * 1); // 1sec
    }
}

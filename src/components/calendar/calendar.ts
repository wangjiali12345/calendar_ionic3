import { Component, Input} from '@angular/core';

@Component({
    selector: 'calendar',
    templateUrl: 'calendar.html'
})
export class CalendarComponent {
    month: Array<number>;
    @Input() today: Date;
    @Input() displaytype: string = 'week';
    wHead: string[] = ['日', '一', '二', '三', '四', '五', '六'];
    selectedDay: Date; //被选择的日期
    reallyToday: Date;  //真正的Today
    constructor() {
        this.today = new Date();
        this.reallyToday = new Date();
        this.selectedDay = new Date(this.today);
        this.createMonth(this.today.toISOString());
    }

    createMonth(date: string) {
        var month = new Array();
        var firstday = new Date(date);
        firstday.setDate(1);
        var firstdayNextMonth = new Date(date); 
        if (firstday.getMonth() < 11) {
            firstdayNextMonth.setDate(1);
            firstdayNextMonth.setMonth(firstday.getMonth()+1);
        } else {
            firstdayNextMonth.setDate(31);
            firstdayNextMonth.setMonth(firstdayNextMonth.getTime()+24*3600000);
        }
        var lastday = new Date(date);
        lastday.setTime(firstdayNextMonth.getTime() - 24 * 3600000);

        //开始写月份数据
        var month = [];
        var daynum = 0;
        var day = new Date();
        var ok = false;
        for (var i = 0; i <= 5; i++) {
            var weekday = new Array();
            for (var j = 0; j <= 6; j++) {
                //多种情况一起考虑
                if (i === 0 && j < firstday.getDay()) {
                    //属于前月的
                    var day = new Date();
                    day.setTime(firstday.getTime() - ((firstday.getDay() - j) * 24 * 3600000));
                    weekday.push({day:day});
                } else {
                    //属于这个月的
                    if (daynum < lastday.getDate()) {
                        var day = new Date();
                        day.setTime(firstday.getTime() + daynum * 24 * 3600000);
                       
                        weekday.push({ day: day, selected: true });
                        if (daynum === lastday.getDate() && lastday.getDay() === 6) {
                            ok = true;
                        }
                        daynum++;
                    } else {
                        //属于后月
                        var day = new Date();
                        day.setTime(lastday.getTime() + ((j - lastday.getDay()) * 24 * 3600000));
                        weekday.push({ day: day });
                        if (j === 6) {
                            ok = true;
                        }
                        daynum++;
                    }
                }

            }
            month.push(weekday);
            if (ok) {
                break;
            }
        }
        this.month = month;
        console.log(this.month);
    }

    ismonthtoday(index) {
        if (this.reallyToday.getDate() === index.day.getDate()) {
            return true;
        } else {
            return false;
        }
    }

    isSelectedmonthDay(index) {
        if (index.day.getDate() === this.selectedDay.getDate()&& this.selectedDay.getMonth() === index.day.getMonth()) {
            return true;
        } else {
            return false;
        }
    }

    selectmonthDay(index) {
        this.today = this.selectedDay = index.day;
        this.createMonth(this.today.toISOString());
    }

    toMonthDay(index) {
        return index.day.getDate();
    }

    

    
}
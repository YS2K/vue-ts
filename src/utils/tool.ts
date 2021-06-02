export default class ToolTs {
    // 时间转字符串
    public StringFormatter(date: any, formatter: string = 'yyyy-MM-dd') {
        let strDate: string = date.getFullYear() + '-';
        strDate += ((date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-';
        strDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        if (formatter === 'yyyy-MM-dd:hh:mm:ss') {
            strDate += ' ' + (date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()) + ':';
            strDate += (date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            strDate += (date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds());
        }
        return strDate;
    }
}

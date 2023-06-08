interface IformatDate {
    isoDate: string,
    format:
    "MM/dd/yyyy" | //ok
    "yyyy-MM-dd hh:mm:ss" | //ok
    "DD/MM/YYYY" | //ok
    "dddd, dd MMMM yyyy" |
    "dddd, dd MMMM yyyy HH:mm:ss" |
    "MM/dd/yyyy HH:mm" |
    "MM/dd/yyyy hh:mm tt" |
    "MM/dd/yyyy H:mm" |
    "MM/dd/yyyy h:mm tt" |
    "MM/dd/yyyy HH:mm:ss" |
    "MMMM dd" |
    "HH:mm" |
    "hh:mm tt" |
    "H:mm" |
    "h:mm tt" |
    "HH:mm:ss" | //ok
    "yyyy MMMM"
}

export default class DateFormat {

    private constructor() { }

    public static getISODateFromBRDate = (dateString: string) => {
        let splitDate = dateString.split("/");
        if (splitDate.length != 3) { return "" }
        let date = new Date(`${splitDate[2]}-${splitDate[1]}-${splitDate[0]} 00:00:00`);
        return date.toISOString();
    }


    public static formatDate = (props: IformatDate) => {
        let date = new Date(props.isoDate);
        let ano = date.getFullYear();
        let mes = ((date.getMonth() + 1).toString().padStart(2, "0"));
        let dia = (date.getDate().toString().padStart(2, "0"));
        let horas = (date.getHours()).toString().padStart(2, "0");
        let minutos = (date.getMinutes()).toString().padStart(2, "0");
        let segundos = (date.getSeconds()).toString().padStart(2, "0");

        switch (props.format) {
            case "yyyy-MM-dd hh:mm:ss":
                return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`
            case "HH:mm:ss":
                return `${horas}:${minutos}:${segundos}`
            case "MM/dd/yyyy":
                return `${mes}/${dia}/${ano}`
            case "DD/MM/YYYY":
                return `${dia}/${mes}/${ano}`
            default:
                return props.isoDate;
        }
    }

}


//https://www.c-sharpcorner.com/blogs/date-and-time-format-in-c-sharp-programming1

// Format	Result
// DateTime.Now.ToString("MM/dd/yyyy")	05/29/2015
// DateTime.Now.ToString("dddd, dd MMMM yyyy")	Friday, 29 May 2015
// DateTime.Now.ToString("dddd, dd MMMM yyyy")	Friday, 29 May 2015 05:50
// DateTime.Now.ToString("dddd, dd MMMM yyyy")	Friday, 29 May 2015 05:50 AM
// DateTime.Now.ToString("dddd, dd MMMM yyyy")	Friday, 29 May 2015 5:50
// DateTime.Now.ToString("dddd, dd MMMM yyyy")	Friday, 29 May 2015 5:50 AM
// DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss")	Friday, 29 May 2015 05:50:06
// DateTime.Now.ToString("MM/dd/yyyy HH:mm")	05/29/2015 05:50
// DateTime.Now.ToString("MM/dd/yyyy hh:mm tt")	05/29/2015 05:50 AM
// DateTime.Now.ToString("MM/dd/yyyy H:mm")	05/29/2015 5:50
// DateTime.Now.ToString("MM/dd/yyyy h:mm tt")	05/29/2015 5:50 AM
// DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss")	05/29/2015 05:50:06
// DateTime.Now.ToString("MMMM dd")	May 29
// DateTime.Now.ToString("yyyy’-‘MM’-‘dd’T’HH’:’mm’:’ss.fffffffK")	2015-05-16T05:50:06.7199222-04:00
// DateTime.Now.ToString("ddd, dd MMM yyy HH’:’mm’:’ss ‘GMT’")	Fri, 16 May 2015 05:50:06 GMT
// DateTime.Now.ToString("yyyy’-‘MM’-‘dd’T’HH’:’mm’:’ss")	2015-05-16T05:50:06
// DateTime.Now.ToString("HH:mm")	05:50
// DateTime.Now.ToString("hh:mm tt")	05:50 AM
// DateTime.Now.ToString("H:mm")	5:50
// DateTime.Now.ToString("h:mm tt")	5:50 AM
// DateTime.Now.ToString("HH:mm:ss")	05:50:06
// DateTime.Now.ToString("yyyy MMMM")	2015 May
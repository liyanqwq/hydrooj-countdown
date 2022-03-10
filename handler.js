const { Route, Handler } = global.Hydro.service.server;
const { PRIV } = global.Hydro.model.builtin;
const system = global.Hydro.model.system;
const { NotFoundError } = global.Hydro.error;
const { PermissionError } = global.Hydro.error;
const yaml = require('js-yaml');
const moment = require('moment');
class CountdownGetDateHandler extends Handler {
    async get() {
        var hdoc = yaml.load(system.get('hydrooj.homepage'));
        var content = new Array();
        var dateToday = moment().format("YYYY-MM-DD");
        var dates = new Array(hdoc[1]['countdown']['dates']);
        dates = dates[0];
        console.log(dates);
        dates.forEach(function(val,ind){
            if(content.length < hdoc[1]['countdown']['max_dates']){
                if(moment(val.date).isSameOrAfter(dateToday)){
                    // console.log(val);
                    var diffTime = moment(val.date).diff(moment(), 'days');
                    // console.log(diffTime);
                    content.push({
                        name: val.name,
                        diff: diffTime
                    })
                }
            }
        });
        this.response.body = content;
    }
}

async function apply() {
    Route('countdown_getdate', '/countdown/getdate', CountdownGetDateHandler);
}

global.Hydro.handler.countdown = apply;
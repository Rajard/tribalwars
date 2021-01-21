var fixtime = 0;
var dtime = 100;
var usepctime = 0;
var table_ind = findattacktableindex();
var durtr_num = finddurrownum(table_ind);
if (!table_ind.getElementsByTagName('tr')[durtr_num + 5]) {
    var planrow_num = findlastrownum(table_ind) + 1;
    var timer;
    var dur_arr = [];
    var dur_ms = getdurbyserv(table_ind, durtr_num);
    var server_time = new Date();
    var last_servertime_sec = -1;
    var pagetimefix = 0;
    getservertime();
    var landing_time = new Date();
    var launch_time = new Date();
    var fixtimezone = getfixtimezone();
    getlandingtime(dur_ms, fixtime, fixtimezone);
    var planned_time = new Date();
    getlaunchtime(dur_ms);
    var inputs_ind = [];
    addnewrows(table_ind, durtr_num);
    var back_timer;
    refresh()
} else {
    if ((-readbacktimer()) > (-dtime / 1000)) document.forms[0].submit.click()
}

function refresh() {
    fixtime = -(-inputs_ind[3].value);
    dtime = -(-inputs_ind[4].value);
    usepctime = inputs_ind[5].checked;
    planned_time = new Date(inputs_ind[8].value, inputs_ind[7].value - 1, inputs_ind[6].value, inputs_ind[9].value, inputs_ind[10].value, inputs_ind[11].value);
    planned_time.setMilliseconds(inputs_ind[12].value);
    getservertime();
    getlandingtime(dur_ms, fixtime, fixtimezone);
    getlaunchtime(dur_ms);
    back_timer = "" + (planned_time - landing_time) / 1000;
    table_ind.getElementsByTagName('tr')[planrow_num + 3].getElementsByTagName('td')[1].innerHTML = launch_time.toLocaleString() + "<font color=gray size=&quot;-1&quot;>" + (((launch_time.getMilliseconds() / 1000) + "00.000").match(/\.\d\d\d/)) + "</font>";
    table_ind.getElementsByTagName('tr')[planrow_num + 4].getElementsByTagName('td')[1].innerHTML = landing_time.toLocaleString() + "<font color=gray size=&quot;-1&quot;>" + (((landing_time.getMilliseconds() / 1000) + "00.000").match(/\.\d\d\d/)) + "</font>";
    if (back_timer < 60) {
        table_ind.getElementsByTagName('tr')[planrow_num + 5].getElementsByTagName('td')[1].innerHTML = "<font color=red><b>" + (back_timer.match(/-?\d+/)) + "</b></font><font color=gray size=&quot;-1&quot;>" + ((back_timer + "00.000").match(/\.\d\d\d/)) + "</font>"
    } else {
        table_ind.getElementsByTagName('tr')[planrow_num + 5].getElementsByTagName('td')[1].innerHTML = (back_timer.match(/-?\d+/)) + "<font color=gray size=&quot;-1&quot;>" + ((back_timer + "00.000").match(/\.\d\d\d/)) + "</font>"
    }
    if (back_timer < 0.010 && back_timer > -0.200) document.getElementById('troop_confirm_go').click();
    timer = setTimeout("refresh()", dtime)
}

function findattacktableindex() {
    for (var f = 10; f <= 50; f++) {
        if (document.getElementsByTagName('tbody')[f])
            if ((document.getElementsByTagName('tbody')[f].innerHTML).match(/id="date_arrival"/g)) var a = f
    }
    var b = document.getElementsByTagName('tbody')[a];
    return b
}

function finddurrownum(a) {
    var b = 3;
    for (f = 1; f <= 4; f++) {
        if (a.getElementsByTagName('tr')[f].getElementsByTagName('td')[1].id == 'date_arrival') b = f - 1
    }
    return b
}

function findlastrownum(a) {
    var b = a.getElementsByTagName('tr').length;
    return b - 1
}

function getdurbyserv(a, b) {
    var c = a.getElementsByTagName('tr')[b].getElementsByTagName('td')[1].innerHTML;
    var d = c.match(/\d+/g);
    var e = -(-(d[0] * 3600) - (d[1] * 60) - d[2]) * 1000;
    return e
}

function getservertime() {
    server_time = new Date();
    if (usepctime == 0) {
        var a = (document.getElementById('serverTime').innerHTML).match(/\d+/g);
        if ((-last_servertime_sec) != (-a[2])) {
            last_servertime_sec = a[2];
            var b = (document.getElementById('serverDate').innerHTML).match(/\d+/g);
            var c = new Date(b[2], b[1] - 1, b[0], a[0], a[1], a[2]);
            pagetimefix = c - server_time
        }
        server_time.setMilliseconds(server_time.getMilliseconds() + pagetimefix)
    }
}

function getfixtimezone() {
    if (usepctime == 1) {
        getservertime();
        var a = 1800000 * Math.round((new Date() - server_time) / 1800000)
    } else var a = 0;
    return a
}

function getlandingtime(a, b, c) {
    landing_time = new Date(server_time);
    landing_time.setMilliseconds(server_time.getMilliseconds());
    landing_time.setMilliseconds(landing_time.getMilliseconds() + a + b - c)
}

function getlaunchtime(a) {
    launch_time = new Date(planned_time);
    launch_time.setMilliseconds(planned_time.getMilliseconds());
    launch_time.setMilliseconds(launch_time.getMilliseconds() - a)
}

function readbacktimer() {
    var a = findlastrownum(table_ind);
    if (table_ind.getElementsByTagName('tr')[a].getElementsByTagName('td')[1].textContent) var b = table_ind.getElementsByTagName('tr')[a].getElementsByTagName('td')[1].textContent;
    else var b = table_ind.getElementsByTagName('tr')[a].getElementsByTagName('td')[1].innerText;
    return b
}

function addnewrows(a, b) {
    if (!a.getElementsByTagName('tr')[b + 5]) {
        var c = new Date(landing_time);
        c.setMinutes(c.getMinutes() + 2);
        a.innerHTML = a.innerHTML + "<tr><th colspan=2>Plan</th></tr><tr><td colspan=2>fixtime<input type=text value=" + fixtime + " size=3> dtime<input type=text value=" + dtime + " size=3> usepctime<input type=checkbox name=planpctime value=1></td></tr><tr><td>Planned Time</td><td><input type=text value=" + c.getDate() + " size=2>/<input type=text value=" + (c.getMonth() + 1) + " size=2>/<input type=text value=" + c.getFullYear() + " size=4><br><input type=text value=" + c.getHours() + " size=2>:<input type=text value=" + c.getMinutes() + " size=2>:<input type=text value=" + c.getSeconds() + " size=2>.<input type=text value=" + c.getMilliseconds() + " size=3></td></tr><tr><td>Launch Time</td><td>" + launch_time.toLocaleString() + "</td></tr><tr><td>Landing Time</td><td>" + landing_time.toLocaleString() + "</td></tr><tr><td>Timer</td><td>-</td></tr>"
    }
    inputs_ind = table_ind.getElementsByTagName('input');
    if (usepctime == 1) inputs_ind[5].checked = 1
}

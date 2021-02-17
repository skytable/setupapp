/*
 * Created on Tue Nov 03 2020
 *
 * This file is a part of the TerrabaseDB setup app
 * Copyright (c) 2020, Sayan Nandan <ohsayan at outlook dot com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
*/

const host = document.getElementById("host");
const port = document.getElementById("port");
const snapevery = document.getElementById("snapevery");
const snapkeep = document.getElementById("snapkeep");
const bgsaveDur = document.getElementById('bgsavedur');
const snapEnabled = document.getElementById('snap-y');
const bgsaveEnabled = document.getElementById('bgsave-y');
const res = document.getElementById("res");
const code = document.getElementById("launch-code");
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
function snapBtn() {
  if (snapEnabled.checked) {
    snapevery.disabled = false;
    snapevery.placeholder = "Duration";
    snapkeep.disabled = false;
    snapkeep.placeholder = "Number of snapshots";
  } else {
    snapevery.disabled = true;
    snapevery.placeholder = "";
    snapkeep.disabled = true;
    snapkeep.placeholder = "";
  }
}
function bgsaveBtn() {
  if (bgsaveEnabled.checked) {
    bgsaveDur.disabled = false;
    bgsaveDur.placeholder = "120";
  } else {
    bgsaveDur.disabled = true;
    bgsaveDur.placeholder = "";
  }
}
function check() {
  var command = "sdb";
  var host_val = host.value.toString();
  if (host_val.length === 0) {
    host_val = "127.0.0.1";
  }
  command += " -h " + host_val;
  var port_val = 2003;
  if (port.value.length != 0) {
    var pv = parseInt(port.value.toString());
    if (isNaN(pv)) {
      alert("Invalid value for port!");
      res.hidden = true;
      scrollUp();
      return;
    } else {
      port_val = pv;
    }
  }
  if ((port_val > 65535) || (port_val < 0)) {
    alert("Invalid port range!");
    res.hidden = true;
    scrollUp();
    return;
  }
  command += " -p " + port_val.toString();
  if (bgsaveEnabled.checked) {
    var dur = bgsaveDur.value;
    if (!dur.length == 0) {
      if (isNaN(parseInt(dur))) {
        alert("Invalid value for BGSAVE duration!");
        res.hidden = true;
        scrollUp();
        return;
      } else {
        command += " --saveduration " + dur;
      }
    }
  } else {
    command += " --nosave";
  }
  if (snapEnabled.checked) {
    var every = snapevery.value.toString();
    var atmost = snapkeep.value.toString();
    var every = parseInt(every);
    if (!isNaN(every)) {
      command += " --snapevery " + every;
    } else {
      alert("Invalid value for snapshot duration");
      res.hidden = true;
      scrollUp();
      return;
    }
    var keep = parseInt(atmost);
    if (isNaN(keep)) {
      alert("Invalid value for number of snapshots!");
      res.hidden = true;
      scrollUp();
      return;
    } else {
      command += " --snapkeep " + keep;
    }
  }
  code.innerText = command;
  code.readOnly = true;
  res.hidden = false;
  scrollDown();
}

function scrollDown() {
  $("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
}

function scrollUp() {
  $("html, body").animate({ scrollTop: 0 });
}
const admin=JSON.parse(localStorage.getItem("cc_session")||"null");
if(!admin||admin.role!=="admin")window.location.href="index.html";
if(admin)document.getElementById("adminName").textContent=admin.name;
function getAppointments(){return JSON.parse(localStorage.getItem("cc_appointments")||"[]")}
function saveAppointments(a){localStorage.setItem("cc_appointments",JSON.stringify(a))}
function refreshAdmin(){
 const a=getAppointments(),u=JSON.parse(localStorage.getItem("cc_users")||"[]");
 document.getElementById("statAppointments").textContent=a.length;
 document.getElementById("statConfirmed").textContent=a.filter(x=>x.status==="Confirmed").length;
 document.getElementById("statUsers").textContent=u.filter(x=>x.role==="user").length;
 document.getElementById("adminAppointmentTable").innerHTML=a.length?a.map(x=>`<tr><td>${x.patient}</td><td>${x.doctor}</td><td>${formatDate(x.date)}</td><td>${x.time}</td><td><span class="badge ${x.status==="Cancelled"?"cancelled":""}">${x.status}</span></td><td>${x.status==="Confirmed"?`<button class="action danger" onclick="cancelAppointment(${x.id})">Cancel</button>`:"—"}</td></tr>`).join(""):`<tr><td colspan="6">No appointments.</td></tr>`;
 document.getElementById("userTable").innerHTML=u.filter(x=>x.role==="user").map(x=>`<tr><td>${x.name}</td><td>${x.email}</td><td><span class="badge">Patient</span></td></tr>`).join("");
 document.getElementById("adminDoctors").innerHTML=doctors.map(d=>`<article class="doctor-card"><div class="doctor-avatar">${d.icon}</div><h3>${d.name}</h3><div class="speciality">${d.speciality}</div><p>${d.exp} experience</p><span class="badge">Available</span></article>`).join("");
}
function formatDate(d){return new Date(d+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
function cancelAppointment(id){if(!confirm("Cancel this appointment?"))return;const a=getAppointments();const x=a.find(v=>v.id===id);if(x)x.status="Cancelled";saveAppointments(a);refreshAdmin()}
function showSection(id,btn){document.querySelectorAll(".dash-section").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");document.querySelectorAll(".side-link").forEach(b=>b.classList.remove("active"));if(btn)btn.classList.add("active")}
function logout(){localStorage.removeItem("cc_session");window.location.href="index.html"}
refreshAdmin();

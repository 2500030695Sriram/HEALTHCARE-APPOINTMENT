function session(){
  const s=JSON.parse(localStorage.getItem("cc_session")||"null");
  if(!s||s.role!=="user"){window.location.href="index.html";return null} return s;
}
const current=session();
if(current){
  document.getElementById("userName").textContent=current.name;
  document.getElementById("userEmail").textContent=current.email;
  document.getElementById("profileName").textContent=current.name;
  document.getElementById("profileEmail").textContent=current.email;
}
const doctorSelect=document.getElementById("doctor");
doctorSelect.innerHTML='<option value="">Select doctor</option>'+doctors.map(d=>`<option value="${d.id}">${d.name} — ${d.speciality}</option>`).join("");
function getAppointments(){return JSON.parse(localStorage.getItem("cc_appointments")||"[]")}
function saveAppointments(a){localStorage.setItem("cc_appointments",JSON.stringify(a))}
function myAppointments(){return getAppointments().filter(a=>a.user===current.email)}
function refresh(){
  const list=myAppointments();
  document.getElementById("totalCount").textContent=list.length;
  document.getElementById("upcomingCount").textContent=list.filter(a=>a.status==="Confirmed").length;
  const tbody=document.getElementById("appointmentTable");
  tbody.innerHTML=list.length?list.map(a=>`<tr><td>${a.doctor}</td><td>${a.speciality}</td><td>${formatDate(a.date)}</td><td>${a.time}</td><td><span class="badge ${a.status==="Cancelled"?"cancelled":""}">${a.status}</span></td><td>${a.status!=="Cancelled"?`<button class="action danger" onclick="cancelAppointment(${a.id})">Cancel</button>`:"—"}</td></tr>`).join(""):`<tr><td colspan="6">No appointments yet.</td></tr>`;
  const next=list.find(a=>a.status==="Confirmed");
  document.getElementById("nextAppointment").innerHTML=next?`<div class="profile"><div class="doctor-avatar">🩺</div><div><h3>${next.doctor}</h3><p>${next.speciality}</p><strong>${formatDate(next.date)} • ${next.time}</strong></div></div>`:`<p class="muted">No upcoming appointment. Book one now.</p>`;
}
function formatDate(d){return new Date(d+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
function bookAppointment(e){
 e.preventDefault();
 const d=doctors.find(x=>x.id==document.getElementById("doctor").value);
 const date=document.getElementById("date").value,time=document.getElementById("time").value,reason=document.getElementById("reason").value.trim();
 if(!d)return;
 const a=getAppointments();
 a.push({id:Date.now(),user:current.email,patient:current.name,doctor:d.name,speciality:d.speciality,date,time,reason,status:"Confirmed"});
 saveAppointments(a);document.getElementById("bookMessage").style.color="#147d76";document.getElementById("bookMessage").textContent="Appointment booked successfully!";
 e.target.reset();refresh();showSection("appointments");
}
function cancelAppointment(id){
 if(!confirm("Cancel this appointment?"))return;
 const a=getAppointments();const item=a.find(x=>x.id===id);if(item)item.status="Cancelled";saveAppointments(a);refresh();
}
function showSection(id,btn){
 document.querySelectorAll(".dash-section").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");
 document.querySelectorAll(".side-link").forEach(b=>b.classList.remove("active"));if(btn)btn.classList.add("active");
}
function logout(){localStorage.removeItem("cc_session");window.location.href="index.html"}
refresh();

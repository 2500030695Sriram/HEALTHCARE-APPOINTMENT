const doctors = [
  {id:1,name:"Dr. Ananya Rao",speciality:"General Physician",exp:"8 years",icon:"👩‍⚕️"},
  {id:2,name:"Dr. Rahul Mehta",speciality:"Cardiologist",exp:"12 years",icon:"👨‍⚕️"},
  {id:3,name:"Dr. Priya Sharma",speciality:"Dermatologist",exp:"7 years",icon:"👩‍⚕️"},
  {id:4,name:"Dr. Arjun Kumar",speciality:"Pediatrician",exp:"10 years",icon:"👨‍⚕️"}
];

function seedData(){
  if(!localStorage.getItem("cc_users")){
    localStorage.setItem("cc_users",JSON.stringify([
      {name:"Admin",email:"admin@careconnect.com",password:"admin123",role:"admin"},
      {name:"Demo Patient",email:"user@careconnect.com",password:"user123",role:"user"}
    ]));
  }
  if(!localStorage.getItem("cc_appointments")){
    localStorage.setItem("cc_appointments",JSON.stringify([
      {id:Date.now(),user:"user@careconnect.com",patient:"Demo Patient",doctor:"Dr. Ananya Rao",speciality:"General Physician",date:"2026-10-05",time:"10:00 AM",reason:"Routine check-up",status:"Confirmed"}
    ]));
  }
}
seedData();

function renderDoctors(){
  const el=document.getElementById("doctorCards"); if(!el)return;
  el.innerHTML=doctors.map(d=>`
    <article class="doctor-card">
      <div class="doctor-avatar">${d.icon}</div>
      <h3>${d.name}</h3><div class="speciality">${d.speciality}</div>
      <p>${d.exp} experience • Available today</p>
      <button class="btn btn-primary full" onclick="openAuth('login')">Book Appointment</button>
    </article>`).join("");
}
renderDoctors();

function openAuth(mode){document.getElementById("authModal").classList.remove("hidden");switchAuth(mode)}
function closeModal(id){document.getElementById(id).classList.add("hidden")}
function switchAuth(mode){
  document.getElementById("loginForm").classList.toggle("hidden",mode!=="login");
  document.getElementById("signupForm").classList.toggle("hidden",mode!=="signup");
  document.getElementById("loginTab").classList.toggle("active",mode==="login");
  document.getElementById("signupTab").classList.toggle("active",mode==="signup");
  document.getElementById("authMessage").textContent="";
}
function getUsers(){return JSON.parse(localStorage.getItem("cc_users")||"[]")}
function signup(e){
  e.preventDefault();
  const name=document.getElementById("signupName").value.trim();
  const email=document.getElementById("signupEmail").value.trim().toLowerCase();
  const password=document.getElementById("signupPassword").value;
  const users=getUsers();
  if(users.some(u=>u.email===email)){document.getElementById("authMessage").textContent="Email already registered.";return}
  users.push({name,email,password,role:"user"});localStorage.setItem("cc_users",JSON.stringify(users));
  document.getElementById("authMessage").style.color="#147d76";
  document.getElementById("authMessage").textContent="Account created. You can now login.";
  setTimeout(()=>switchAuth("login"),700);
}
function login(e){
  e.preventDefault();
  const email=document.getElementById("loginEmail").value.trim().toLowerCase();
  const password=document.getElementById("loginPassword").value;
  const user=getUsers().find(u=>u.email===email&&u.password===password);
  const msg=document.getElementById("authMessage");
  if(!user){msg.style.color="#d9534f";msg.textContent="Invalid email or password.";return}
  localStorage.setItem("cc_session",JSON.stringify(user));
  window.location.href=user.role==="admin"?"admin.html":"user.html";
}
function toggleMenu(){
  const n=document.querySelector("nav"); n.style.display=n.style.display==="flex"?"none":"flex";
  if(window.innerWidth<=900){n.style.position="absolute";n.style.top="76px";n.style.left="0";n.style.right="0";n.style.background="#fff";n.style.padding="20px";n.style.flexDirection="column"}
}

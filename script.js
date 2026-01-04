let user = {};

function show(id){
document.querySelectorAll("section").forEach(s=>s.style.display="none");
document.getElementById(id).style.display="block";
loadTransactions();
}

function register(){
user.name = name.value;
user.email = email.value;
user.mobile = mobile.value;
user.event = event.value;

if(!user.name || !user.email || !user.mobile || user.event=="Select Event"){
alert("Fill all details");
return;
}

alert("Registration Successful");
show('payment');
}

function pay(mode){
user.mode = mode;
user.amount = "₹500";
saveTransaction();
generateReceipt();
generatePass();
alert("Payment Successful\nReceipt & Pass downloaded");
show('transactions');
}

function saveTransaction(){
let t = JSON.parse(localStorage.getItem("tx") || "[]");
t.push(user);
localStorage.setItem("tx", JSON.stringify(t));
}

function loadTransactions(){
let t = JSON.parse(localStorage.getItem("tx") || "[]");
tbody.innerHTML = "";
t.forEach(x=>{
tbody.innerHTML += `
<tr>
<td>${x.name}</td>
<td>${x.event}</td>
<td>${x.mode}</td>
<td>${x.amount}</td>
</tr>`;
});
}

function generateReceipt(){
const {jsPDF} = window.jspdf;
let pdf = new jsPDF();
pdf.text("Payment Receipt",20,20);
pdf.text(`Name: ${user.name}`,20,40);
pdf.text(`Event: ${user.event}`,20,50);
pdf.text(`Mode: ${user.mode}`,20,60);
pdf.text(`Amount: ₹500`,20,70);
pdf.save("Payment_Receipt.pdf");
}

function generatePass(){
const {jsPDF} = window.jspdf;
let pdf = new jsPDF();
pdf.text("EVENT PASS",20,20);
pdf.text(`Name: ${user.name}`,20,40);
pdf.text(`Event: ${user.event}`,20,50);
pdf.text("Date: April 21 & 22, 2026",20,60);
pdf.text("Venue: GITAM UNIVERSITY",20,70);
pdf.save("Event_Pass.pdf");
}

function contact(){
alert("📞 9391676841\n📧 tsuriset@gitam.in");
}

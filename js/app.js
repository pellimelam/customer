/* ===================================== */
/* RAZORPAY KEY */
/* ===================================== */

const RAZORPAY_KEY = "rzp_live_SO4F7YCOOnRVRZ";

/* ===================================== */
/* MODAL */
/* ===================================== */

function openModal(){

const scrollY=window.scrollY;

document.body.dataset.scrollY=scrollY;

document.body.style.position='fixed';

document.body.style.top=`-${scrollY}px`;

document.body.style.left='0';

document.body.style.right='0';

document.body.style.width='100%';

document.body.style.overflow='hidden';

document.getElementById('modal').style.display='flex';

}



function closeModal(){

const scrollY=document.body.dataset.scrollY || '0';

document.body.style.position='';

document.body.style.top='';

document.body.style.left='';

document.body.style.right='';

document.body.style.width='';

document.body.style.overflow='auto';

window.scrollTo(0,parseInt(scrollY) || 0);

document.getElementById('modal').style.display='none';

}


function resetBodyScroll(){

document.body.style.position='';

document.body.style.top='';

document.body.style.left='';

document.body.style.right='';

document.body.style.width='';

document.body.style.overflow='auto';

}

/* ===================================== */
/* PAYMENT */
/* ===================================== */

function payNow(){

const name=document.getElementById('name').value.trim();

const mobile=document.getElementById('mobile').value.trim();

const address=document.getElementById('address').value.trim();

const amount=document.getElementById('amount').value.trim();

if(!name || !mobile || !address || !amount){

alert('Please fill all fields');

return;

}

if(!/^[6-9]\d{9}$/.test(mobile)){

alert('Please enter valid mobile number');

return;

}

if(parseInt(amount) < 1){

alert('Please enter valid amount');

return;

}

const payBtn=document.getElementById('payButton');



const options={

key:RAZORPAY_KEY,

amount:parseInt(amount)*100,

currency:'INR',

name:'Pellimelam',

description:'Wedding Advance Payment',

image:'https://customer.vidhwaan.com/icons/icon-512.png',

handler:function(response){

payBtn.disabled=false;

payBtn.style.opacity='1';

payBtn.innerHTML='Proceed Secure Payment';

resetBodyScroll();

requestAnimationFrame(()=>{

generateReceipt({

name,
mobile,
address,
amount,
paymentId:response.razorpay_payment_id

});

});

},

modal:{

ondismiss:function(){

payBtn.disabled=false;

payBtn.style.opacity='1';

payBtn.innerHTML='Proceed Secure Payment';

resetBodyScroll();

}

},

prefill:{
name:name,
contact:mobile
},

readonly:{
name:true,
contact:true
},

notes:{
address:address
},

theme:{
color:'#D4AF37'
}

};

try{

const rzp=new Razorpay(options);

rzp.on('payment.failed',function(){

payBtn.disabled=false;

payBtn.style.opacity='1';

payBtn.innerHTML='Proceed Secure Payment';

resetBodyScroll();

alert('Payment failed or cancelled.');

});

rzp.open();

payBtn.disabled=true;

payBtn.style.opacity='.7';

payBtn.innerHTML='Processing Payment...';
}catch(err){

alert('Payment failed. Please try again.');

payBtn.disabled=false;

payBtn.style.opacity='1';

payBtn.innerHTML='Proceed Secure Payment';

resetBodyScroll();

}

}

/* ===================================== */
/* RECEIPT */
/* ===================================== */

function generateReceipt(data){

window.latestReceipt=data;

closeModal();

document.getElementById('receipt').style.display='block';

document.getElementById('receiptContent').innerHTML=`

<div style="
background:#fff8dc;
padding:16px;
border-radius:18px;
line-height:1.6;
font-size:14px;
">

<div style="
text-align:center;
margin-bottom:14px;
">

<div style="
font-size:42px;
line-height:1;
margin-bottom:6px;
">
💛
</div>

<h2 style="
font-size:22px;
font-family:Cinzel,serif;
color:#111;
margin-bottom:2px;
">
Payment Successful
</h2>

<p style="
font-size:12px;
opacity:.7;
">
Pellimelam Wedding Advance
</p>

</div>

<div style="
background:#fff;
padding:14px;
border-radius:14px;
">

<p style="margin-bottom:8px;">
<strong>Name:</strong>
${data.name}
</p>

<p style="margin-bottom:8px;">
<strong>Mobile:</strong>
${data.mobile}
</p>

<p style="
margin-bottom:8px;
word-break:break-word;
">
<strong>Address:</strong>
${data.address}
</p>

<p style="margin-bottom:8px;">
<strong>Amount:</strong>
₹${data.amount}
</p>

<p>
<strong>Payment ID:</strong>
${data.paymentId}
</p>

</div>

<button
onclick="shareReceiptImage()"
style="
margin-top:14px;
width:100%;
padding:14px;
border:none;
border-radius:14px;
font-size:14px;
font-weight:800;
background:linear-gradient(135deg,#ffd700,#ffb700);
color:#000;
cursor:pointer;
">

📤 Share Receipt

</button>

</div>

`;

document.getElementById('receipt').scrollIntoView({

behavior:'smooth'

});

}

async function shareReceiptImage(){

try{

const receipt=document.getElementById('receipt');

const button=receipt.querySelector('[onclick="shareReceiptImage()"]');

if(button){
button.style.display='none';
}

const canvas=await html2canvas(receipt,{

scale:2,

useCORS:true,

backgroundColor:'#ffffff',

logging:false,

removeContainer:true

});

if(button){
button.style.display='block';
}

canvas.toBlob(async(blob)=>{

const file=new File(

[blob],

'pellimelam-receipt.png',

{type:'image/png'}

);

if(

navigator.canShare &&
navigator.canShare({files:[file]})

){

await navigator.share({

files:[file],

title:'Pellimelam Receipt'

});

}else{

const link=document.createElement('a');

link.href=URL.createObjectURL(blob);

link.download='pellimelam-receipt.png';

link.click();

setTimeout(()=>{

URL.revokeObjectURL(link.href);

},1000);

}

},'image/png',1);

}catch(err){

alert('Sharing not supported on this device.');

console.log(err);

}

}



window.onclick=function(e){

const modal=document.getElementById('modal');

if(e.target===modal){

closeModal();

}

}

window.openModal=openModal;
window.closeModal=closeModal;
window.payNow=payNow;
window.shareReceiptImage=shareReceiptImage;


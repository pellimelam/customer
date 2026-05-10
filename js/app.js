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

payBtn.disabled=true;

payBtn.style.opacity='.7';

payBtn.innerHTML='Processing Payment...';

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

setTimeout(()=>{

generateReceipt({

name,
mobile,
address,
amount,
paymentId:response.razorpay_payment_id

});

},500);

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

setTimeout(()=>{

rzp.open();

},150);

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

<p><strong>Customer Name:</strong> ${data.name}</p>

<p><strong>Mobile Number:</strong> ${data.mobile}</p>

<p><strong>Wedding Address:</strong> ${data.address}</p>

<p><strong>Advance Paid:</strong> ₹${data.amount}</p>

<p><strong>Payment ID:</strong> ${data.paymentId}</p>

<p><strong>Payment Date:</strong> ${new Date().toLocaleString()}</p>

<p><strong>Platform:</strong> pellimelam.vidhwaan.com</p>

`;

document.getElementById('receipt').scrollIntoView({

behavior:'smooth'

});

}

/* ===================================== */
/* WHATSAPP */
/* ===================================== */

function shareWhatsApp(){

const d=window.latestReceipt;

const text=`

✨ Pellimelam Wedding Advance Receipt ✨

👤 Name: ${d.name}

📞 Mobile: ${d.mobile}

💰 Advance Paid: ₹${d.amount}

🆔 Payment ID: ${d.paymentId}

🎁 Complimentary Benefits Included

✅ Website + App For ₹1
✅ 50% OFF Digital Services
✅ Bhagavad Gita Premium Access

🌐 pellimelam.vidhwaan.com

`;

window.open(

`https://wa.me/?text=${encodeURIComponent(text)}`,

'_blank'

);

}

/* ===================================== */
/* DOWNLOAD IMAGE */
/* ===================================== */

async function downloadReceipt(){

try{

const receipt=document.getElementById('receipt');

const buttons=receipt.querySelector('.receipt-actions');

buttons.style.display='none';

const canvas=await html2canvas(receipt,{

scale:1,

useCORS:true,

backgroundColor:'#ffffff',

logging:false,

allowTaint:false

});

buttons.style.display='flex';

canvas.toBlob(function(blob){

const link=document.createElement('a');

link.download='pellimelam-receipt.png';

link.href=URL.createObjectURL(blob);

link.click();

setTimeout(()=>{

URL.revokeObjectURL(link.href);

},1000);

},'image/png');

}catch(err){

alert('Unable to download receipt on this device.');

const buttons=document.querySelector('.receipt-actions');

if(buttons){
buttons.style.display='flex';
}

}

}

/* ===================================== */
/* CLOSE OUTSIDE */
/* ===================================== */

window.onclick=function(e){

const modal=document.getElementById('modal');

if(e.target===modal){

closeModal();

}

}


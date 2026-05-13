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

backdropclose:false,

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

payBtn.disabled=true;

payBtn.style.opacity='.7';

payBtn.innerHTML='Opening Secure Payment...';

document.activeElement.blur();

requestAnimationFrame(()=>{

rzp.open();

});

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

const shortAddress=

data.address.length > 55

? data.address.slice(0,55)+'...'

: data.address;

document.getElementById('receipt').style.display='block';

document.getElementById('receiptContent').innerHTML=`

<div style="
background:#fff;
border:1px solid #eee;
border-radius:18px;
padding:18px;
font-family:Poppins,sans-serif;
">

<div style="
display:flex;
align-items:center;
justify-content:space-between;
margin-bottom:14px;
">

<div>

<h2 style="
font-size:18px;
margin-bottom:2px;
color:#111;
font-family:Cinzel,serif;
">
Pellimelam
</h2>

<p style="
font-size:11px;
opacity:.6;
">
Wedding Advance Receipt
</p>

</div>

<div style="
font-size:30px;
">
💛
</div>

</div>

<div style="
background:#fafafa;
border-radius:14px;
padding:14px;
font-size:13px;
line-height:1.5;
">

<div style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
gap:12px;
">

<span style="opacity:.6;">Name</span>

<strong style="
text-align:right;
word-break:break-word;
">
${data.name}
</strong>

</div>

<div style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
gap:12px;
">

<span style="opacity:.6;">Mobile</span>

<strong>
${data.mobile}
</strong>

</div>

<div style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
gap:12px;
align-items:flex-start;
">

<span style="opacity:.6;">Address</span>

<strong style="
max-width:190px;
text-align:right;
word-break:break-word;
">
${shortAddress}
</strong>

</div>

<div style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
gap:12px;
">

<span style="opacity:.6;">Amount</span>

<strong>
₹${data.amount}
</strong>

</div>

<div style="
display:flex;
justify-content:space-between;
gap:12px;
align-items:flex-start;
">

<span style="opacity:.6;">Payment ID</span>

<strong style="
max-width:190px;
text-align:right;
word-break:break-word;
font-size:11px;
">
${data.paymentId}
</strong>

</div>

</div>

<button
onclick="shareReceiptImage()"
style="
margin-top:14px;
width:100%;
padding:13px;
border:none;
border-radius:14px;
font-size:14px;
font-weight:700;
background:#111;
color:#fff;
cursor:pointer;
">

Share Receipt

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

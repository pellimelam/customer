/* ===================================== */
/* PELLIMELAM FAMILY CELEBRATION STUDIO */
/* APP.JS PART 1                         */
/* ===================================== */



/* ===================================== */
/* GLOBAL VARIABLES                      */
/* ===================================== */

let selectedTheme = "gold";

let uploadedPhoto = null;



/* ===================================== */
/* DOM READY                             */
/* ===================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

initThemes();

initPhotoUpload();

}

);




/* ===================================== */
/* SMOOTH SCROLL                         */
/* ===================================== */

function scrollToForm(){

document

.getElementById("coupleForm")

.scrollIntoView({

behavior:"smooth",

block:"start"

});

}





/* ===================================== */
/* THEME SELECTION                       */
/* ===================================== */

function initThemes(){


const cards =

document.querySelectorAll(

".theme-card"

);



cards.forEach(

card=>{


card.addEventListener(

"click",

()=>{


cards.forEach(

c=>c.classList.remove(

"active"

)

);



card.classList.add(

"active"

);



selectedTheme=

card.dataset.theme;



applyTheme(

selectedTheme

);


}

);


}

);



}





/* ===================================== */
/* APPLY INVITATION THEME                */
/* ===================================== */

function applyTheme(theme){


const card=

document.getElementById(

"invitationCard"

);



if(!card)return;



switch(theme){


case "gold":


card.style.background=`

linear-gradient(

135deg,

rgba(60,45,0,.88),

rgba(20,20,20,.95)

),

url(

'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop'

)

`;

break;




case "temple":


card.style.background=`

linear-gradient(

135deg,

rgba(55,15,0,.82),

rgba(10,10,10,.92)

),

url(

'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop'

)

`;

break;




case "pink":


card.style.background=`

linear-gradient(

135deg,

rgba(140,60,90,.75),

rgba(30,20,20,.90)

),

url(

'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop'

)

`;

break;




case "black":


card.style.background=`

linear-gradient(

135deg,

rgba(0,0,0,.92),

rgba(40,40,40,.92)

),

url(

'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2070&auto=format&fit=crop'

)

`;

break;




case "telugu":


card.style.background=`

linear-gradient(

135deg,

rgba(70,0,0,.82),

rgba(30,0,0,.92)

),

url(

'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop'

)

`;

break;


}



card.style.backgroundSize="cover";

card.style.backgroundPosition="center";


}





/* ===================================== */
/* PHOTO UPLOAD                          */
/* ===================================== */

function initPhotoUpload(){


const photo=

document.getElementById(

"photo"

);



if(!photo)return;



photo.addEventListener(

"change",

e=>{


const file=

e.target.files[0];



if(!file)return;



const reader=

new FileReader();



reader.onload=

function(event){


uploadedPhoto=

event.target.result;



showPhotoPreview(

uploadedPhoto

);


};



reader.readAsDataURL(

file

);


}

);


}





/* ===================================== */
/* SHOW PHOTO ON CARD                    */
/* ===================================== */

function showPhotoPreview(src){


let img=

document.getElementById(

"couplePreview"

);



if(!img){


img=

document.createElement(

"img"

);



img.id=

"couplePreview";



img.style.width=

"150px";



img.style.height=

"150px";



img.style.objectFit=

"cover";



img.style.borderRadius=

"50%";



img.style.margin=

"0 auto 30px";



img.style.display=

"block";



img.style.border=

"4px solid #ffd700";



img.style.boxShadow=

"0 15px 40px rgba(255,215,0,.25)";



document

.querySelector(

".card-inner"

)

.prepend(

img

);


}



img.src=src;


}





/* ===================================== */
/* GENERATE INVITATION                   */
/* ===================================== */

function generateInvitation(){


const bride=

document

.getElementById(

"bride"

)

.value

.trim();



const groom=

document

.getElementById(

"groom"

)

.value

.trim();



const event=

document

.getElementById(

"event"

)

.value;



const date=

document

.getElementById(

"date"

)

.value;



const time=

document

.getElementById(

"time"

)

.value;



const venue=

document

.getElementById(

"venue"

)

.value

.trim();



const city=

document

.getElementById(

"city"

)

.value

.trim();



const quote=

document

.getElementById(

"quote"

)

.value

.trim();




if(

!bride ||

!groom ||

!date ||

!venue

){

alert(

"Please fill all required fields."

);

return;

}




document

.getElementById(

"previewBride"

)

innerText=bride;



document

.getElementById(

"previewGroom"

)

innerText=groom;



document

.getElementById(

"previewEvent"

)

innerText=event;



document

.getElementById(

"previewDate"

)

innerText=

formatDate(

date

);



document

.getElementById(

"previewTime"

)

.innerText=

time;



document

.getElementById(

"previewVenue"

)

.innerText=

venue+

", "+

city;





if(

quote!==''

){

document

.querySelector(

".invitation-message"

)

.innerText=

quote;

}



applyTheme(

selectedTheme

);





const card=

document

.getElementById(

"invitationCard"

);



card.animate(

[

{

opacity:0,

transform:

"translateY(40px)"

},

{

opacity:1,

transform:

"translateY(0)"

}

],

{

duration:800,

easing:

"ease"

}

);




card.scrollIntoView({

behavior:

"smooth"

});


}





/* ===================================== */
/* DATE FORMAT                           */
/* ===================================== */

function formatDate(dateString){


const date=

new Date(

dateString

);



return date.toLocaleDateString(

'en-IN',

{

day:'numeric',

month:'long',

year:'numeric'

}

);


}


/* ===================================== */
/* APP.JS PART 2                         */
/* ===================================== */



/* ===================================== */
/* DIVINE BLESSINGS                      */
/* ===================================== */

const blessings=[

`May your marriage be blessed with endless love,
prosperity and divine grace.

May every sunrise bring joy into your home
and every moment become a cherished memory.

✨ Wishing You A Lifetime Filled With Happiness ✨`,



`May Lord Venkateswara bless your beautiful journey.

May love, health and prosperity follow you always.

May your family be filled with joy forever.

💛 Stay Blessed Forever 💛`,



`Together may you laugh,

Together may you dream,

Together may you build

a beautiful life full of happiness.

✨ Congratulations ✨`,



`May your love grow stronger

with every passing day.

May peace, prosperity and happiness

always stay with you.

❤️ Best Wishes ❤️`

];



function generateBlessing(){


const bride=

document

.getElementById(

"previewBride"

)

.innerText;



const groom=

document

.getElementById(

"previewGroom"

)

.innerText;



const card=

document

.getElementById(

"blessingCard"

);



const random=

blessings[

Math.floor(

Math.random()

*

blessings.length

)

];



card.innerHTML=`

<p>

${bride} & ${groom},

</p>

<p>

${random.replace(/\n/g,"<br>")}

</p>

<div class="blessing-footer">

Pellimelam by Vidhwaan

</div>

`;



card.animate(

[

{

opacity:0,

transform:

"translateY(40px)"

},

{

opacity:1,

transform:

"translateY(0)"

}

],

{

duration:700

}

);


}





/* ===================================== */
/* DOWNLOAD INVITATION                   */
/* ===================================== */

async function downloadInvitation(){



const card=

document.getElementById(

"invitationCard"

);



if(typeof html2canvas==="undefined"){

alert(

"Please include html2canvas library."

);

return;

}



showToast(

"Preparing HD Invitation..."

);



const canvas=

await html2canvas(

card,

{

scale:3,

useCORS:true,

backgroundColor:null

}

);



const link=

document.createElement(

"a"

);



const bride=

document

.getElementById(

"previewBride"

)

.innerText;



const groom=

document

.getElementById(

"previewGroom"

)

.innerText;



const event=

document

.getElementById(

"previewEvent"

)

.innerText;



link.download=

`${bride}-${groom}-${event}.png`;



link.href=

canvas.toDataURL(

"image/png"

);



link.click();



showToast(

"Invitation Downloaded"

);


}





/* ===================================== */
/* WHATSAPP SHARE                        */
/* ===================================== */

function shareWhatsapp(){



const bride=

document

.getElementById(

"previewBride"

)

.innerText;



const groom=

document

.getElementById(

"previewGroom"

)

.innerText;



const event=

document

.getElementById(

"previewEvent"

)

.innerText;



const date=

document

.getElementById(

"previewDate"

)

.innerText;



const time=

document

.getElementById(

"previewTime"

)

.innerText;



const venue=

document

.getElementById(

"previewVenue"

)

.innerText;



const text=

`✨ Wedding Invitation ✨

${bride} ❤️ ${groom}

${event}

📅 ${date}

🕒 ${time}

📍 ${venue}

Bless Us With Your Presence

🎶 Pellimelam by Vidhwaan

🌐 https://pellimelam.vidhwaan.com

💬 9440246101`;



window.open(

`https://wa.me/?text=${encodeURIComponent(text)}`,

"_blank"

);


}





/* ===================================== */
/* INSTAGRAM HELPER                      */
/* ===================================== */

function shareInstagram(){



alert(

`Instagram doesn't allow direct sharing from websites.

1. Download Invitation

2. Open Instagram

3. Add Story

4. Select Downloaded Image`

);



}





/* ===================================== */
/* COPY LINK                             */
/* ===================================== */

function copyLink(){



navigator

.clipboard

.writeText(

"https://pellimelam.vidhwaan.com"

);



showToast(

"Website Link Copied"

);


}





/* ===================================== */
/* TOAST                                 */
/* ===================================== */

function showToast(message){



let toast=

document.getElementById(

"toast"

);



if(!toast){



toast=

document.createElement(

"div"

);



toast.id=

"toast";



toast.style.position=

"fixed";



toast.style.bottom=

"110px";



toast.style.left=

"50%";



toast.style.transform=

"translateX(-50%)";



toast.style.padding=

"16px 26px";



toast.style.background=

"rgba(0,0,0,.88)";



toast.style.border=

"1px solid rgba(255,215,0,.35)";



toast.style.borderRadius=

"100px";



toast.style.color=

"#fff";



toast.style.fontWeight=

"700";



toast.style.zIndex=

"999999";



toast.style.backdropFilter=

"blur(15px)";



document.body.appendChild(

toast

);


}



toast.innerText=

message;



toast.style.opacity=

"1";



setTimeout(

()=>{

toast.style.opacity=

"0";

},

2500

);


}





/* ===================================== */
/* INITIAL THEME                         */
/* ===================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{


applyTheme(

"gold"

);


}

);



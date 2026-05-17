const fmt=(d)=>{try{const f=new Date(d);f.setHours(f.getHours()-5);return f.toLocaleString("es-PE",{dateStyle:"short",timeStyle:"short"});}catch(e){return"";}};

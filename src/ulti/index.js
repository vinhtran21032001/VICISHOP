module.exports = function randomID(){
    const string = "QWERTYUIOPASDFGHJKLZXCVBNM123456789";
    const id =  string[Math.ceil(Math.random()*26 -1)] + string[Math.ceil(Math.random()*26 -1)] + 
                string[Math.ceil(Math.random()*26 -1)] + string[Math.ceil(Math.random()*26 -1)] + 
                string[Math.ceil(Math.random()*26 -1)] + string[Math.ceil(Math.random()*26 -1)] + 
                string[Math.ceil(Math.random()*26 -1)] + string[Math.ceil(Math.random()*26 -1)] + 
                string[Math.ceil(Math.random()*26 -1)] + string[Math.ceil(Math.random()*26 -1)] + 
                string[Math.ceil(Math.random()*26 -1)] + string[Math.ceil(Math.random()*26 -1)] + 
                string[Math.ceil(Math.random()*26 -1)] 
    return id;
}